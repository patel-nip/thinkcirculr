import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const totalFrames = 192; // section6.mp4 has 192 frames (8s * 24fps)

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];
    if (img && img.complete) {
      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;
      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }

      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, drawX, drawY;
      if (canvasRatio > imgRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        drawHeight = canvasHeight;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Preload image sequence for manufacturing process
    const loadedImages = [];
    let loadedCount = 0;
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/assets/images/section6/frame_${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          drawFrame(currentFrameRef.current);
        } else if (i === 1 && loadedCount === 1) {
          drawFrame(0);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=3000', // Pin duration
        pin: true,
        scrub: 1.5,
        invalidateOnRefresh: true,
      }
    });

    const frameObj = { frame: 0 };

    // Scrub canvas frames
    tl.to(frameObj, {
      frame: totalFrames - 1,
      snap: 'frame',
      ease: 'none',
      duration: 4,
      onUpdate: () => {
        const currentFrame = Math.round(frameObj.frame);
        currentFrameRef.current = currentFrame;
        drawFrame(currentFrame);
      }
    }, 0)
    // Slide in the manufacturing step cards stagger-wise
    .to('.process-step-1', { opacity: 1, x: 0, duration: 0.8 }, 0.2)
    .to('.process-step-1', { opacity: 0, y: -20, duration: 0.5 }, 1.0)
    .to('.process-step-2', { opacity: 1, x: 0, duration: 0.8 }, 1.2)
    .to('.process-step-2', { opacity: 0, y: -20, duration: 0.5 }, 2.0)
    .to('.process-step-3', { opacity: 1, x: 0, duration: 0.8 }, 2.2)
    .to('.process-step-3', { opacity: 0, y: -20, duration: 0.5 }, 3.0)
    .to('.process-step-4', { opacity: 1, x: 0, duration: 0.8 }, 3.2);

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) trigger.kill();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#EAF0EB] flex items-center justify-center border-t border-[#4A6B52]/10"
    >
      {/* Background Process Canvas */}
      <div className="absolute inset-0 w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none filter brightness-95"
          style={{ display: 'block' }}
        />
      </div>

      {/* Floating Info Header */}
      <div className="absolute top-16 max-w-6xl mx-auto px-6 w-full text-center z-20 pointer-events-none">
        <span className="text-xs uppercase tracking-widest text-[#FAF8F5] bg-[#4A6B52] px-3 py-1 rounded-full shadow-md font-bold">
          The Process
        </span>
        <h2 className="text-4xl md:text-5xl font-heading text-[#1F2922] mt-4">
          How raw bamboo sprouts become soft rolls.
        </h2>
      </div>

      {/* Floating Info Cards Overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 h-full flex flex-col justify-center gap-6 pointer-events-none">
        
        {/* Step 1: Harvesting */}
        <div className="process-step-1 opacity-0 -translate-x-12 max-w-sm md:max-w-md self-start bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-[#4A6B52]/10 shadow-lg pointer-events-auto">
          <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold font-body">
            Step 1: Sustainable Harvest
          </span>
          <h3 className="text-xl md:text-2xl font-heading text-[#1F2922] mt-1">
            Bamboo Stalk Selection
          </h3>
          <p className="text-sm font-body text-[#1F2922]/80 mt-2">
            Mature bamboo is hand-cut at the nodes. The roots remain untouched, allowing shoots to grow back immediately without replanting.
          </p>
        </div>

        {/* Step 2: Pulping */}
        <div className="process-step-2 opacity-0 translate-x-12 max-w-sm md:max-w-md self-end bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-[#4A6B52]/10 shadow-lg pointer-events-auto">
          <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold font-body">
            Step 2: Fibrous Pulping
          </span>
          <h3 className="text-xl md:text-2xl font-heading text-[#1F2922] mt-1">
            Steaming & Crushing
          </h3>
          <p className="text-sm font-body text-[#1F2922]/80 mt-2">
            Stalks are split, crushed into cellulose chips, and steamed into organic, unbleached pulp, preserving the plant's natural brown fibers.
          </p>
        </div>

        {/* Step 3: Pressing */}
        <div className="process-step-3 opacity-0 -translate-x-12 max-w-sm md:max-w-md self-start bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-[#4A6B52]/10 shadow-lg pointer-events-auto">
          <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold font-body">
            Step 3: Pressing & Drying
          </span>
          <h3 className="text-xl md:text-2xl font-heading text-[#1F2922] mt-1">
            Bleach-Free Winding
          </h3>
          <p className="text-sm font-body text-[#1F2922]/80 mt-2">
            The steamed organic fibers pass through high-temperature steel rollers to form flat, dry paper sheets, with zero chlorine bleach used.
          </p>
        </div>

        {/* Step 4: Rolling */}
        <div className="process-step-4 opacity-0 translate-x-12 max-w-sm md:max-w-md self-end bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-[#4A6B52]/10 shadow-lg pointer-events-auto">
          <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold font-body">
            Step 4: Core Rolling
          </span>
          <h3 className="text-xl md:text-2xl font-heading text-[#1F2922] mt-1">
            3-Ply Winding & Packaging
          </h3>
          <p className="text-sm font-body text-[#1F2922]/80 mt-2">
            The unbleached sheets roll onto recycled cardboard tubes, are cut into rolls, and get packaged inside fully compostable paper wraps.
          </p>
        </div>

      </div>

      {/* Action scroll tracker badge */}
      <div className="absolute bottom-12 z-20 pointer-events-none text-xs uppercase tracking-widest text-[#4A6B52] font-semibold bg-white/80 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
        <span>Scroll to see the process in action</span>
      </div>
    </section>
  );
}
