import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { admissionChecklist } from '@/data/mockData';
import { trackEvent, enableScrollTracking } from '@/lib/analytics';
import { 
  ClipboardCheck, CheckCircle, Circle, Download, 
  Printer, ArrowRight, Shield, Lock, FileText 
} from 'lucide-react';

export default function Admission() {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  useEffect(() => {
    trackEvent('page_view', { page: 'admission' });
    enableScrollTracking('admission');
  }, []);

  const progress = Math.round((completedSteps.size / admissionChecklist.length) * 100);

  const toggleStep = (id: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedSteps(newCompleted);
    trackEvent('checklist_progress', { 
      step: id, 
      completed: !completedSteps.has(id),
      progress: Math.round((newCompleted.size / admissionChecklist.length) * 100)
    });
  };

  const handleStartAdmission = () => {
    trackEvent('admission_start', { source: 'admission_page', progress });
  };

  const handleDownload = () => {
    trackEvent('checklist_download');
    // In production, this would download a PDF
    alert('Checklist PDF download - Demo only');
  };

  const handlePrint = () => {
    trackEvent('checklist_print');
    window.print();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <ClipboardCheck className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Guided Process</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Admission Made Clear
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              No confusion, no hidden steps. Follow our guided checklist to understand 
              exactly what's needed for a smooth admission process.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Checklist */}
            <div className="lg:col-span-2">
              <div className="card-trust">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Admission Checklist
                    </h2>
                    <span className="text-lg font-semibold text-primary">{progress}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-4">
                  {admissionChecklist.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                        completedSteps.has(item.id)
                          ? 'bg-primary/5 border-primary/30'
                          : 'bg-muted/30 border-border hover:border-primary/30'
                      }`}
                      onClick={() => toggleStep(item.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          completedSteps.has(item.id)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {completedSteps.has(item.id) ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 ${
                            completedSteps.has(item.id) ? 'text-primary' : 'text-foreground'
                          }`}>
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          {item.documents && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {item.documents.map((doc, i) => (
                                <span 
                                  key={i}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                                >
                                  <FileText className="w-3 h-3" />
                                  {doc}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="secondary" onClick={handleDownload}>
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                  <Button variant="secondary" onClick={handlePrint}>
                    <Printer className="w-4 h-4" />
                    Print
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="card-trust bg-primary text-primary-foreground">
                  <h3 className="font-display text-xl font-bold mb-3">Ready to Begin?</h3>
                  <p className="text-primary-foreground/80 mb-6">
                    Our admissions team is here to guide you through every step.
                  </p>
                  <Button 
                    variant="hero-secondary" 
                    className="w-full bg-cream text-navy hover:bg-cream/90"
                    onClick={handleStartAdmission}
                  >
                    Start Your Admission
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Payment Security */}
                <div className="card-trust">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Payment Security</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Lock className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">256-bit Encryption</p>
                        <p className="text-xs text-muted-foreground">Bank-level security</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">PCI-DSS Compliant</p>
                        <p className="text-xs text-muted-foreground">Certified payment processing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">No Hidden Fees</p>
                        <p className="text-xs text-muted-foreground">Complete cost transparency</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help */}
                <div className="p-4 bg-muted/50 rounded-xl border border-border">
                  <p className="text-sm text-foreground font-medium mb-2">Need Help?</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Our team is available to answer any questions about the admission process.
                  </p>
                  <a 
                    href="tel:+33123456789" 
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Call +33 1 23 45 67 89
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
