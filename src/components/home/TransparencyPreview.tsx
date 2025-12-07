import { Link } from 'react-router-dom';
import { Eye, Utensils, Pill, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { careTrackingDemo } from '@/data/mockData';
import { trackEvent, useExperiment } from '@/lib/analytics';

export function TransparencyPreview() {
  const variant = useExperiment('transparency');

  const handleLearnMore = () => {
    trackEvent('transparency_preview_click', { variant });
  };

  if (variant === 'A') {
    // Variant A: Static content
    return (
      <section className="section-padding gradient-trust">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Complete Transparency</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              See Every Moment of Care
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Our Care Transparency App gives families real-time visibility into daily care—
              meals, medications, activities, and wellness updates.
            </p>
            <Link to="/transparency" onClick={handleLearnMore}>
              <Button variant="default" size="lg">
                Explore Transparency Features
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Variant B: Interactive preview
  const categories = [
    { id: 'meals', icon: Utensils, label: 'Meals', data: careTrackingDemo.meals },
    { id: 'medication', icon: Pill, label: 'Medication', data: careTrackingDemo.medication },
    { id: 'hygiene', icon: Sparkles, label: 'Hygiene', data: careTrackingDemo.hygiene },
    { id: 'communication', icon: MessageCircle, label: 'Updates', data: careTrackingDemo.communication },
  ];

  return (
    <section className="section-padding gradient-trust">
      <div className="container-wide">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Interactive Preview</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Experience Our Care Tracking
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              See exactly what families see. Explore a sample day of care updates.
            </p>
          </div>

          {/* Demo Interface */}
          <div className="bg-card rounded-3xl shadow-medium border border-border overflow-hidden">
            {/* Demo Header */}
            <div className="bg-primary/5 p-4 md:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Care Summary for</p>
                  <p className="font-semibold text-foreground">Margaret Smith • Room 204</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="font-semibold text-foreground">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => trackEvent('demo_tab_click', { tab: cat.id })}
                  className="flex items-center justify-center gap-2 p-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors border-r last:border-r-0 border-border"
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sample Data */}
            <div className="p-4 md:p-6">
              <div className="space-y-3">
                {careTrackingDemo.meals.map((meal, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 bg-muted/30 rounded-xl">
                    <span className="text-sm font-mono text-muted-foreground">{meal.time}</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{meal.meal}</p>
                      <p className="text-sm text-muted-foreground">{meal.items.join(', ')}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      meal.eaten === 'full' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                    }`}>
                      {meal.eaten === 'full' ? 'Eaten' : 'Mostly eaten'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-4 md:p-6 bg-muted/30 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  This is a sample. Real families get live updates 24/7.
                </p>
                <Link to="/transparency" onClick={handleLearnMore}>
                  <Button variant="default">
                    Book a Visit to Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
