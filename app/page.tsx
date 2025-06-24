import { HeroSection } from "@/components/ui/hero-section-1";
import { HowItWorks } from "@/components/ui/how-it-works";
import AboutUsSection from "@/components/ui/about-us-section";
import { PricingSectionDemo } from "@/components/ui/pricing-section-demo";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Footer } from "@/components/ui/footer";
import { Faq3 } from "@/components/ui/faq3";

// This makes the page dynamic instead of static
export const revalidate = 3600 // Revalidate every hour

export default function Home() {
  const testimonials = [
    { text: "This service is amazing! It completely transformed my living room.", image: "https://randomuser.me/api/portraits/women/44.jpg", name: "Sarah Johnson", role: "Homeowner" },
    { text: "I love it! The AI gave me ideas I would have never thought of.", image: "https://randomuser.me/api/portraits/men/32.jpg", name: "Michael Smith", role: "DIY Enthusiast" },
    { text: "Incredibly easy to use and the results are stunning. Highly recommend!", image: "https://randomuser.me/api/portraits/women/17.jpg", name: "Emily Davis", role: "Renter" },
    { text: "A game-changer for interior design mockups. Saves me so much time.", image: "https://randomuser.me/api/portraits/men/86.jpg", name: "Chris Lee", role: "Real Estate Agent" },
  ];

  const faqItems = [
    { id: "faq1", question: "Is it easy to use?", answer: "Yes, our platform is designed to be incredibly user-friendly. Just upload a photo, select a style, and our AI will handle the rest." },
    { id: "faq2", question: "Can I use this for commercial purposes?", answer: "With our Pro plan, you get a full commercial license to use your designs for any business purpose." },
    { id: "faq3", question: "What kind of image quality can I expect?", answer: "Our Pro plan offers up to 4K resolution images, perfect for high-quality prints and presentations." },
    { id: "faq4", question: "How many styles can I choose from?", answer: "We offer over 20 distinct design styles, from modern and minimalist to bohemian and industrial, with new styles added regularly." },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center gap-24">
      <HeroSection />
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