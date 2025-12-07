import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { events } from '@/lib/analytics';

export function StickyCTA() {
  const handleClick = () => {
    events.bookVisitClick('sticky_mobile');
  };

  return (
    <div className="sticky-cta">
      <Button variant="sticky" onClick={handleClick} asChild>
        <Link to="/transparency#book-visit" className="flex items-center justify-center gap-2">
          <Calendar className="h-5 w-5" />
          <span>Book a Visit</span>
        </Link>
      </Button>
    </div>
  );
}
