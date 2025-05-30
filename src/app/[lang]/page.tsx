
import { siteConfig, type Locale } from '@/config/site';
import { getDictionary } from '@/lib/get-dictionary';
import ContactForm from '@/components/ContactForm';
import ServiceCard from '@/components/ServiceCard';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const { services: serviceTranslations, contact: contactTranslations, hero: heroTranslations } = dictionary;

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section - No specific background color, uses page background */}
      <section
        id="home"
        className="py-20 md:py-28 lg:py-32 text-foreground" // Text color uses theme foreground
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="md:col-span-7 lg:col-span-7 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-primary">
                {heroTranslations.title}
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl">
                {heroTranslations.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-lg transform transition hover:scale-105 duration-300 ease-in-out"
                >
                  {heroTranslations.ctaPrimary || "Try it Free"}
                </Button>
                <Button
                  variant="link"
                  className="text-accent hover:text-accent/80 font-semibold px-8 py-3 group flex items-center transition duration-300 ease-in-out"
                >
                  {heroTranslations.ctaSecondary || "Request a Demo"}
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            <div className="md:col-span-5 lg:col-span-5 mt-10 md:mt-0">
              <div className="relative w-full aspect-[3/4] sm:aspect-square md:aspect-[4/5] lg:aspect-[3/4] rounded-xl overflow-hidden shadow-2xl mx-auto max-w-xs sm:max-w-sm md:max-w-none transform transition hover:scale-105 duration-300 ease-in-out">
                <Image
                  src="https://placehold.co/600x800.png"
                  alt={heroTranslations.title}
                  fill
                  className="object-cover"
                  data-ai-hint="person interacting software interface"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Uses theme colors from globals.css */}
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

      {/* Contact Section - Uses theme colors from globals.css, Card with border for contrast */}
      <section
        id="contact"
        className="py-12 md:py-16 bg-background/50 dark:bg-background/30 backdrop-blur-md rounded-xl shadow-xl border border-border/30"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">
            {contactTranslations.title}
          </h2>
          <div className="grid md:grid-cols-5 gap-10 md:gap-12 items-start max-w-5xl mx-auto">
            {/* Contact Form card: uses card styles from theme which are light on light bg, dark on dark bg */}
            <div className="md:col-span-3 bg-card text-card-foreground p-6 sm:p-8 rounded-lg shadow-lg border border-border">
              <h3 className="text-2xl font-semibold mb-6 text-primary">{contactTranslations.form.submit}</h3>
              <ContactForm dictionary={contactTranslations.form} />
              <p className="mt-4 text-xs text-muted-foreground">{contactTranslations.formSubmissionNote}</p>
            </div>
            {/* Contact Info section: uses theme text colors */}
            <div className="md:col-span-2 space-y-6 pt-0 md:pt-8">
              <h3 className="text-2xl font-semibold mb-6 text-primary">{contactTranslations.info.sectionTitle}</h3>
              <div className="flex items-start space-x-4 p-4 bg-primary/10 rounded-md hover:shadow-lg hover:bg-primary/20 transition-all duration-200 ease-in-out transform hover:-translate-y-1">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">{contactTranslations.info.phone}</h4>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-foreground/80 hover:text-accent transition-colors">{siteConfig.contact.phone}</a>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-primary/10 rounded-md hover:shadow-lg hover:bg-primary/20 transition-all duration-200 ease-in-out transform hover:-translate-y-1">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">{contactTranslations.info.email}</h4>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-foreground/80 hover:text-accent transition-colors">{siteConfig.contact.email}</a>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-primary/10 rounded-md hover:shadow-lg hover:bg-primary/20 transition-all duration-200 ease-in-out transform hover:-translate-y-1">
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
