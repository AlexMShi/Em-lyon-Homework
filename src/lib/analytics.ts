// Analytics tracking system - logs to console and localStorage

export type ExperimentId = 'transparency' | 'reviews' | 'aftersale';
export type Variant = 'A' | 'B';

export interface ExperimentConfig {
  transparency: Variant;
  reviews: Variant;
  aftersale: Variant;
}

export interface AnalyticsEvent {
  event: string;
  timestamp: string;
  page: string;
  data?: Record<string, unknown>;
  experimentVariants?: ExperimentConfig;
}

const STORAGE_KEY = 'emeis_analytics';
const EXPERIMENT_KEY = 'emeis_experiments';

export function getStoredEvents(): AnalyticsEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getExperimentVariants(): ExperimentConfig {
  const params = new URLSearchParams(window.location.search);
  const urlTransparency = params.get('exp_transparency') as Variant;
  const urlReviews = params.get('exp_reviews') as Variant;
  const urlAftersale = params.get('exp_aftersale') as Variant;

  let stored: Partial<ExperimentConfig> = {};
  try {
    const storedStr = localStorage.getItem(EXPERIMENT_KEY);
    if (storedStr) stored = JSON.parse(storedStr);
  } catch { /* ignore */ }

  const config: ExperimentConfig = {
    transparency: urlTransparency || stored.transparency || 'A',
    reviews: urlReviews || stored.reviews || 'A',
    aftersale: urlAftersale || stored.aftersale || 'A',
  };

  localStorage.setItem(EXPERIMENT_KEY, JSON.stringify(config));
  return config;
}

export function trackEvent(event: string, data?: Record<string, unknown>): void {
  const analyticsEvent: AnalyticsEvent = {
    event,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    data,
    experimentVariants: getExperimentVariants(),
  };

  console.log('[Analytics]', analyticsEvent);

  try {
    const events = getStoredEvents();
    events.push(analyticsEvent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-500)));
  } catch (e) {
    console.warn('Failed to store analytics event:', e);
  }
}

export function clearEvents(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportEvents(): string {
  return JSON.stringify(getStoredEvents(), null, 2);
}

export function setExperimentVariant(experiment: ExperimentId, variant: Variant): void {
  const current = getExperimentVariants();
  current[experiment] = variant;
  localStorage.setItem(EXPERIMENT_KEY, JSON.stringify(current));
  trackEvent('experiment_variant_set', { experiment, variant });
}

export function useExperiment(experiment: ExperimentId): Variant {
  return getExperimentVariants()[experiment];
}

let maxScrollDepth = 0;
let scrollTrackingEnabled = false;

export function enableScrollTracking(page: string): void {
  if (scrollTrackingEnabled) return;
  scrollTrackingEnabled = true;
  maxScrollDepth = 0;

  const trackScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const depth = Math.round((scrolled / scrollHeight) * 100);

    if (depth > maxScrollDepth) {
      maxScrollDepth = depth;
      if ([25, 50, 75, 100].includes(depth)) {
        trackEvent('scroll_depth', { page, depth });
      }
    }
  };

  window.addEventListener('scroll', trackScroll, { passive: true });
}

let startTime: number | null = null;

export function startReadTimeTracking(): void {
  startTime = Date.now();
}

export function endReadTimeTracking(page: string): void {
  if (startTime) {
    const readTime = Math.round((Date.now() - startTime) / 1000);
    trackEvent('read_time', { page, seconds: readTime });
    startTime = null;
  }
}
export const events = {
  portalWeeklySummaryView: () => trackEvent('portal_weekly_summary_view'),
  checkinRequestSubmit: () => trackEvent('checkin_request_submit'),
  qaSubmit: () => trackEvent('qa_submit'),
  referralSubmit: () => trackEvent('referral_submit'),
  reviewIntentClick: () => trackEvent('review_intent_click'),
};
