import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { todaySnapshot } from '@/data/mockData';
import { trackEvent, enableScrollTracking, useExperiment } from '@/lib/analytics';
import { 
  Heart, Calendar, MessageSquare, Bell, Users, 
  ArrowRight, CheckCircle, Send, Phone 
} from 'lucide-react';

export default function FamilyPortal() {
  const variant = useExperiment('aftersale');
  const [checkInNote, setCheckInNote] = useState('');
  const [qaQuestion, setQaQuestion] = useState('');

  useEffect(() => {
    trackEvent('page_view', { page: 'family_portal', variant });
    enableScrollTracking('family_portal');
    
    if (variant === 'B') {
      trackEvent('portal_aftersale_snapshot_view');
    }
    trackEvent('portal_weekly_summary_view');
  }, [variant]);

  const handleCheckInRequest = () => {
    if (checkInNote.trim()) {
      trackEvent('checkin_request_submit', { note: checkInNote.trim() });
      setCheckInNote('');
      alert('Check-in request submitted! A nurse will contact you shortly.');
    }
  };

  const handleQASubmit = () => {
    if (qaQuestion.trim()) {
      trackEvent('qa_submit', { question: qaQuestion.trim() });
      setQaQuestion('');
      alert('Question submitted! Expected response within 4 hours.');
    }
  };

  const handleReferral = () => {
    trackEvent('referral_submit');
    alert('Thank you for your referral interest! Our team will contact you.');
  };

  const handleReviewIntent = () => {
    trackEvent('review_intent_click');
    alert('Thank you for wanting to share your experience!');
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-light rounded-full mb-6">
              <Heart className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-coral">Family Trust Loop</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Stay Connected, Stay Informed
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              The Family Portal keeps you in the loop with proactive updates, easy communication, 
              and complete visibility into your loved one's care.
            </p>
          </div>
        </div>
      </section>

      {/* Variant B: Today's Snapshot */}
      {variant === 'B' && (
        <section className="bg-primary/5 border-b border-border">
          <div className="container-wide px-4 md:px-8 py-8">
            <div className="max-w-3xl mx-auto">
              <div className="card-trust bg-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Today's Care Snapshot
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    Updated {todaySnapshot.lastCheckin}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted/30 rounded-xl text-center">
                    <p className="text-3xl mb-1">{todaySnapshot.moodEmoji}</p>
                    <p className="text-sm font-medium text-foreground">Mood</p>
                    <p className="text-xs text-muted-foreground">{todaySnapshot.mood}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary mb-1">{todaySnapshot.mealsEaten}</p>
                    <p className="text-sm font-medium text-foreground">Meals</p>
                    <p className="text-xs text-muted-foreground">Eaten today</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl text-center">
                    <p className="text-lg font-bold text-primary mb-1">{todaySnapshot.mobilityLevel}</p>
                    <p className="text-sm font-medium text-foreground">Mobility</p>
                    <p className="text-xs text-muted-foreground">Activity level</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-xl text-center md:col-span-1 col-span-2">
                    <p className="text-sm text-primary font-medium">{todaySnapshot.highlight}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Weekly Summary */}
            <div className="card-trust">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Weekly Care Summaries
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Every week, receive a personalized report covering meals, activities, 
                health updates, mood tracking, and social engagement.
              </p>
              <div className="p-4 bg-muted/30 rounded-xl">
                <p className="text-sm font-medium text-foreground mb-2">This Week's Highlights:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    21 meals served, 95% appetite
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    5 group activities attended
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Overall mood: Good
                  </li>
                </ul>
              </div>
            </div>

            {/* Nurse Check-in (Variant B: Interactive) */}
            <div className="card-trust">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Request Nurse Check-In
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Need peace of mind? Request a check-in and our nursing team will 
                reach out with an update.
              </p>
              {variant === 'B' ? (
                <div className="space-y-3">
                  <textarea
                    value={checkInNote}
                    onChange={(e) => setCheckInNote(e.target.value)}
                    placeholder="Optional: Add a specific question or concern..."
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none"
                    rows={3}
                  />
                  <Button variant="accent" className="w-full" onClick={handleCheckInRequest}>
                    <Phone className="w-4 h-4" />
                    Request Check-In
                  </Button>
                </div>
              ) : (
                <Button variant="accent" onClick={handleCheckInRequest}>
                  <Phone className="w-4 h-4" />
                  Request Check-In
                </Button>
              )}
            </div>

            {/* Q&A (Variant B: Interactive) */}
            <div className="card-trust">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  {variant === 'B' ? 'Ask About Today' : '1-Click Q&A'}
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Have a question? Get answers from the care team within 4 hours 
                during business hours.
              </p>
              {variant === 'B' ? (
                <div className="space-y-3">
                  <textarea
                    value={qaQuestion}
                    onChange={(e) => setQaQuestion(e.target.value)}
                    placeholder="Ask anything about today's care..."
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none"
                    rows={3}
                  />
                  <Button variant="default" className="w-full" onClick={handleQASubmit}>
                    <Send className="w-4 h-4" />
                    Send Question
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    4-hour response SLA during business hours
                  </p>
                </div>
              ) : (
                <Button variant="default" onClick={handleQASubmit}>
                  <MessageSquare className="w-4 h-4" />
                  Ask a Question
                </Button>
              )}
            </div>

            {/* Notifications */}
            <div className="card-trust">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-coral-light flex items-center justify-center">
                  <Bell className="w-5 h-5 text-coral" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Proactive Notifications
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We reach out before you need to ask. Get notified about health changes, 
                appointments, and milestone moments.
              </p>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm text-primary font-medium">
                  ✓ Weekly safety checks completed for all residents
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advocacy & Referral */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Family Advocacy</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Share Your Experience
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your voice helps other families find quality care. Share your experience 
              or refer families who could benefit from our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" onClick={handleReviewIntent}>
                Write a Review
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" onClick={handleReferral}>
                Refer a Family
                <Users className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
