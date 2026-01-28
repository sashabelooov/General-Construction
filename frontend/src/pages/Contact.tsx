import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/forms/ConsultationForm";

const offices = [
  {
    name: "Head Office - Manhattan",
    address: "123 Broadway, Manhattan, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "manhattan@generalconstruction.com",
    hours: "Mon-Fri: 09:00 - 18:00",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219!2d-74.006015!3d40.712728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316c6b4b91%3A0x20b3c62f9b8c5b8f!2sBroadway%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1635959481000!5m2!1sen!2s",
  },
  {
    name: "Los Angeles Branch",
    address: "456 Sunset Blvd, Hollywood, CA 90028",
    phone: "+1 (555) 234-5678",
    email: "losangeles@generalconstruction.com",
    hours: "Mon-Fri: 09:00 - 18:00",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.732!2d-118.328661!3d34.092809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc3d5c1%3A0x8dc3396f7c9c6b0!2sSunset%20Blvd%2C%20Los%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1635959481000!5m2!1sen!2s",
  },
];

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri: 09:00 - 18:00",
    href: "tel:+15551234567",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@generalconstruction.com",
    description: "We respond within 24 hours",
    href: "mailto:info@generalconstruction.com",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "New York, Manhattan",
    description: "123 Broadway, NY 10001",
    href: "#offices",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Dush - Jum: 09:00 - 18:00",
    description: "Shanba: 10:00 - 15:00",
    href: null,
  },
];

export default function Contact() {
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
                Biz bilan bog'laning
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Savollaringiz bormi? Biz har doim aloqadamiz va yordam berishga tayyormiz.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <h2 className="section-title mb-4">Xabar yuboring</h2>
                <p className="text-muted-foreground mb-8">
                  Formani to'ldiring, tez orada siz bilan bog'lanamiz
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
                <h2 className="section-title mb-4">Bizning manzil</h2>
                <p className="text-muted-foreground mb-8">
                  Ofisimizga tashrif buyuring yoki qo'ng'iroq qiling
                </p>
                <div className="rounded-2xl overflow-hidden shadow-soft h-[400px]">
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
              <h2 className="section-title">Bizning ofislar</h2>
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
                        <Mail className="w-5 h-5 text-accent" />
                        <a href={`mailto:${office.email}`} className="hover:text-accent transition-colors">
                          {office.email}
                        </a>
                      </li>
                      <li className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-accent" />
                        <span className="text-muted-foreground">{office.hours}</span>
                      </li>
                    </ul>
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
