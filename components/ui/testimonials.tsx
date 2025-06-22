"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Design Muse completely transformed my living room! I went from a blank slate to a cozy, modern space in minutes. I'm speechless.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah L.",
    role: "Homeowner",
  },
  {
    text: "I'm not a designer, but this tool made me feel like one. The AI is incredibly smart and the results are stunningly realistic.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "David Chen",
    role: "DIY Enthusiast",
  },
  {
    text: "The variety of styles is incredible. I was able to experiment with Bohemian, Scandinavian, and Industrial designs for my studio apartment.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Maria G.",
    role: "Renter & Creative",
  },
  {
    text: "As a real estate agent, I use this to help clients visualize a home's potential. It's an absolute game-changer for staging.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "James T.",
    role: "Real Estate Agent",
  },
  {
    text: "I was stuck on how to decorate my new office. Design Muse gave me the inspiration and confidence to create a space I love working in.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Emily R.",
    role: "Startup Founder",
  },
  {
    text: "The 'before and after' comparison is so satisfying. It's amazing to see the transformation right before your eyes.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Jessica P.",
    role: "Design Lover",
  },
  {
    text: "Super easy to use. Upload a photo, click a style, and boom—a new room. It's that simple.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Mike B.",
    role: "Busy Professional",
  },
  {
    text: "I was skeptical about AI design, but the quality of the renders blew me away. It looks like a real photograph.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Chloe K.",
    role: "Interior Design Student",
  },
  {
    text: "This is the future of interior design. Fast, affordable, and incredibly powerful. Highly recommend!",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Alex W.",
    role: "Tech Enthusiast",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            Loved by users worldwide
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about their experience with Design Muse.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 