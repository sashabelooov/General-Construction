import { Link } from "react-router-dom";
import { Building2, Phone, Mail, MapPin } from "lucide-react";

const offices = [
  { name: "Toshkent shahar", address: "Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li ko'chasi 15" },
  { name: "Samarqand shahar", address: "Registon ko'chasi 45" },
];

const quickLinks = [
  { href: "/projects", label: "Bizning loyihalar" },
  { href: "/about", label: "Kompaniya haqida" },
  { href: "/news", label: "Yangiliklar" },
  { href: "/contact", label: "Kontakt" },
];

const socialLinks = [
  { icon: "telegram", href: "https://t.me/generalconstruction" },
  { icon: "instagram", href: "https://instagram.com/generalconstruction" },
  { icon: "facebook", href: "https://facebook.com/generalconstruction" },
  { icon: "youtube", href: "https://youtube.com/generalconstruction" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <div>
                <span className="font-heading font-bold text-xl">General</span>
                <span className="font-heading font-bold text-xl text-accent"> Construction</span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 mb-6">
              O'zbekistondagi yetakchi qurilish kompaniyasi. 10+ yillik tajriba, 50+ tugatilgan loyihalar.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"
                >
                  {social.icon === "telegram" && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
                    </svg>
                  )}
                  {social.icon === "instagram" && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                  {social.icon === "facebook" && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  {social.icon === "youtube" && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Tezkor havolalar</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Ofislarimiz</h4>
            <ul className="space-y-4">
              {offices.map((office) => (
                <li key={office.name} className="flex gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{office.name}</p>
                    <p className="text-primary-foreground/70 text-sm">{office.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Bog'lanish</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+998991234567" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                  +998 99 123-45-67
                </a>
              </li>
              <li>
                <a href="tel:+998712345678" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                  +998 71 234-56-78
                </a>
              </li>
              <li>
                <a href="mailto:info@generalconstruction.uz" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                  info@generalconstruction.uz
                </a>
              </li>
            </ul>

            {/* Map Preview */}
            <div className="mt-6 rounded-xl overflow-hidden h-32 bg-primary-foreground/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.50264024!2d69.11455!3d41.31151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1635959481000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 General Construction. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-primary-foreground/60 text-sm hover:text-accent transition-colors">
              Maxfiylik siyosati
            </Link>
            <Link to="/terms" className="text-primary-foreground/60 text-sm hover:text-accent transition-colors">
              Foydalanish shartlari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
