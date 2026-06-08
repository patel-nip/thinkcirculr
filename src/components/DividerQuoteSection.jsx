import React, { useEffect, useRef } from 'react';
import { animate, random } from 'animejs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DividerQuoteSection({ quote, detail, bgImage, theme = 'dark' }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const leavesRef = useRef([]);

  // Generate 20 floating positions for leaves on mount
  const leavesCount = 20;
  const leavesData = useRef(
    Array.from({ length: leavesCount }).map(() => ({
      left: Math.random() * 90 + 5,
      top: Math.random() * 80 + 10,
      scale: 0.6 + Math.random() * 0.6,
      rotate: Math.random() * 360,
    }))
  );

  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    if (!container || !bg) return;

    // 1. Parallax Scroll Effect
    const parallaxTween = gsap.to(bg, {
      yPercent: 25, // Slide background down relative to page scroll
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // 2. Continuous floating float animation for leaves using animejs v4 animate()
    const leavesElements = container.querySelectorAll('.interactive-leaf');
    const floatAnim = animate(leavesElements, {
      translateY: () => random(-15, 15),
      translateX: () => random(-15, 15),
      rotate: () => random(-20, 20),
      duration: () => random(2500, 4500),
      delay: () => random(0, 1000),
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    });

    return () => {
      parallaxTween.kill();
      floatAnim.pause();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) trigger.kill();
      });
    };
  }, []);

  // 3. Mouse Move Reaction - Push particles away from cursor
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Animate leaf components near the cursor using animejs v4 animate()
    animate(leavesRef.current.filter(Boolean), {
      translateX: (el) => {
        const itemX = parseFloat(el.getAttribute('data-initial-x')) * rect.width * 0.01;
        const diffX = itemX - x;
        const itemY = parseFloat(el.getAttribute('data-initial-y')) * rect.height * 0.01;
        const diffY = itemY - y;
        const dist = Math.hypot(diffX, diffY);

        if (dist < 220) {
          const force = (220 - dist) * 0.22; // Repulsion force strength
          return (diffX / dist) * force;
        }
        return 0; // Return to base
      },
      translateY: (el) => {
        const itemX = parseFloat(el.getAttribute('data-initial-x')) * rect.width * 0.01;
        const diffX = itemX - x;
        const itemY = parseFloat(el.getAttribute('data-initial-y')) * rect.height * 0.01;
        const diffY = itemY - y;
        const dist = Math.hypot(diffX, diffY);

        if (dist < 220) {
          const force = (220 - dist) * 0.22;
          return (diffY / dist) * force;
        }
        return 0; // Return to base
      },
      scale: (el) => {
        const itemX = parseFloat(el.getAttribute('data-initial-x')) * rect.width * 0.01;
        const diffX = itemX - x;
        const itemY = parseFloat(el.getAttribute('data-initial-y')) * rect.height * 0.01;
        const diffY = itemY - y;
        const dist = Math.hypot(diffX, diffY);
        const baseScale = parseFloat(el.getAttribute('data-scale'));

        if (dist < 220) {
          return baseScale * (1.2 - (dist / 220) * 0.2); // Pulse scale slightly
        }
        return baseScale;
      },
      easing: 'easeOutQuad',
      duration: 400,
    });
  };

  // 4. Mouse Leave - Return all particles to baseline coordinates smoothly
  const handleMouseLeave = () => {
    animate(leavesRef.current.filter(Boolean), {
      translateX: 0,
      translateY: 0,
      scale: (el) => parseFloat(el.getAttribute('data-scale')),
      easing: 'easeOutElastic(1, 0.6)', // animejs v4 elastic ease syntax, or standard easeOutElastic
      duration: 800,
    });
  };

  const isDark = theme === 'dark';

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[65vh] overflow-hidden flex items-center justify-center border-y border-[#4A6B52]/10`}
    >
      {/* Parallax Background Div */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(31, 41, 34, 0.72), rgba(31, 41, 34, 0.72)), url(${bgImage})`
            : `linear-gradient(rgba(250, 248, 245, 0.82), rgba(250, 248, 245, 0.82)), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Interactive Cursor-Reactive SVG Leaf Grid Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-5 overflow-hidden">
        {leavesData.current.map((leaf, index) => (
          <div
            key={index}
            ref={(el) => (leavesRef.current[index] = el)}
            data-initial-x={leaf.left}
            data-initial-y={leaf.top}
            data-scale={leaf.scale}
            className="interactive-leaf absolute opacity-20 text-[#4A6B52]"
            style={{
              left: `${leaf.left}%`,
              top: `${leaf.top}%`,
              transform: `scale(${leaf.scale}) rotate(${leaf.rotate}deg)`,
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          >
            {/* Minimalist leaf vector outline */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 7 19 7 19S16 20 18 11C19 6 17 8 17 8Z" />
              <path d="M2 22C2 22 5.5 17 8.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </div>

      {/* Floating Glassmorphic Quote Card */}
      <div className="relative z-10 max-w-4xl px-8 text-center pointer-events-none">
        <div 
          className={`p-10 md:p-14 rounded-3xl backdrop-blur-md shadow-2xl border pointer-events-auto transition-transform duration-500 hover:scale-[1.01] ${
            isDark 
              ? 'bg-[#1F2922]/90 border-white/10 text-[#FAF8F5]' 
              : 'bg-white/85 border-[#4A6B52]/10 text-[#1F2922]'
          }`}
        >
          {/* Decorative quote mark */}
          <span className="text-4xl md:text-5xl font-heading opacity-40 block mb-2 font-mono">“</span>
          
          <h3 className="text-2xl md:text-4xl font-heading italic leading-snug tracking-wide select-none">
            {quote}
          </h3>
          
          <div className={`w-16 h-0.5 mx-auto my-6 ${isDark ? 'bg-white/20' : 'bg-[#4A6B52]/20'}`} />
          
          <p className={`text-sm md:text-base font-body leading-relaxed max-w-xl mx-auto ${
            isDark ? 'text-[#FAF8F5]/70' : 'text-[#1F2922]/70'
          }`}>
            {detail}
          </p>
        </div>
      </div>
    </section>
  );
}
