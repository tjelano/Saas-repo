import { createClient } from '@/utils/supabase/server'
import { HeroSection } from "@/components/ui/hero-section-1";
import { HowItWorks } from "@/components/ui/how-it-works";
import AboutUsSection from "@/components/ui/about-us-section";
import { PricingSectionDemo } from "@/components/ui/pricing-section-demo";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Footer } from "@/components/ui/footer";
import { Faq3 } from "@/components/ui/faq3";

// This makes the page dynamic instead of static
export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const testimonials = [
    { text: "This service is amazing!", image: "/path/to/image1.png", name: "Jane Doe", role: "CEO" },
    { text: "I love it!", image: "/path/to/image2.png", name: "John Smith", role: "Developer" },
  ];

  const faqItems = [
    { id: "faq1", question: "Is it easy to use?", answer: "Yes, it's very user-friendly." },
    { id: "faq2", question: "Can I customize it?", answer: "Absolutely, customization is a key feature." },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection user={user} />
      <HowItWorks />
      <AboutUsSection />
      <TestimonialsColumn testimonials={testimonials} />
      <PricingSectionDemo />
      <Faq3
        heading="Frequently Asked Questions"
        description="Here are some of our most asked questions."
        items={faqItems}
        supportHeading="Still have questions?"
        supportDescription="Contact us for more information."
        supportButtonText="Contact Us"
        supportButtonUrl="/contact"
      />
      <Footer />
    </main>
  );
}