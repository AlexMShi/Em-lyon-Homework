import { useEffect, useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { reviews, improvements } from '@/data/mockData';
import { trackEvent, enableScrollTracking, useExperiment, startReadTimeTracking, endReadTimeTracking } from '@/lib/analytics';
import { Star, CheckCircle, Filter, TrendingUp } from 'lucide-react';

const categories = ['all', 'care', 'facilities', 'communication', 'staff', 'food'] as const;
const years = ['all', '2025', '2024', '2023', '2022'] as const;

export default function Reviews() {
  const variant = useExperiment('reviews');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>(variant === 'B' ? '2023' : 'all');
  const [verifiedOnly, setVerifiedOnly] = useState(variant === 'B');

  useEffect(() => {
    trackEvent('page_view', { page: 'reviews', variant });
    enableScrollTracking('reviews');
    startReadTimeTracking();

    return () => {
      endReadTimeTracking('reviews');
    };
  }, [variant]);

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      if (selectedCategory !== 'all' && review.category !== selectedCategory) return false;
      if (selectedYear !== 'all') {
        const yearNum = parseInt(selectedYear);
        if (selectedYear === '2023' && review.year < 2023) return false;
        if (selectedYear !== '2023' && review.year !== yearNum) return false;
      }
      if (verifiedOnly && !review.verified) return false;
      return true;
    });
  }, [selectedCategory, selectedYear, verifiedOnly]);

  const handleFilterChange = (filterType: string, value: string) => {
    trackEvent('review_filter_change', { filterType, value });
    if (filterType === 'category') setSelectedCategory(value);
    if (filterType === 'year') setSelectedYear(value);
    if (filterType === 'verified') setVerifiedOnly(value === 'true');
  };

  const averageRating = filteredReviews.length > 0 
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
    : '0';

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Verified Reviews</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Real Stories from Real Families
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              {variant === 'B' 
                ? 'All reviews are verified and from actual family members. Filter by year to see our progress since 2022.'
                : 'Read what families are saying about their experience with Emeis care.'}
            </p>
          </div>
        </div>
      </section>

      {/* Improvements Panel (Variant B only) */}
      {variant === 'B' && (
        <section className="bg-card border-b border-border">
          <div className="container-wide px-4 md:px-8 py-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Improvements Since 2022</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {improvements.slice(0, 6).map((item, index) => (
                <div key={index} className="p-4 bg-background rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground mb-1">{item.year}</p>
                  <p className="font-semibold text-primary text-lg">{item.metric}</p>
                  <p className="text-xs text-muted-foreground">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters & Reviews */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Stats */}
                <div className="card-trust">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-3xl font-bold text-foreground">{averageRating}</p>
                  <p className="text-sm text-muted-foreground">
                    Based on {filteredReviews.length} reviews
                  </p>
                </div>

                {/* Filters */}
                <div className="card-trust">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground">Filters</h3>
                  </div>

                  {/* Year Filter */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-foreground mb-2 block">Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => handleFilterChange('year', e.target.value)}
                      className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
                    >
                      <option value="all">All Years</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023+</option>
                      <option value="2022">2022</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleFilterChange('category', cat)}
                          className={`px-3 py-1 text-xs font-medium rounded-full capitalize transition-colors ${
                            selectedCategory === cat
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Verified Toggle */}
                  {variant === 'B' && (
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={verifiedOnly}
                          onChange={(e) => handleFilterChange('verified', String(e.target.checked))}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">Verified only</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Transparency Statement */}
                {variant === 'B' && (
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-sm text-primary font-medium mb-2">Our Commitment</p>
                    <p className="text-xs text-muted-foreground">
                      We publish all reviews, including critical ones from our challenging period. 
                      This transparency is core to rebuilding trust.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-3 space-y-4">
              {filteredReviews.length === 0 ? (
                <div className="card-trust text-center py-12">
                  <p className="text-muted-foreground">No reviews match your filters.</p>
                  <Button 
                    variant="secondary" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedYear('all');
                      setVerifiedOnly(false);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review.id} className="card-trust">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex items-center gap-0.5">
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
                        <p className="text-sm text-muted-foreground capitalize">{review.category}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>

                    <p className="text-foreground mb-4">"{review.content}"</p>

                    {variant === 'B' && review.improvement && (
                      <div className="p-3 bg-primary/5 rounded-lg mb-4">
                        <p className="text-sm text-primary font-medium">
                          ✓ Our Response: {review.improvement}
                        </p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-border">
                      <p className="font-semibold text-foreground">{review.author}</p>
                      <p className="text-sm text-muted-foreground">{review.relationship}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
