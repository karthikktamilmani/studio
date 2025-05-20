
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ServiceCardProps {
  id: string;
  imageUrl: string;
  imageHint: string;
  name:string;
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
      </CardHeader>
      <CardContent className="p-5 flex-grow flex flex-col">
        <CardTitle className="text-lg font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors duration-300">
          {name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground flex-grow line-clamp-3 group-hover:line-clamp-none group-hover:overflow-visible">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
