"use client";
import React from "react";
import { motion } from "framer-motion";

type Testimonial = {
    text: string;
    image: string;
    name: string;
    role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="relative h-[500px] overflow-hidden flex justify-center">
            {/* This container will be centered by flexbox, and act as the positioning parent */}
            <div className="relative w-full max-w-sm">
                <motion.div
                    animate={{
                        y: ["0%", "-50%"],
                    }}
                    transition={{
                        duration: props.duration || 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-0 left-0 flex flex-col gap-6 pb-6"
                >
                    {[...props.testimonials, ...props.testimonials].map(({ text, image, name, role }, i) => (
                        <div className="p-8 rounded-3xl border shadow-lg shadow-primary/10 w-full bg-background" key={i}>
                            <div className="text-lg font-light mb-4">{text}</div>
                            <div className="flex items-center gap-4 mt-5">
                                <img
                                    width={48}
                                    height={48}
                                    src={image}
                                    alt={name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <div className="font-semibold tracking-tight leading-5">{name}</div>
                                    <div className="leading-5 opacity-70 tracking-tight">{role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    </div>
  );
}; 