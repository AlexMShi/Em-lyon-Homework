import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { careTrackingDemo, testimonials } from '@/data/mockData';
import { trackEvent, enableScrollTracking, useExperiment } from '@/lib/analytics';
import { 
  Eye, Play, Utensils, Pill, Sparkles, MessageCircle, 
  ArrowRight, CheckCircle, X, ThumbsUp, ThumbsDown 
} from 'lucide-react';

const tabs = [
  { id: 'meals', icon: Utensils, label: 'Meals', data: careTrackingDemo.meals },
  { id: 'medication', icon: Pill, label: 'Medication', data: careTrackingDemo.medication },
  { id: 'hygiene', icon: Sparkles, label: 'Hygiene', data: careTrackingDemo.hygiene },
  { id: 'communication', icon: MessageCircle, label: 'Updates', data: careTrackingDemo.communication },
];

export default function Transparency() {
  const [activeTab, setActiveTab] = useState('meals');
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const variant = useExperiment('transparency');

  useEffect(() => {
    trackEvent('page_view', { page: 'transparency', variant });
    enableScrollTracking('transparency');

    // Show survey after 30 seconds if variant B
    if (variant === 'B') {
      const timer = setTimeout(() => {
        if (!surveySubmitted) {
          setShowSurvey(true);
        }
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [variant, surveySubmitted]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    trackEvent('demo_tab_click', { tab: tabId });
  };

  const handleTourOpen = () => {
    trackEvent('tour_open');
  };

  const handleBookVisit = () => {
    trackEvent('book_visit_click', { source: 'transparency' });
  };

  const handleSurveySubmit = (trusted: boolean) => {
    trackEvent('trust_survey_submit', { trusted });
    setSurveySubmitted(true);
    setShowSurvey(false);
  };

  const handleTestimonialPlay = (id: string) => {
    trackEvent('testimonial_play', { testimonial_id: id });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Complete Transparency</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              See Every Moment of Care
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Tour our facilities, explore our care tracking app, and hear from real families. 
              We believe in complete transparency because trust must be earned.
            </p>
            <Button variant="hero" onClick={handleBookVisit}>
              Book Your Visit Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Virtual Tour */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6 text-center">
              360° Virtual Tour
            </h2>
            <div 
              className="aspect-video bg-muted rounded-3xl flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors border border-border"
              onClick={handleTourOpen}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary ml-1" />
                </div>
                <p className="text-foreground font-semibold">Click to Start Virtual Tour</p>
                <p className="text-sm text-muted-foreground">Explore our facilities from anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Tracking Demo */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Care Tracking App Demo
              </h2>
              <p className="text-lg text-muted-foreground">
                Experience the real-time updates families receive every day.
              </p>
            </div>

            <div className="bg-card rounded-3xl shadow-medium border border-border overflow-hidden">
              {/* Demo Header */}
              <div className="bg-primary/5 p-6 border-b border-border">
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

              {/* Tabs */}
              <div className="grid grid-cols-4 border-b border-border">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center justify-center gap-2 p-4 text-sm font-medium transition-colors border-r last:border-r-0 border-border ${
                      activeTab === tab.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <div className="space-y-3">
                  {activeTab === 'meals' && careTrackingDemo.meals.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                      <span className="text-sm font-mono text-muted-foreground">{item.time}</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.meal}</p>
                        <p className="text-sm text-muted-foreground">{item.items.join(', ')}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        item.eaten === 'full' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                      }`}>
                        {item.eaten === 'full' ? 'Eaten' : 'Mostly eaten'}
                      </span>
                    </div>
                  ))}
                  {activeTab === 'medication' && careTrackingDemo.medication.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                      <span className="text-sm font-mono text-muted-foreground">{item.time}</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.notes}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                  ))}
                  {activeTab === 'hygiene' && careTrackingDemo.hygiene.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                      <span className="text-sm font-mono text-muted-foreground">{item.time}</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.activity}</p>
                        <p className="text-sm text-muted-foreground">{item.notes}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        item.assisted ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                      }`}>
                        {item.assisted ? 'Assisted' : 'Independent'}
                      </span>
                    </div>
                  ))}
                  {activeTab === 'communication' && careTrackingDemo.communication.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                      <span className="text-sm font-mono text-muted-foreground">{item.time}</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.type}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
            What Families Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card-trust">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => handleTestimonialPlay(testimonial.id)}
                >
                  <Play className="w-6 h-6 text-primary ml-1" />
                </div>
                <blockquote className="text-foreground text-center mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.relationship}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to See for Yourself?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Book a visit and experience our transparency firsthand. 
            See our facilities, meet our team, and ask any questions.
          </p>
          <Button 
            variant="hero-secondary" 
            size="xl"
            onClick={handleBookVisit}
            className="bg-cream text-navy hover:bg-cream/90"
          >
            Book Your Visit
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Trust Survey Modal (Variant B only) */}
      {showSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="bg-card rounded-3xl shadow-medium p-8 max-w-md mx-4 animate-scale-in">
            <button 
              onClick={() => setShowSurvey(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4 text-center">
              Did This Page Increase Your Trust?
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Your feedback helps us improve our transparency efforts.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="default" 
                size="lg"
                onClick={() => handleSurveySubmit(true)}
              >
                <ThumbsUp className="w-5 h-5 mr-2" />
                Yes
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => handleSurveySubmit(false)}
              >
                <ThumbsDown className="w-5 h-5 mr-2" />
                Not Yet
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
