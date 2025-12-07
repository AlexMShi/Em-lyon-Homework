import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export function HeroSection() {
  const handleBookVisit = () => {
    trackEvent('book_visit_click', { source: 'hero' });
  };

  const handleStartAdmission = () => {
    trackEvent('admission_start', { source: 'hero' });
  };

  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative container-wide px-4 md:px-8 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-up">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Certified Quality Care • 100% Transparent</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up stagger-1 text-balance">
            Care You Can See.
            <br />
            <span className="text-primary">Trust You Can Feel.</span>
          </h1>

          {/* Value Proposition */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up stagger-2 text-balance">
            Real-time care tracking, verified reviews, and complete transparency. 
            See exactly how we care for your loved ones—every meal, every check-in, every moment.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up stagger-3">
            <Link to="/transparency" onClick={handleBookVisit}>
              <Button variant="hero" size="xl">
                Book a Visit
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/admission" onClick={handleStartAdmission}>
              <Button variant="hero-secondary" size="xl">
                Start Admission
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-up stagger-4">
            <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-2xl shadow-soft">
              <Eye className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="font-semibold text-foreground">24/7 Tracking</p>
                <p className="text-sm text-muted-foreground">Real-time updates</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-2xl shadow-soft">
              <Shield className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="font-semibold text-foreground">Verified Reviews</p>
                <p className="text-sm text-muted-foreground">Authentic feedback</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-2xl shadow-soft">
              <Heart className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="font-semibold text-foreground">Family First</p>
                <p className="text-sm text-muted-foreground">Always connected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
