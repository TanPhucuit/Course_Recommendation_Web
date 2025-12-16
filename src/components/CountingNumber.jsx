import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const AnimatedCounter = ({ value, className = "" }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // Extract number and suffix from input string
    // Example: "10K+" -> number: 10, suffix: "K+"
    const match = value.match(/(\d+)(.*)/);
    if (match && isInView) {
      const numericValue = parseInt(match[1], 10);
      motionValue.set(numericValue);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    // Listen to spring value changes and update DOM directly
    // This avoids React re-renders for smooth animation
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Extract suffix again to append to the number
        const match = value.match(/(\d+)(.*)/);
        const suffix = match ? match[2] : "";
        
        // If value contains 'K', show decimal (0.1K steps), otherwise round
        const displayValue = suffix.includes('K') 
          ? latest.toFixed(1) 
          : Math.round(latest);
        
        ref.current.textContent = `${displayValue}${suffix}`;
      }
    });
  }, [springValue, value]);

  // Render initial value (0 + suffix) to prevent layout shift
  const initialMatch = value.match(/(\d+)(.*)/);
  const initialSuffix = initialMatch ? initialMatch[2] : "";

  return <span ref={ref} className={className}>0{initialSuffix}</span>;
};

export default AnimatedCounter;
