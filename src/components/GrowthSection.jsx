import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GrowthSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const totalFrames = 144;

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

    // Preload image sequence
    const loadedImages = [];
    let loadedCount = 0;
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/assets/images/section3/frame_${frameNum}.jpg`;
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
        end: '+=2000',
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
      duration: 3,
      onUpdate: () => {
        const currentFrame = Math.round(frameObj.frame);
        currentFrameRef.current = currentFrame;
        drawFrame(currentFrame);
      }
    }, 0)
    // Slide in benefit statements at specific timeline intervals
    .to('.growth-point-1', { x: 0, opacity: 1, duration: 0.8 }, 0.3)
    .to('.growth-point-2', { x: 0, opacity: 1, duration: 0.8 }, 1.2)
    .to('.growth-point-3', { x: 0, opacity: 1, duration: 0.8 }, 2.0);

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
      className="relative w-full h-screen overflow-hidden bg-[#FAF8F5] flex items-center justify-center"
    >
      {/* Central Growth Canvas (Scrubbed) */}
      <div className="absolute inset-0 w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none filter brightness-105"
          style={{ display: 'block' }}
        />
      </div>

      {/* Floating Info Cards Overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 h-full flex flex-col justify-center gap-6 pointer-events-none">
        
        {/* Left Aligned Statement 1 */}
        <div className="growth-point-1 opacity-0 -translate-x-12 max-w-sm md:max-w-md self-start bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-[#4A6B52]/10 shadow-lg pointer-events-auto">
          <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold font-body">
            Growth Speed
          </span>
          <h3 className="text-xl md:text-2xl font-heading text-[#1F2922] mt-1">
            Grows 30x faster than trees.
          </h3>
          <p className="text-sm font-body text-[#1F2922]/80 mt-2">
            Seriously, bamboo grows back from its roots in a couple of months. No replanting, no waiting 20 years.
          </p>
        </div>

        {/* Right Aligned Statement 2 */}
        <div className="growth-point-2 opacity-0 translate-x-12 max-w-sm md:max-w-md self-end bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-[#4A6B52]/10 shadow-lg pointer-events-auto">
          <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold font-body">
            Clean Air & Land
          </span>
          <h3 className="text-xl md:text-2xl font-heading text-[#1F2922] mt-1">
            Requires zero pesticide & yields 35% more oxygen.
          </h3>
          <p className="text-sm font-body text-[#1F2922]/80 mt-2">
            No chemicals, no heavy water systems. Just clean, grass-based fibers that actively heal the surrounding environment.
          </p>
        </div>

        {/* Left Aligned Statement 3 */}
        <div className="growth-point-3 opacity-0 -translate-x-12 max-w-sm md:max-w-md self-start bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-[#4A6B52]/10 shadow-lg pointer-events-auto">
          <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold font-body">
            Pure Efficiency
          </span>
          <h3 className="text-xl md:text-2xl font-heading text-[#1F2922] mt-1">
            Saves 37 gallons of water per roll.
          </h3>
          <p className="text-sm font-body text-[#1F2922]/80 mt-2">
            Ditched the bleach, dumped the chlorine. Pure unbleached bamboo means no chemical runtime loops.
          </p>
        </div>

      </div>
    </section>
  );
}
