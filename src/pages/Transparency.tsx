import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Smartphone, Video, Play, Calendar, ArrowRight, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import { careTrackingTabs } from '@/data/mockData';
import { useExperiment } from '@/lib/experiments';
import { events } from '@/lib/analytics';
import { cn } from '@/lib/utils';

// Icons for care tracking tabs
import { UtensilsCrossed, Pill, Droplets, MessageCircle, LucideIcon } from 'lucide-react';

const tabIcons: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Pill,
  Droplets,
  MessageCircle,
};

const testimonials = [
  { id: '1', name: 'Marie D.', role: 'Daughter', thumbnail: '/placeholder.svg' },
  { id: '2', name: 'Pierre L.', role: 'Son', thumbnail: '/placeholder.svg' },
  { id: '3', name: 'Sophie M.', role: 'Granddaughter', thumbnail: '/placeholder.svg' },
];

const Transparency = () => {
  const variant = useExperiment('transparency');
  const isVariantB = variant === 'B';
  
  const [activeTab, setActiveTab] = useState('meals');
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    events.demoTabClick(tabId);
  };

  const handleTourOpen = () => {
    events.tourOpen();
  };

  const handleTestimonialPlay = (id: string) => {
    events.testimonialPlay(id);
  };

  const handleSurveySubmit = (rating: number) => {
    events.trustSurveySubmit(rating);
    setSurveySubmitted(true);
    setTimeout(() => setShowSurvey(false), 2000);
  };

  const handleBookVisit = () => {
    events.bookVisitClick('transparency_page');
    setShowBookingModal(true);
  };

  const activeTabData = careTrackingTabs.find(t => t.id === activeTab);

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-wide text-center">
          <SectionHeader
            eyebrow="See Everything"
            title="Experience Our Transparency"
            description="We believe trust is built through complete openness. Explore our facilities, see real-time care tracking, and hear from verified families."
          />
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="hero" onClick={handleBookVisit}>
              <Calendar className="h-5 w-5" />
              Book a Visit
            </Button>
            <Button variant="hero-outline" onClick={handleTourOpen}>
              <Eye className="h-5 w-5" />
              Start Virtual Tour
            </Button>
          </div>
        </div>
      </section>

      {/* 360° Virtual Tour */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Virtual Tour"
            title="360° Facility Exploration"
            description="Walk through our facilities from the comfort of your home. Click and drag to look around."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <div 
              className="relative aspect-video bg-muted rounded-2xl overflow-hidden cursor-pointer group"
              onClick={handleTourOpen}
            >
              <img
                src="/placeholder.svg"
                alt="Virtual tour preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                <div className="p-5 rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                  <Eye className="h-10 w-10" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2">
                {['Common Area', 'Private Room', 'Garden', 'Dining Hall', 'Activity Room'].map((area) => (
                  <span key={area} className="shrink-0 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-lg text-sm font-medium text-foreground">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {isVariantB && (
            <div className="mt-8 text-center">
              <Button variant="outline" onClick={handleBookVisit}>
                Prefer an In-Person Visit?
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Care Tracking Demo */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Real-Time Updates"
            title="Care Tracking App Demo"
            description="See how families stay informed about their loved one's daily care in real-time."
          />

          <div className="mt-12 max-w-3xl mx-auto">
            {/* App Demo Container */}
            <div className="card-trust p-4 md:p-6">
              {/* Tab Navigation */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                {careTrackingTabs.map((tab) => {
                  const Icon = tabIcons[tab.icon] || Smartphone;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-colors",
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              {activeTabData && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {activeTabData.content.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {activeTabData.content.description}
                  </p>

                  <div className="space-y-3">
                    {activeTabData.content.items.map((item, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl",
                          item.status === 'completed' && "bg-primary/5",
                          item.status === 'upcoming' && "bg-muted",
                          item.status === 'in-progress' && "bg-warm-gold/10"
                        )}
                      >
                        <span className="text-sm font-medium text-muted-foreground w-14">
                          {item.time}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {item.item}
                          </p>
                        </div>
                        <span className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full",
                          item.status === 'completed' && "bg-primary/10 text-primary",
                          item.status === 'upcoming' && "bg-muted-foreground/10 text-muted-foreground",
                          item.status === 'in-progress' && "bg-warm-gold/10 text-warm-gold"
                        )}>
                          {item.status === 'completed' ? '✓ Done' : 
                           item.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Family Stories"
            title="Verified Testimonials"
            description="Watch real families share their genuine experiences with Emeis care."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="card-trust group cursor-pointer"
                onClick={() => handleTestimonialPlay(testimonial.id)}
              >
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img
                    src={testimonial.thumbnail}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                    <div className="p-3 rounded-full bg-primary text-primary-foreground group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role} of resident</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book a Visit CTA */}
      <section id="book-visit" className="section-padding bg-primary/5">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Ready to See For Yourself?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Book a visit to experience our facilities in person. Meet our staff, 
            speak with current families, and see our care in action.
          </p>
          <Button variant="hero" size="xl" onClick={handleBookVisit}>
            <Calendar className="h-5 w-5" />
            Book Your Visit Now
          </Button>
        </div>
      </section>

      {/* Micro Survey (Variant B only) */}
      {isVariantB && !surveySubmitted && (
        <button
          onClick={() => setShowSurvey(true)}
          className="fixed bottom-20 md:bottom-4 right-4 z-40 p-4 bg-card border border-border rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <p className="text-sm font-medium text-foreground">Did this page increase your trust?</p>
          <p className="text-xs text-muted-foreground">Quick 1-question survey</p>
        </button>
      )}

      {/* Survey Modal */}
      {showSurvey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50">
          <div className="bg-card rounded-2xl shadow-elevated p-6 max-w-sm w-full animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Feedback</h3>
              <button onClick={() => setShowSurvey(false)} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            {surveySubmitted ? (
              <p className="text-center text-primary font-medium py-4">
                Thank you for your feedback!
              </p>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">
                  Did this page increase your trust in Emeis?
                </p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleSurveySubmit(rating)}
                      className="p-3 rounded-xl hover:bg-primary/10 transition-colors"
                    >
                      <Star className={cn(
                        "h-8 w-8",
                        rating <= 3 ? "text-muted-foreground" : "text-warm-gold"
                      )} />
                      <span className="text-xs text-muted-foreground block mt-1">{rating}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  1 = Not at all, 5 = Significantly
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50">
          <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 max-w-md w-full animate-scale-in">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Book a Visit</h3>
                <p className="text-muted-foreground text-sm">Schedule your in-person tour</p>
              </div>
              <button onClick={() => setShowBookingModal(false)} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); events.bookVisitSubmit(); setShowBookingModal(false); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+33 1 23 45 67 89"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" variant="hero" className="w-full mt-6">
                Confirm Booking Request
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Transparency;
