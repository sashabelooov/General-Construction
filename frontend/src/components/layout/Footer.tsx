import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import GeneralConstructionLogo from "@/components/GeneralConstructionLogo";
import { useLanguage } from "@/lib/i18n";

const COMPANY_START_YEAR = 2022;

const offices = [
  { name: "Yangiobod Residence", address: "Yashnobod tumani, Uysozlar mavzesi 9/1 uy" },
  { name: "Afsona Residence", address: "Toshkent shaxri, Yunusobod tumani, 4-mavze Adolat 28A" },
];

const socialLinks = [
  { icon: "telegram", href: "https://t.me/generalconstructionuz" },
  { icon: "instagram", href: "https://www.instagram.com/generalconstruction.uz?igsh=eDdpY3o3dmFlang4" },
  { icon: "facebook", href: "https://www.facebook.com/generalconstructionuz" },
  { icon: "youtube", href: "https://www.youtube.com/@GeneralConstruction-f4g" },
];

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - COMPANY_START_YEAR;

  const quickLinks = [
    { href: "/projects", label: t('footer.projects') },
    { href: "/about", label: t('footer.about') },
    { href: "/news", label: t('footer.news') },
    { href: "/contact", label: t('footer.contact') },
  ];

  // Replace {years} placeholder with actual years
  const descriptionText = t('footer.description').replace('{years}', String(yearsOfExperience));

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Info */}
          <div className="space-y-8">
            {/* Logo & Description */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-6">
                <GeneralConstructionLogo className="h-8 w-auto max-w-[160px] object-contain" />
              </Link>
              <p className="text-primary-foreground/70 mb-6 max-w-md">
                {descriptionText}
              </p>
            </div>

            {/* Links and Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Quick Links */}
              <div>
                <h4 className="font-heading font-bold text-lg mb-4">{t('footer.quickLinks')}</h4>
                <ul className="space-y-2">
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

              {/* Contact Info */}
              <div>
                <h4 className="font-heading font-bold text-lg mb-4">{t('footer.contactUs')}</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="tel:+998785555544" className="flex items-center gap-3 hover:text-accent transition-colors text-primary-foreground/70">
                      <Phone className="w-4 h-4 text-accent" />
                      +998 (78) 555-55-44
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Offices */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-4">{t('footer.offices')}</h4>
              <ul className="space-y-3">
                {offices.map((office) => (
                  <li key={office.name} className="flex gap-3">
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-sm">{office.name}</p>
                      <p className="text-primary-foreground/70 text-sm">{office.address}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-4">{t('footer.socialMedia')}</h4>
              <div className="flex gap-5">
                {socialLinks.map((social) => (
                  social.href ? (
                    <a
                      key={social.icon}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-foreground/70 hover:text-accent transition-all duration-300 hover:-translate-y-1"
                    >
                      {social.icon === "telegram" && (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
                        </svg>
                      )}
                      {social.icon === "instagram" && (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      )}
                      {social.icon === "facebook" && (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      )}
                      {social.icon === "youtube" && (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )}
                    </a>
                  ) : (
                    <span
                      key={social.icon}
                      className="text-primary-foreground/30 cursor-not-allowed"
                    >
                      {social.icon === "youtube" && (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      )}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Google Map */}
          <div className="lg:pl-8">
            <h4 className="font-heading font-bold text-lg mb-4">{t('footer.location')}</h4>
            <div className="rounded-2xl overflow-hidden min-h-[400px] bg-primary-foreground/10">
              <iframe
                src="https://maps.google.com/maps?q=41.364006,69.281593&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <a
                href="https://3.redirect.appmetrica.yandex.com/route?end-lat=41.364006&end-lon=69.281593&appmetrica_tracking_id=1178268795219780156"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#FFDE00] text-black rounded-lg hover:brightness-95 transition-all text-sm font-semibold"
              >
                <svg width="20" height="20" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                  <rect width="800" height="500" fill="#FFDE00"/>
                  <text x="400" y="270" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="110" fill="black">
                    Яндекс <tspan fontStyle="italic" fontFamily="Verdana, sans-serif">Go</tspan>
                  </text>
                </svg>
                Yandex Go
              </a>
              <a
                href="https://waze.com/ul?ll=41.364006,69.281593&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#33CCFF] text-black rounded-lg hover:brightness-95 transition-all text-sm font-semibold"
              >
                <svg width="20" height="20" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                  <rect width="800" height="500" fill="#33CCFF"/>
                  <text x="120" y="280" fontFamily="Arial Rounded MT Bold, Helvetica, sans-serif" fontWeight="bold" fontSize="140" fill="black">waze</text>
                  <g transform="translate(550, 200)">
                    <circle cx="40" cy="115" r="22" fill="black"/>
                    <circle cx="110" cy="115" r="22" fill="black"/>
                    <path d="M145,65 C145,105 115,130 75,130 C45,130 15,115 5,100 C-5,85 5,65 5,65 C5,25 40,0 75,0 C110,0 145,25 145,65 Z" fill="white" stroke="black" strokeWidth="8"/>
                    <circle cx="60" cy="55" r="7" fill="black"/>
                    <circle cx="100" cy="55" r="7" fill="black"/>
                    <path d="M60,85 Q80,105 100,85" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round"/>
                  </g>
                </svg>
                Waze
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} General Construction. {t('footer.rights')}.
          </p>
          <div className="flex gap-6">
            <span className="text-primary-foreground/60 text-sm cursor-default">
              {t('footer.privacy')}
            </span>
            <span className="text-primary-foreground/60 text-sm cursor-default">
              {t('footer.terms')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
