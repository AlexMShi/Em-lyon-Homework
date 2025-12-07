import { faqItems } from '@/data/mockData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { trackEvent } from '@/lib/analytics';

export function FAQSection() {
  const handleFAQOpen = (id: string) => {
    trackEvent('faq_open', { faq_id: id });
  };

  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about our care, transparency, and admission process.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="bg-card rounded-2xl border border-border px-6 data-[state=open]:shadow-soft"
              >
                <AccordionTrigger
                  onClick={() => handleFAQOpen(item.id)}
                  className="text-left font-semibold text-foreground hover:no-underline py-5"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
