import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { TransformationSection } from '@/components/home/TransformationSection';
import { TransparencyPreview } from '@/components/home/TransparencyPreview';
import { ReviewsPreview } from '@/components/home/ReviewsPreview';
import { AdmissionPreview } from '@/components/home/AdmissionPreview';
import { PaymentReassurance } from '@/components/home/PaymentReassurance';
import { FamilyTrustLoop } from '@/components/home/FamilyTrustLoop';
import { FAQSection } from '@/components/home/FAQSection';
import { trackEvent, enableScrollTracking } from '@/lib/analytics';

export default function Index() {
  useEffect(() => {
    trackEvent('page_view', { page: 'home' });
    enableScrollTracking('home');
  }, []);

  return (
    <Layout>
      <HeroSection />
      <TransformationSection />
      <TransparencyPreview />
      <ReviewsPreview />
      <AdmissionPreview />
      <PaymentReassurance />
      <FamilyTrustLoop />
      <FAQSection />
    </Layout>
  );
}
