import { Link } from 'react-router-dom';
import { ClipboardCheck, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const steps = [
  'Initial Consultation',
  'Facility Tour',
  'Medical Assessment',
  'Care Plan Review',
  'Financial Discussion',
  'Documentation',
  'Move-In Preparation',
  'Welcome & Orientation',
];

export function AdmissionPreview() {
  const handleStartAdmission = () => {
    trackEvent('admission_start', { source: 'home_preview' });
  };

  return (
    <section className="section-padding gradient-warm">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <ClipboardCheck className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Guided Process</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Admission Made Clear
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              No confusion, no hidden steps. Our guided admission process walks you through 
              every requirement with clear timelines and transparent costs.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl shadow-soft">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Digital Paperwork</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl shadow-soft">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Clear Checklist</span>
              </div>
            </div>

            <Link to="/admission" onClick={handleStartAdmission}>
              <Button variant="accent" size="lg">
                Start Your Admission
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Checklist Preview */}
          <div className="bg-card rounded-3xl shadow-medium p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">Admission Checklist</h3>
              <span className="text-sm text-muted-foreground">8 steps</span>
            </div>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    index < 2 ? 'bg-primary/10' : 'bg-muted/50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    index < 2 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index < 2 ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={`text-sm ${index < 2 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
