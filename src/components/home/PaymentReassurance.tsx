import { Shield, Lock, CreditCard, FileCheck } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const features = [
  {
    icon: Lock,
    title: 'Bank-Level Encryption',
    description: 'Your payment data is protected with 256-bit SSL encryption.',
  },
  {
    icon: Shield,
    title: 'PCI-DSS Compliant',
    description: 'We meet the highest security standards for payment processing.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment Options',
    description: 'Credit cards, bank transfers, insurance, and assistance programs.',
  },
  {
    icon: FileCheck,
    title: 'No Hidden Fees',
    description: 'Complete cost transparency. What we quote is what you pay.',
  },
];

export function PaymentReassurance() {
  const handleLearnMore = () => {
    trackEvent('payment_view', { source: 'home' });
  };

  return (
    <section className="section-padding bg-navy text-cream">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Secure & Transparent</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Payment Security You Can Trust
          </h2>
          <p className="text-lg text-cream/70">
            We protect your financial information with the same care we provide to residents.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-cream/5 border border-cream/10 hover:bg-cream/10 transition-colors"
              onClick={handleLearnMore}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-cream/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
