import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ServiceCardProps {
  id: string;
  imageUrl: string;
  imageHint: string;
  name: string;
  description: string;
}

export default function ServiceCard({ imageUrl, imageHint, name, description }: ServiceCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col overflow-hidden h-full border-border hover:border-primary/30">
      <CardHeader className="p-0 relative aspect-[3/2] w-full">
        <Image
          src={imageUrl}
          alt={name || 'Service Image'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          data-ai-hint={imageHint}
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="text-xl mb-2 text-primary">{name}</CardTitle>
        <CardDescription className="text-foreground/80 flex-grow">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
