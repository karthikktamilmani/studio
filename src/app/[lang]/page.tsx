import { siteConfig, type Locale } from '@/config/site';
import { getDictionary } from '@/lib/get-dictionary';
import ContactForm from '@/components/ContactForm';
import ServiceCard from '@/components/ServiceCard';
import { Phone, Mail, MapPin } from 'lucide-react';

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const { services: serviceTranslations, contact: contactTranslations, hero: heroTranslations } = dictionary;

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section id="home" className="text-center py-12 md:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-xl shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            {heroTranslations.title}
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            {heroTranslations.subtitle}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">
            {serviceTranslations.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                imageUrl={service.image}
                imageHint={service.dataAiHint}
                name={serviceTranslations.offerings[service.id as keyof typeof serviceTranslations.offerings]?.name || service.id}
                description={serviceTranslations.offerings[service.id as keyof typeof serviceTranslations.offerings]?.description || 'Description not available'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-16 bg-card rounded-xl shadow-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">
            {contactTranslations.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="bg-background p-6 sm:p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-primary">{contactTranslations.form.submit}</h3>
              <ContactForm dictionary={contactTranslations.form} />
              <p className="mt-4 text-xs text-muted-foreground">{contactTranslations.formSubmissionNote}</p>
            </div>
            <div className="space-y-6 pt-0 md:pt-8">
              <h3 className="text-2xl font-semibold mb-6 text-primary">{contactTranslations.info.sectionTitle}</h3>
              <div className="flex items-start space-x-4 p-4 bg-secondary/30 rounded-md hover:shadow-sm transition-shadow">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">{contactTranslations.info.phone}</h4>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-foreground/80 hover:text-accent transition-colors">{siteConfig.contact.phone}</a>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-secondary/30 rounded-md hover:shadow-sm transition-shadow">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">{contactTranslations.info.email}</h4>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-foreground/80 hover:text-accent transition-colors">{siteConfig.contact.email}</a>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-secondary/30 rounded-md hover:shadow-sm transition-shadow">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">{contactTranslations.info.address}</h4>
                  <p className="text-foreground/80 whitespace-pre-line">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
