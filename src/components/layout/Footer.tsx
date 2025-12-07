import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, Heart, Users } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Residential Care', href: '#' },
    { label: 'Memory Care', href: '#' },
    { label: 'Respite Care', href: '#' },
    { label: 'Rehabilitation', href: '#' },
  ],
  transparency: [
    { label: 'Care Tracking', href: '/transparency' },
    { label: 'Verified Reviews', href: '/reviews' },
    { label: 'Quality Reports', href: '/transparency' },
    { label: 'Visit Our Facilities', href: '/transparency' },
  ],
  family: [
    { label: 'Family Portal', href: '/family-portal' },
    { label: 'Start Admission', href: '/admission' },
    { label: 'Payment Options', href: '/admission' },
    { label: 'FAQs', href: '/#faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Settings', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      {/* Trust Badges */}
      <div className="border-b border-cream/10">
        <div className="container-wide px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-cream">Certified Quality Care</p>
                <p className="text-sm text-cream/70">Highest national certification</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-cream">100% Transparency</p>
                <p className="text-sm text-cream/70">Real-time care tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-cream">Family-First Approach</p>
                <p className="text-sm text-cream/70">24/7 family support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">E</span>
              </div>
              <span className="font-display text-xl font-semibold">Emeis</span>
            </div>
            <p className="text-sm text-cream/70 mb-4">
              Redefining elderly care through transparency, quality, and genuine connection.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+33123456789" className="flex items-center gap-2 text-cream/70 hover:text-cream transition-colors">
                <Phone className="w-4 h-4" />
                +33 1 23 45 67 89
              </a>
              <a href="mailto:care@emeis.com" className="flex items-center gap-2 text-cream/70 hover:text-cream transition-colors">
                <Mail className="w-4 h-4" />
                care@emeis.com
              </a>
              <div className="flex items-center gap-2 text-cream/70">
                <MapPin className="w-4 h-4" />
                Paris, France
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-cream/70 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Transparency</h4>
            <ul className="space-y-2">
              {footerLinks.transparency.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-cream/70 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Families</h4>
            <ul className="space-y-2">
              {footerLinks.family.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-cream/70 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-cream/70 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container-wide px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/60">
            <p>© 2025 Emeis. All rights reserved.</p>
            <p>Committed to transparency and quality care.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
