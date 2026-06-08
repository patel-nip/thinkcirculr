import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease
      smoothWheel: true,
      smoothTouch: false, // Maintain native mobile scroll feel
    });

    // Sync ScrollTrigger on Lenis tick
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker to Lenis loop
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // Disable GSAP lag smoothing to keep scrolling and timeline perfectly in sync
    gsap.ticker.lagSmoothing(0);

    // Store in global window for debugging and cross-component control
    window.lenis = lenis;

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <div ref={scrollContainerRef} className="smooth-scroll-container">{children}</div>;
}
