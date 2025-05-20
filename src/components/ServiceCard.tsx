
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// Optional: If you want to add an arrow or other icon, import it here
// import { ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  id: string;
  imageUrl: string;
  imageHint: string;
  name: string;
  description: string;
}

export default function ServiceCard({ imageUrl, imageHint, name, description }: ServiceCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-2xl border border-border hover:border-primary/50 transition-all duration-300 ease-in-out hover:scale-[1.02]">
      <CardHeader className="p-0 relative aspect-video w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name || 'Service Image'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
          data-ai-hint={imageHint}
        />
        {/* Optional: A subtle gradient overlay on image hover if desired in the future
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        */}
      </CardHeader>
      <CardContent className="p-5 flex-grow flex flex-col">
        <CardTitle className="text-lg font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors duration-300">
          {name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground flex-grow line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>
      {/* Optional: Footer for a "Learn More" link or other actions
      <CardFooter className="p-4 pt-2 mt-auto border-t border-border/50 group-hover:border-primary/30 transition-colors duration-300">
        <Button variant="link" className="p-0 h-auto text-sm text-primary group-hover:underline">
          Learn More <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
      */}
    </Card>
  );
}
