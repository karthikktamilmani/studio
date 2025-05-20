
import { siteConfig, type Locale } from '@/config/site';
import { getDictionary } from '@/lib/get-dictionary';
import ContactForm from '@/components/ContactForm';
import ServiceCard from '@/components/ServiceCard';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Ensure Button is imported

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const { services: serviceTranslations, contact: contactTranslations, hero: heroTranslations } = dictionary;

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section - Updated Two-Column Layout with new color scheme */}
      <section
        id="home"
        className="py-20 md:py-28 lg:py-32" // Removed background gradient and text-primary-foreground
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="md:col-span-7 lg:col-span-7 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-foreground"> {/* Changed text-white to text-foreground */}
                {heroTranslations.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"> {/* Changed text-neutral-200 to text-muted-foreground */}
                {heroTranslations.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 rounded-lg shadow-lg transform transition hover:scale-105 duration-300 ease-in-out"
                  // Add Link behavior if this is a navigation item: asChild
                  // href={`/${lang}/try-free`}
                >
                  {heroTranslations.ctaPrimary || "Try it Free"}
                </Button>
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/80 font-semibold px-8 py-3 group flex items-center transition duration-300 ease-in-out" // Changed text-primary-foreground to text-primary
                  // Add Link behavior if this is a navigation item: asChild
                  // href={`/${lang}/request-demo`}
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

      {/* Contact Section - Enhanced with Glassmorphism and Asymmetrical Layout */}
      <section
        id="contact"
        className="py-12 md:py-16 bg-card/50 dark:bg-card/30 backdrop-blur-md rounded-xl shadow-xl border border-foreground/5"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">
            {contactTranslations.title}
          </h2>
          <div className="grid md:grid-cols-5 gap-10 md:gap-12 items-start max-w-5xl mx-auto">
            <div className="md:col-span-3 bg-background p-6 sm:p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-primary">{contactTranslations.form.submit}</h3>
              <ContactForm dictionary={contactTranslations.form} />
              <p className="mt-4 text-xs text-muted-foreground">{contactTranslations.formSubmissionNote}</p>
            </div>
            <div className="md:col-span-2 space-y-6 pt-0 md:pt-8">
              <h3 className="text-2xl font-semibold mb-6 text-primary">{contactTranslations.info.sectionTitle}</h3>
              <div className="flex items-start space-x-4 p-4 bg-secondary/30 rounded-md hover:shadow-lg hover:bg-secondary/50 transition-all duration-200 ease-in-out transform hover:-translate-y-1">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">{contactTranslations.info.phone}</h4>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-foreground/80 hover:text-accent transition-colors">{siteConfig.contact.phone}</a>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-secondary/30 rounded-md hover:shadow-lg hover:bg-secondary/50 transition-all duration-200 ease-in-out transform hover:-translate-y-1">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">{contactTranslations.info.email}</h4>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-foreground/80 hover:text-accent transition-colors">{siteConfig.contact.email}</a>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-secondary/30 rounded-md hover:shadow-lg hover:bg-secondary/50 transition-all duration-200 ease-in-out transform hover:-translate-y-1">
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
