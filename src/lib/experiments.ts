// A/B Testing framework for Emeis website
// Reads from URL params and persists to localStorage

import { events } from './analytics';

export interface Experiment {
  name: string;
  variants: string[];
  defaultVariant: string;
  description: string;
}

export const experiments: Record<string, Experiment> = {
  transparency: {
    name: 'transparency',
    variants: ['A', 'B'],
    defaultVariant: 'A',
    description: 'Transparency Experience - A: static info blocks, B: interactive preview + micro-survey + more CTAs',
  },
  reviews: {
    name: 'reviews',
    variants: ['A', 'B'],
    defaultVariant: 'A',
    description: 'Reviews Credibility - A: mixed reviews simple list, B: verified badges + date filter + categories + before/after panel',
  },
};

const STORAGE_KEY = 'emeis_experiment_variants';

// Get stored variants from localStorage
function getStoredVariants(): Record<string, string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Store variants to localStorage
function storeVariants(variants: Record<string, string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(variants));
}

// Parse URL params for experiment overrides
function getUrlParamVariants(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const variants: Record<string, string> = {};
  
  Object.keys(experiments).forEach(expName => {
    const paramValue = params.get(`exp_${expName}`);
    if (paramValue && experiments[expName].variants.includes(paramValue)) {
      variants[expName] = paramValue;
    }
  });
  
  return variants;
}

// Get variant for a specific experiment
export function getVariant(experimentName: string): string {
  const experiment = experiments[experimentName];
  if (!experiment) {
    console.warn(`Unknown experiment: ${experimentName}`);
    return 'A';
  }
  
  // Check URL params first (allows override for testing)
  const urlVariants = getUrlParamVariants();
  if (urlVariants[experimentName]) {
    // Store the URL variant
    const storedVariants = getStoredVariants();
    if (storedVariants[experimentName] !== urlVariants[experimentName]) {
      storedVariants[experimentName] = urlVariants[experimentName];
      storeVariants(storedVariants);
      events.experimentAssigned(experimentName, urlVariants[experimentName]);
    }
    return urlVariants[experimentName];
  }
  
  // Check localStorage
  const storedVariants = getStoredVariants();
  if (storedVariants[experimentName]) {
    return storedVariants[experimentName];
  }
  
  // Assign randomly if not set
  const randomVariant = experiment.variants[Math.floor(Math.random() * experiment.variants.length)];
  storedVariants[experimentName] = randomVariant;
  storeVariants(storedVariants);
  events.experimentAssigned(experimentName, randomVariant);
  
  return randomVariant;
}

// Get all current variants
export function getAllVariants(): Record<string, string> {
  const allVariants: Record<string, string> = {};
  Object.keys(experiments).forEach(expName => {
    allVariants[expName] = getVariant(expName);
  });
  return allVariants;
}

// Reset all experiments (useful for testing)
export function resetExperiments(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Set specific variant (for debug panel)
export function setVariant(experimentName: string, variant: string): void {
  if (!experiments[experimentName]) {
    console.warn(`Unknown experiment: ${experimentName}`);
    return;
  }
  if (!experiments[experimentName].variants.includes(variant)) {
    console.warn(`Invalid variant ${variant} for experiment ${experimentName}`);
    return;
  }
  
  const storedVariants = getStoredVariants();
  storedVariants[experimentName] = variant;
  storeVariants(storedVariants);
  events.experimentAssigned(experimentName, variant);
}

// Check if debug mode is enabled
export function isDebugMode(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get('debug') === '1';
}

// Custom hook for experiments
import { useState, useEffect } from 'react';

export function useExperiment(experimentName: string): string {
  const [variant, setVariant] = useState<string>(() => getVariant(experimentName));
  
  useEffect(() => {
    // Re-check on mount in case URL params changed
    const currentVariant = getVariant(experimentName);
    if (currentVariant !== variant) {
      setVariant(currentVariant);
    }
  }, [experimentName, variant]);
  
  return variant;
}
