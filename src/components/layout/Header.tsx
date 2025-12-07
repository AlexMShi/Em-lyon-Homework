import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/transparency', label: 'Transparency & Visits' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/admission', label: 'Admission' },
  { href: '/family-portal', label: 'Family Portal' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleBookVisit = () => {
    trackEvent('book_visit_click', { source: 'header' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container-wide px-4 md:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">E</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">Emeis</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>
            <a
              href="tel:+33123456789"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </a>
            <Link to="/transparency">
              <Button onClick={handleBookVisit} className="cta-primary">
                Book a Visit
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    location.pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
              <div className="flex items-center gap-4 px-4">
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span>EN</span>
                </button>
                <a
                  href="tel:+33123456789"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </a>
              </div>
              <div className="px-4">
                <Link to="/transparency" onClick={() => setIsMenuOpen(false)}>
                  <Button onClick={handleBookVisit} className="cta-primary w-full">
                    Book a Visit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
