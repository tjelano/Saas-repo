import { Faq3 } from "@/components/ui/faq3"

const demoData = {
  heading: "Frequently Asked Questions",
  description:
    "Here are some of the most common questions we get about Design Muse. If you don't see your question here, feel free to reach out to our support team.",
  items: [
    {
      id: "faq-1",
      question: "How does the AI work?",
      answer:
        "Our AI has been trained on thousands of professional interior designs. You upload a photo of your room, and it uses that information along with your chosen style to generate a new, photorealistic image of what your space could look like.",
    },
    {
      id: "faq-2",
      question: "Is my data and are my photos kept private?",
      answer:
        "Yes, absolutely. We value your privacy. Your images are used only to generate your designs and are not shared with any third parties. Please see our Privacy Policy for more details.",
    },
    {
      id: "faq-3",
      question: "How long does it take to get my design?",
      answer:
        "It's incredibly fast! Most designs are generated in under 30 seconds. You can go from photo to fully redesigned room in less than a minute.",
    },
    {
      id: "faq-4",
      question: "What kind of image resolution can I expect?",
      answer:
        "Our Free plan provides standard resolution images perfect for viewing on screen. Our Pro plan offers stunning 4K high-resolution images suitable for printing.",
    },
    {
      id: "faq-5",
      question: "Can I use the designs for commercial purposes?",
      answer:
        "Designs created under our Pro plan come with a commercial license, allowing you to use them for things like real estate listings, marketing materials, and more.",
    },
  ],
  supportHeading: "Still have questions?",
  supportDescription:
    "Can't find the answer you're looking for? Our support team is here to help with any technical questions or concerns.",
  supportButtonText: "Contact Support",
  supportButtonUrl: "#",
};

function Faq3Demo() {
  return <Faq3 {...demoData} />;
}

export { Faq3Demo }; 