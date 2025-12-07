# Emeis - Transparent Elderly Care Website

A professional, responsive marketing website for Emeis elderly care facilities, built to rebuild trust through transparency after past controversies.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment to GitHub Pages

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Configure for GitHub Pages:**
   Add to `vite.config.ts`:
   ```ts
   base: '/your-repo-name/',
   ```

3. **Deploy using GitHub Actions:**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

4. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: "gh-pages" branch

## 🧪 A/B Testing

### Enabling Experiments

Use URL parameters to set experiment variants:
- `?exp_transparency=B` - Interactive transparency experience
- `?exp_reviews=B` - Verified badges + filters + improvements panel
- `?exp_aftersale=B` - After-sale reassurance features

Example: `https://yoursite.com/?exp_transparency=B&exp_reviews=B`

### Debug Panel

Add `?debug=1` to any URL to show the debug panel for toggling experiments and viewing analytics.

### Analytics Debug Page

Visit `/debug/analytics` to view and export all tracked events.

## 📁 Project Structure

```
src/
├── components/
│   ├── debug/         # Debug panel
│   ├── home/          # Homepage sections
│   ├── layout/        # Header, Footer, Layout
│   └── ui/            # Shadcn UI components
├── data/
│   └── mockData.ts    # Mock reviews, testimonials, FAQ
├── lib/
│   ├── analytics.ts   # Event tracking & experiments
│   └── utils.ts       # Utility functions
├── pages/
│   ├── Index.tsx      # Homepage
│   ├── Transparency.tsx
│   ├── Reviews.tsx
│   ├── Admission.tsx
│   ├── FamilyPortal.tsx
│   └── DebugAnalytics.tsx
└── index.css          # Design system tokens
```

## 🎯 Features

- **5 pages:** Home, Transparency & Visits, Reviews, Admission, Family Portal
- **A/B testing framework:** 3 experiments with localStorage persistence
- **Analytics tracking:** Console + localStorage with export
- **Responsive design:** Mobile-first, WCAG-friendly
- **Interactive components:** FAQ accordion, filters, demo modal, checklist

## 🔧 Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- React Router
- Static site (no backend required)

## 📊 Tracked Events

Key events tracked:
- `page_view`, `scroll_depth`, `read_time`
- `book_visit_click`, `admission_start`
- `demo_tab_click`, `tour_open`, `testimonial_play`
- `trust_survey_submit`, `review_filter_change`
- `checklist_progress`, `checkin_request_submit`, `qa_submit`
- `referral_submit`, `review_intent_click`

## 📝 Documentation

See `/docs/ab-tests.md` for detailed A/B experiment documentation.
