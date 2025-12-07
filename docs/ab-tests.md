# A/B Test Documentation

This document describes the three A/B experiments implemented in the Emeis website.

## Overview

All experiments use a simple framework:
- **URL params** override stored variants (e.g., `?exp_transparency=B`)
- **localStorage** persists variants across sessions
- **Debug panel** (`?debug=1`) allows toggling experiments

---

## Experiment 1: Transparency Experience

**Location:** Homepage (TransparencyPreview) + Transparency page

**Hypothesis:** Interactive content with micro-surveys increases trust and engagement compared to static content.

### Variant A (Control)
- Static content describing the transparency features
- Simple "Explore Transparency Features" CTA
- No interactive elements

### Variant B (Treatment)
- Interactive care tracking demo with clickable tabs
- Real-time sample data preview
- Micro-survey after 30 seconds: "Did this page increase your trust?"
- Multiple CTAs throughout the experience

### Tracked Events
- `demo_tab_click` - User clicks on demo tabs (Meals/Medication/Hygiene/Updates)
- `tour_open` - User clicks virtual tour placeholder
- `testimonial_play` - User clicks testimonial video placeholder
- `trust_survey_submit` - User responds to trust survey (includes `trusted: boolean`)
- `book_visit_click` - Primary CTA clicks

### Expected Outcomes
- Variant B should show higher `trust_survey_submit` positive rates
- Variant B should show higher `book_visit_click` conversion

---

## Experiment 2: Reviews Credibility

**Location:** Homepage (ReviewsPreview) + Reviews page

**Hypothesis:** Verified badges, year filters, and improvement notes increase perceived credibility.

### Variant A (Control)
- Simple list of reviews
- No verification badges
- All years shown equally
- No improvement notes

### Variant B (Treatment)
- Verified badges on reviews
- Default filter: 2023-2025 only
- "Before & After Improvements since 2022" panel
- Improvement notes shown on reviews that addressed feedback
- Transparency statement

### Tracked Events
- `review_filter_change` - User changes filter (category, year, verified toggle)
- `review_scroll_depth` - Scroll depth on reviews page
- `review_read_time` - Time spent reading reviews

### Expected Outcomes
- Variant B should show longer `review_read_time`
- Variant B should show more filter engagement
- Variant B should improve overall trust metrics

---

## Experiment 3: After-Sale "Family Reassurance Experience"

**Location:** Family Portal page

**Hypothesis:** Active engagement features increase family satisfaction and reduce support inquiries.

### Variant A (Control)
- Passive care log display
- Basic weekly summary view
- Standard Q&A link
- Simple check-in request

### Variant B (Treatment)
- **"Today's Care Snapshot" card:**
  - Mood indicator with emoji
  - Meals eaten count
  - Mobility level
  - Daily highlight

- **"Request Nurse Check-In" mini-form:**
  - Optional note field
  - Direct submit button

- **"Ask About Today" Q&A box:**
  - Inline question input
  - 4-hour SLA visibility
  - Immediate feedback

### Tracked Events
- `portal_aftersale_snapshot_view` - User views today's snapshot (Variant B only)
- `portal_weekly_summary_view` - User views weekly summary
- `checkin_request_submit` - User requests nurse check-in
- `qa_submit` - User submits a question
- `referral_submit` - User clicks referral button
- `review_intent_click` - User clicks review button

### Expected Outcomes
- Variant B should show higher `checkin_request_submit` and `qa_submit` rates
- Variant B should show improved family engagement metrics
- Variant B should reduce support ticket volume (measure externally)

---

## Implementation Details

### Setting Experiments via URL

```
# Set single experiment
https://yoursite.com/?exp_transparency=B

# Set multiple experiments
https://yoursite.com/?exp_transparency=B&exp_reviews=B&exp_aftersale=B
```

### Accessing in Code

```typescript
import { useExperiment } from '@/lib/analytics';

function MyComponent() {
  const variant = useExperiment('transparency');
  
  if (variant === 'B') {
    return <InteractiveVersion />;
  }
  return <StaticVersion />;
}
```

### Debug Panel

Add `?debug=1` to any URL to show the debug panel:
- Toggle experiments in real-time
- View recent events
- Export analytics data
- Clear stored data

### Analytics Export

Visit `/debug/analytics` to:
- View all tracked events
- Filter by page
- Export as JSON
- Clear event history

---

## Measurement Plan

### Primary Metrics
1. **Transparency:** `trust_survey_submit` positive rate
2. **Reviews:** `review_read_time` average
3. **After-Sale:** `checkin_request_submit` + `qa_submit` combined rate

### Secondary Metrics
1. **Transparency:** `book_visit_click` rate
2. **Reviews:** `review_filter_change` engagement
3. **After-Sale:** `referral_submit` rate

### Sample Size Recommendations
- Minimum 1,000 visitors per variant
- Run for at least 2 weeks
- Ensure statistical significance (p < 0.05)

---

## Rollout Strategy

1. **Week 1-2:** 50/50 split on all experiments
2. **Week 3:** Analyze results, identify winner
3. **Week 4:** Roll winning variant to 100%
4. **Ongoing:** Iterate with new experiments
