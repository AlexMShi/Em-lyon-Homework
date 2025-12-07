import { TrendingUp, Users, Building, Award } from 'lucide-react';
import { improvements } from '@/data/mockData';

const stats = [
  { icon: Users, value: '+200', label: 'Nurses Hired', sublabel: 'Since 2023' },
  { icon: Building, value: '€15M', label: 'Invested', sublabel: 'Facility upgrades' },
  { icon: Award, value: '100%', label: 'Certified', sublabel: 'Quality standards' },
  { icon: TrendingUp, value: '85%', label: 'Family Adoption', sublabel: 'Transparency app' },
];

export function TransformationSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Emeis Transformation
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            We acknowledged past challenges and rebuilt from the ground up. 
            Here's what we've accomplished—and what we continue to improve.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="card-trust text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="font-semibold text-foreground">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-2xl font-semibold text-foreground mb-8 text-center">
            Our Improvement Timeline
          </h3>
          <div className="space-y-4">
            {improvements.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 md:gap-6 p-4 md:p-6 bg-background rounded-2xl border border-border hover:shadow-soft transition-shadow"
              >
                <div className="flex-shrink-0 w-16 md:w-20">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {item.year}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-sm font-semibold text-primary">{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
