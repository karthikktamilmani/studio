'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ContactFormProps {
  dictionary: {
    name: string;
    email: string;
    message: string;
    submit: string;
    submissionSuccessTitle: string;
    submissionSuccessDescription: string;
    submissionErrorTitle: string;
    submissionErrorDescription: string;
  };
}

export default function ContactForm({ dictionary }: ContactFormProps) {
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call for static site
    console.log("Form values:", values);
    try {
      // Simulate success
      toast({
        title: dictionary.submissionSuccessTitle,
        description: dictionary.submissionSuccessDescription,
      });
      form.reset();
    } catch (error) {
      // Simulate error
      toast({
        title: dictionary.submissionErrorTitle,
        description: dictionary.submissionErrorDescription,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.name}</FormLabel>
              <FormControl>
                <Input placeholder={dictionary.name + "..."} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.email}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={dictionary.email + "..."} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.message}</FormLabel>
              <FormControl>
                <Textarea placeholder={dictionary.message + "..."} className="min-h-[120px] resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : dictionary.submit}
        </Button>
      </form>
    </Form>
  );
}
