"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function SpecificVehicle({ testimonials }) {
 
  return (
    <div>
    
      {/* AnimatedTestimonials component */}
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
