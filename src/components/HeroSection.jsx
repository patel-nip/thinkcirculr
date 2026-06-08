import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const circle = circleRef.current;
    const text = textRef.current;

    // Timeline for hero pinning and mask expansion
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    // Animate letters/typography scaling down and out slightly, and circle mask scaling to infinity
    tl.to(text, {
      opacity: 0,
      scale: 0.95,
      duration: 1.5,
    })
    .to(circle, {
      attr: { r: 1.6 }, // Scaled up circle to completely uncover the 1x1 aspect ratio box
      duration: 3,
      ease: 'power2.in',
    }, '>-0.5') // Starts when the text is mostly faded out
    .to('.cinema-bar-top', {
      yPercent: -100,
      duration: 1.5,
    }, '<') // Play together with the circle expansion
    .to('.cinema-bar-bottom', {
      yPercent: 100,
      duration: 1.5,
    }, '<');

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === hero) trigger.kill();
      });
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-[#E5EDF0]"
    >
      {/* Background Video (Forest Loop) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 object-cover w-full h-full pointer-events-none filter brightness-95"
      >
        <source src="/assets/videos/section1.mp4" type="video/mp4" />
      </video>

      {/* SVG Mask Container */}
      <svg className="absolute w-0 h-0">
        <defs>
          <clipPath id="hero-reveal-mask" clipPathUnits="objectBoundingBox">
            <circle ref={circleRef} cx="0.5" cy="0.5" r="0" />
          </clipPath>
        </defs>
      </svg>

      {/* Center Heading Content */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
      >
        <h1 className="text-8xl md:text-[12rem] font-heading text-[#1F2922] drop-shadow-md select-none tracking-tight leading-none">
          CIRCULR
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-body max-w-xl text-[#2F3E33] leading-relaxed">
          Sustainability shouldn't be complicated. <br />
          <span className="font-heading text-2xl md:text-3xl font-bold text-[#4A6B52]">Or boring.</span>
        </p>
        <div className="absolute bottom-16 flex flex-col items-center animate-bounce text-sm text-[#4A6B52] font-semibold gap-2">
          <span>Scroll to Activate Playhead</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Cinema Letterbox Bars */}
      <div className="cinema-bar-top absolute top-0 left-0 w-full h-[10vh] bg-[#1F2922] z-20 flex items-center justify-between px-10 border-b border-[#2A3E31]/40">
        <span className="text-xs uppercase tracking-widest text-[#FAF8F5]/80 font-bold">Circulr © 2026</span>
        <span className="text-xs uppercase tracking-widest text-[#FAF8F5]/80 font-bold font-heading italic">Eco-Premium swaps</span>
      </div>
      <div className="cinema-bar-bottom absolute bottom-0 left-0 w-full h-[10vh] bg-[#1F2922] z-20 flex items-center justify-center border-t border-[#2A3E31]/40">
        <span className="text-xs uppercase tracking-widest text-[#FAF8F5]/60">Aspect Ratio locked: 21:9 Cinema Mode</span>
      </div>

      {/* Masked Content to Reveal (The Transition Layer into Section 2) */}
      <div
        style={{ 
          clipPath: 'url(#hero-reveal-mask)',
          backgroundImage: 'linear-gradient(rgba(31, 41, 34, 0.45), rgba(31, 41, 34, 0.45)), url(/assets/images/image1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute inset-0 w-full h-full z-15 flex flex-col justify-center items-center"
      >
        {/* Placeholder overlay to transition smoothly into the deforestation grid */}
        <div className="w-full h-full flex items-center justify-center text-center p-8">
          <div className="max-w-2xl bg-[#1F2922]/90 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm shadow-xl">
            <h2 className="text-5xl md:text-7xl font-heading text-[#FAF8F5] mb-6">
              Wait. Let's talk about bums.
            </h2>
            <p className="text-lg md:text-xl font-body text-[#A3B8A9]">
              Specifically, what we use to clean them. Scroll down to see the real impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
