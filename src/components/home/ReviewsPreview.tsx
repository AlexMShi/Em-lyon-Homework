import { Link } from 'react-router-dom';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reviews } from '@/data/mockData';
import { trackEvent, useExperiment } from '@/lib/analytics';

export function ReviewsPreview() {
  const variant = useExperiment('reviews');

  // Filter for recent, high-rating reviews
  const featuredReviews = reviews
    .filter(r => r.year >= 2023 && r.rating >= 4)
    .slice(0, 3);

  const handleViewAll = () => {
    trackEvent('reviews_preview_click', { variant });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Families Say
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {variant === 'B' 
              ? 'Verified reviews from real families. Filtered to show 2023-2025 feedback.'
              : 'Read what families are saying about our care.'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {featuredReviews.map((review, index) => (
            <div
              key={review.id}
              className="card-trust"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating & Verified Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'text-gold fill-gold' : 'text-muted'}`}
                    />
                  ))}
                </div>
                {variant === 'B' && review.verified && (
                  <span className="badge-verified">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>

              {/* Content */}
              <p className="text-foreground mb-4 line-clamp-4">"{review.content}"</p>

              {/* Improvement Note */}
              {variant === 'B' && review.improvement && (
                <div className="p-3 bg-primary/5 rounded-lg mb-4">
                  <p className="text-xs text-primary font-medium">
                    ✓ {review.improvement}
                  </p>
                </div>
              )}

              {/* Author */}
              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-foreground">{review.author}</p>
                <p className="text-sm text-muted-foreground">{review.relationship}</p>
                <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/reviews" onClick={handleViewAll}>
            <Button variant="secondary" size="lg">
              View All Verified Reviews
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
