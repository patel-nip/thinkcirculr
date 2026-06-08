# Developer & Designer Blueprint: Building the "CIRCULR" Interactive Landing Page
## Specification Prompt for React/Next.js Engineers & UI/UX Designers

This document outlines the visual design, interactive features, code architecture, and humorous hooks required to build a premium landing page for **Circulr** (referenced from [thinkcirculr_analysis.md](file:///d:/Projects/Media_Solace/Thinkcircular/thinkcirculr_analysis.md)). The scrolling engine, mask reveals, and scrubbing kinetics are modeled on the premium scroll-synchronization patterns of **rockstargames.com/VI** (referenced from [rockstar_vi_analysis.md](file:///d:/Projects/Media_Solace/Thinkcircular/rockstar_vi_analysis.md)), but adapted to a bright, organic, and highly humorous brand aesthetic matching `thinkcirculr.com`.

All assets referenced in this document are defined in the media generation blueprint [asset_generation_prompts.md](file:///d:/Projects/Media_Solace/Thinkcircular/asset_generation_prompts.md).

---

## 1. Design Aesthetic, Tone & Color Palette
*   **The Tone:** Cheerful, funny, self-aware, and organic. It strips away the preachy, guilt-inducing language of traditional eco-brands and replaces it with lighthearted humor (e.g., *"All bums on board,"* *"Stop looking at my bottom"*).
*   **The Visuals:** Bright, airy, and clean. No dark cyberpunk grids. Instead, we use soft gradients, paper textures, organic shapes, and minimalist UI elements.
*   **Color Palette (Earthy & Clean):**
    *   **Backgrounds:** Warm Unbleached Cream (`#FAF8F5`) and Soft Ivory (`#FFFFFF`).
    *   **Primary Text & Details:** Deep Forest Charcoal (`#1F2922`).
    *   **Accents:** Circulr Leaf Green (`#4A6B52`), Pastel Sky Blue (`#E0ECEE`), and Peach Orange (`#F4E8E1`).
*   **Sensory Overlay:** A very subtle, infinite CSS noise filter simulating recycled paper fibers, giving the bright design a tactile, organic depth.

---

## 2. Technical Stack & Setup
To achieve the performance required for synchronized scrubbing and vector masking without performance degradation, implement the following stack:

*   **Framework:** **Next.js 14+ (App Router)** & **React.js**. Leverage React hooks (`useRef`, `useEffect`, `useState`) for DOM manipulation and lifecycle binding.
*   **Animations:** **GSAP** (GreenSock) for timelines and tweening.
*   **Scroll Trigger:** **GSAP ScrollTrigger** for pinned segments and scrub timelines.
*   **Smooth Scroll:** **Lenis** (by Darkroom Engineering) for inertial scroll coordination in React.
*   **Micro-interactions:** **Framer Motion** for spring-based magnetic CTAs, wiggles, and layout animations.
*   **Styling:** **Tailwind CSS** paired with custom CSS Variables for custom SVG masks and clipping paths.

---

## 3. Asset Manifest & React Integration Specs
The following assets are generated using the prompts in [asset_generation_prompts.md](file:///d:/Projects/Media_Solace/Thinkcircular/asset_generation_prompts.md) and must be integrated into React components as specified:

| Asset Name | Type | Section | React Component Implementation Spec |
| :--- | :--- | :--- | :--- |
| `forest_loop.webm` / `.mp4` | Video Loop | Section 1 (Hero) | Preloaded, muted, autoplay, inline loop. Wrapped in a container with a `clip-path` mask. |
| `tree_pop.webm` / `.mp4` | Video Scrub | Section 2 (Why) | Pinned. Scrubbed frame-by-frame via GSAP timeline `currentTime` control. Must use keyframe-only (intra-frame) compression. |
| `growth_shoot.webm` / `.mp4` | Video Scrub | Section 3 (Growth) | Pinned. Scrubbed frame-by-frame via GSAP timeline. Growth timing synced to text node reveal states. |
| `product_showcase_loop.webm` | Video Loop | Section 4 (Shelf) | Hover-triggered autoplay in grid cards. Rest states render static poster image fallbacks. |
| `box_drop.webm` / `.mp4` | Video Trigger | Section 5 (BYOB) | Triggered programmatically on drag-and-drop actions. Renders with an alpha channel transparent background. |
| `unbleached_fibers.jpg` | Image | Section 4 (Magnifier)| Rendered inside a circular cursor lens overlay moving dynamically with mouse coordinates. |
| `eco_leaf_gradient.svg` | SVG | Section 5 & 6 | Native SVG elements integrated dynamically into layout grids. |

---

## 4. Section-by-Section Interactive Architecture

### Section 1: The Organic Hook (Hero Banner)
*   **Layout:** Widescreen header with soft-edged letterbox bars.
*   **Hero Visual:** Autoplay loop `forest_loop.webm` showing a daylight, sun-drenched bamboo forest.
*   **Typography:** A massive title in a bold, friendly serif font: **`CIRCULR`**. Below it, the tagline: *"Sustainability shouldn't be complicated. Or boring."*
*   **Scroll Sync Transition (The Ripple Mask):**
    *   As the user scrolls, the page pins (`pin: true`). 
    *   A vector shape of a water/paper ripple (Circulr's signature logo element) begins in the center and expands on scroll, acting as a mask that reveals the bright canvas of Section 2.

### Section 2: The Forest Reality Check (The "Why")
*   **Visual Setup:** A clean cream canvas populated by the scrubbable video layer `tree_pop.webm` showing cartoon trees popping down.
*   **Scroll Sync Interaction:**
    *   The section pins. As the user scrubs down, `tree_pop.webm` plays in sync with the scrollbar.
    *   A counter in a bold green font ticks up rapidly: **`35,70,00,000 TREES WIPED OUT`**.
    *   Humorous text slides in: 
        *   *“Yes, that’s 357 million trees destroyed globally every year for toilet rolls and tissues.”*
        *   *“That's 12,000 football fields of forest lost. India is ranked 3rd in tree loss just to support our bathroom habits.”*
        *   *“Surely, your bum deserves a cleaner, guilt-free conscience.”*
    *   At the end of the scroll, a giant prompt appears: `SCROLL TO DO BETTER`.

### Section 3: The Bamboo Hero Shoot (The Solution)
*   **Visual Setup:** The scrubbable growth video `growth_shoot.webm` pins in the center.
*   **Scroll Sync Interaction:**
    *   As the user scrolls, the growth video is scrubbed.
    *   Key benefits slide into view as the bamboo grows taller:
        *   *30% height:* **"Grows 30x faster than trees. (Basically on speed-dial)."**
        *   *60% height:* **"Requires zero pesticide & yields 35% more oxygen."**
        *   *100% height:* **"Saves 37 gallons of water per roll. (Very thirsty, but in a good way)."**

### Section 4: The Product Shelf (Horizontal Scrub Grid)
*   **Layout:** Viewport pins and slides the catalog horizontally.
*   **Product Cards (Bright pastel backgrounds matching packaging):**
    1.  **Bamboo Toilet Paper:** Displayed on a soft-pink circular pedestal.
    2.  **Bamboo Facial Tissues:** Sleek cardboard boxes.
    3.  **Bamboo Tissue Tube:** Cup-holder friendly (charcoal and blue cylinders swap on scroll).
    4.  **Compostable Garbage Bags:** Cornstarch bags that turn into compost, not microplastics.
*   **Micro-interactions & Hover Effects:**
    *   **Interactive Wiggle:** Hovering over a card triggers a slight springy wiggle, making the packaging feel alive.
    *   **The Cute X-Ray Lens:** A circular hover lens reveals a microscopic view of `unbleached_fibers.jpg`. If they hover long enough, a tiny cartoon koala waving a sign saying *"Thanks for not cutting my tree!"* or a tiny message *"100% organic, just like your conscience"* pops up.
    *   **Magnetic Button:** The "Add & Double" button pulls gently toward the mouse cursor.

### Section 5: The "All Bums on Board" B.Y.O.B Configurator
*   **Concept:** A gamified, interactive box builder.
*   **Interface:** A graphical, open shipping box at the bottom of the screen. Floating icons of products hang in the air.
*   **Interactivity:**
    *   Users drag and drop items into the box.
    *   **The Surprise Hook:** Dropping the first item triggers a screen bounce, and `box_drop.webm` plays to trigger a confetti splash of paper leaf emojis.
    *   When the cart hits **₹599**, a cartoon delivery truck drives across the header: **"FREE SHIPPING UNLOCKED! (Drive it like you stole it)."**
    *   **Satisfying Audio:** Pop and paper-crinkle sounds fire on drop.

### Section 6: Footer & Approachable CTA
*   **Layout:** Bright green background with cream text.
*   **Witty Easter Eggs:**
    *   Hovering over the legal terms changes them to: *"Borrrring. But necessary."*
    *   Hovering over the copyright notice changes it to: *"Stop looking at our bottom. Go save some trees instead."*
    *   A newsletter input box that scales on focus and instantly flashes the code **`BXGYPROMO`** on successful submission.

---

## 5. React & GSAP Developer Blueprints

### A. React Smooth Scroll Context (Lenis + ScrollTrigger)
Wrap the root layout in a smooth scroll component to coordinate Lenis and GSAP in React.

```jsx
'use client';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP Ticker animation loop
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // Clean up
    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  return <div className="scroll-wrapper">{children}</div>;
}
```

### B. React Video Scrubbing Component (ScrollTrigger-Controlled)
This React component implements butter-smooth video frame scrubbing. It hooks into a local video asset, pins the container, and scrubs its `currentTime` based on the scroll position.

```jsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoScrubber({ videoSrc, children }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure metadata is loaded to get video duration
    const onMetadataLoaded = () => {
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2000', // Scroll depth
          pin: true,
          scrub: 1.5, // Smooth lag catchup
          invalidateOnRefresh: true,
        },
      });

      // Scrub the currentTime property from 0 to video duration
      scrollTimeline.to(video, {
        currentTime: video.duration || 5,
        ease: 'none',
      });
    };

    if (video.readyState >= 1) {
      onMetadataLoaded();
    } else {
      video.addEventListener('loadedmetadata', onMetadataLoaded);
    }

    return () => {
      video.removeEventListener('loadedmetadata', onMetadataLoaded);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [videoSrc]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-cream">
      <video
        ref={videoRef}
        src={videoSrc}
        preload="auto"
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-full pointer-events-none"
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
```

### C. SVG Morphing Mask Component in React
This component creates the custom ripple expansion reveal.

```jsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MorphingMaskSection({ children }) {
  const triggerRef = useRef(null);
  const maskPathRef = useRef(null);

  useEffect(() => {
    gsap.to(maskPathRef.current, {
      scale: 45,
      transformOrigin: '50% 50%',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
      },
    });
  }, []);

  return (
    <div ref={triggerRef} className="relative w-full h-screen">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="circle-morph" clipPathUnits="objectBoundingBox">
            <path
              ref={maskPathRef}
              d="M0.5,0.5 C0.6,0.5 0.55,0.6 0.5,0.6 C0.45,0.6 0.4,0.5 0.5,0.5"
            />
          </clipPath>
        </defs>
      </svg>
      <div style={{ clipPath: 'url(#circle-morph)' }} className="w-full h-full bg-lightBlue">
        {children}
      </div>
    </div>
  );
}
```

### D. Magnetic Button Component (Framer Motion)
```jsx
'use client';
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticButton({ children, onClick }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    x.set(deltaX * 0.35); // Attract force coefficient
    y.set(deltaY * 0.35);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className="px-6 py-3 font-semibold rounded-full bg-leafGreen text-cream"
    >
      {children}
    </motion.button>
  );
}
```

---

## 6. Performance & Video Optimization Checklist
1.  **Intra-frame Video Compression (All Scrub Videos):** When encoding `tree_pop.webm` and `growth_shoot.webm`, force keyframes on every frame (GOP size = 1). Standard inter-frame compression will cause scrolling lag and frame jumps.
2.  **WebM Format Preference:** Standardize on `.webm` with VP9/VP8 video streams as primary, using `.mp4` as the fallback in source lists.
3.  **Media Preloading:** Set `preload="auto"` on React video elements, and trigger load states inside a `useEffect` hook to prevent rendering blank blocks.
4.  **Muted Autoplay:** Ensure all loop background videos have `muted` and `playsInline` attributes enabled, otherwise, mobile browsers will block autoplay.
