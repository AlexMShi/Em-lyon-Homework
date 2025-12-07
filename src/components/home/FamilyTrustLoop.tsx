import { Link } from 'react-router-dom';
import { Heart, Calendar, MessageSquare, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const features = [
  {
    icon: Calendar,
    title: 'Weekly Care Summaries',
    description: 'Personalized reports on meals, activities, health, and mood.',
  },
  {
    icon: MessageSquare,
    title: 'Proactive Check-ins',
    description: 'Nurses reach out before you need to ask. 4-hour response SLA.',
  },
  {
    icon: Heart,
    title: '1-Click Q&A',
    description: 'Instant questions answered by the care team.',
  },
  {
    icon: Users,
    title: 'Family Advocacy',
    description: 'Refer families and share your experience to help others.',
  },
];

export function FamilyTrustLoop() {
  const handleLearnMore = () => {
    trackEvent('family_portal_click', { source: 'home' });
  };

  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features */}
          <div className="order-2 lg:order-1 grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-background rounded-2xl shadow-soft border border-border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-light rounded-full mb-6">
              <Heart className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-coral">Family Trust Loop</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Connected, Stay Informed
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our Family Portal keeps you in the loop with proactive updates, 
              easy communication, and complete visibility into your loved one's care.
            </p>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 mb-8">
              <p className="text-sm text-primary font-medium">
                ✓ Weekly safety checks completed for all residents
              </p>
            </div>
            <Link to="/family-portal" onClick={handleLearnMore}>
              <Button variant="default" size="lg">
                Explore Family Portal
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
