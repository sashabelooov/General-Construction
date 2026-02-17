import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { useLanguage } from "@/lib/i18n";

const offices = [
  {
    name: "Yangiobod Residence",
    address: "Yashnobod tumani, Uysozlar mavzesi 9/1 uy",
    phone: "+998 (78) 555-55-44",
    hours: { uz: "Dush - Jum: 09:00 - 18:00", ru: "Пн - Пт: 09:00 - 18:00", en: "Mon - Fri: 09:00 - 18:00" },
    mapUrl: "https://maps.google.com/maps?q=41.257387,69.343874&z=16&output=embed",
    lat: 41.257387,
    lng: 69.343874,
  },
  {
    name: "Afsona Residence",
    address: "Toshkent shaxri, Yunusobod tumani, 4-mavze Adolat 28A",
    phone: "+998 (78) 555-55-44",
    hours: { uz: "Dush - Jum: 09:00 - 18:00", ru: "Пн - Пт: 09:00 - 18:00", en: "Mon - Fri: 09:00 - 18:00" },
    mapUrl: "https://maps.google.com/maps?q=41.364006,69.281593&z=16&output=embed",
    lat: 41.364006,
    lng: 69.281593,
  },
];

function NavigationButtons({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="flex gap-2 mt-3">
      <a
        href={`https://3.redirect.appmetrica.yandex.com/route?end-lat=${lat}&end-lon=${lng}&appmetrica_tracking_id=1178268795219780156`}
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
        href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
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
  );
}

export default function Contact() {
  const { t, language } = useLanguage();

  const contactMethods = [
    {
      icon: Phone,
      title: t('contact.phone'),
      value: "+998 (78) 555-55-44",
      description: t('contact.businessHoursValue'),
      href: "tel:+998785555544",
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      value: "Yunusobod tumani",
      description: "Amir Temur shox ko'chasi, 210-uy",
      href: "#offices",
    },
    {
      icon: Clock,
      title: t('contact.businessHours'),
      value: t('contact.businessHoursValue'),
      description: t('contact.businessHoursDescription'),
      href: null,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-primary py-20">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
                {t('contact.heroTitle')}
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                {t('contact.heroDescription')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      className="block bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1 h-full"
                    >
                      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <method.icon className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2">{method.title}</h3>
                      <p className="text-foreground font-medium mb-1">{method.value}</p>
                      <p className="text-muted-foreground text-sm">{method.description}</p>
                    </a>
                  ) : (
                    <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <method.icon className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2">{method.title}</h3>
                      <p className="text-foreground font-medium mb-1">{method.value}</p>
                      <p className="text-muted-foreground text-sm">{method.description}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-secondary">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4">{t('contact.sendMessage')}</h2>
                <p className="text-muted-foreground mb-8">
                  {t('contact.sendMessageDescription')}
                </p>
                <div className="bg-card rounded-2xl p-8 shadow-soft">
                  <ConsultationForm />
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4">{t('contact.ourAddress')}</h2>
                <p className="text-muted-foreground mb-8">
                  {t('contact.ourAddressDescription')}
                </p>
                <div className="rounded-2xl overflow-hidden shadow-soft h-[400px]">
                  <iframe
                    src="https://maps.google.com/maps?q=41.364006,69.281593&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Office Location"
                  />
                </div>
                <NavigationButtons lat={41.364006} lng={69.281593} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Offices */}
        <section id="offices" className="py-16">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">{t('contact.ourOffices')}</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={office.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-soft"
                >
                  <div className="h-48 bg-muted">
                    <iframe
                      src={office.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title={office.name}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl mb-4">{office.name}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{office.address}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-accent" />
                        <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                          {office.phone}
                        </a>
                      </li>
                      <li className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-accent" />
                        <span className="text-muted-foreground">{office.hours[language] || office.hours.en}</span>
                      </li>
                    </ul>
                    <NavigationButtons lat={office.lat} lng={office.lng} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
