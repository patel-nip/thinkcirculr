import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnatomySection() {
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
        // Fit by width and center vertically
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      } else {
        // Fit by height and center horizontally
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

    // Preload image sequence for 360 rotation
    const loadedImages = [];
    let loadedCount = 0;
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/assets/images/section4/frame_${frameNum}.jpg`;
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
        end: '+=2500', // Pin duration
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
    // Slide in the anatomical info cards stagger-wise
    .to('.anatomy-point-1', { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 0.2)
    .to('.anatomy-point-1', { opacity: 0, y: -30, duration: 0.6 }, 1.0)
    .to('.anatomy-point-2', { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 1.2)
    .to('.anatomy-point-2', { opacity: 0, y: -30, duration: 0.6 }, 2.0)
    .to('.anatomy-point-3', { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 2.2);

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
      className="relative w-full h-screen overflow-hidden bg-[#FAF3E5] flex items-center justify-center border-t border-[#4A6B52]/10"
    >
      {/* Background 360 Rotation Canvas */}
      <div className="absolute inset-0 w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none filter brightness-95"
          style={{ display: 'block' }}
        />
      </div>

      {/* Floating Info Overlay Header */}
      <div className="absolute top-16 max-w-6xl mx-auto px-6 w-full text-center z-20 pointer-events-none">
        <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold bg-white/90 px-3 py-1 rounded-full shadow-sm">
          360° Interactive Anatomy
        </span>
        <h2 className="text-4xl md:text-5xl font-heading text-[#1F2922] mt-4">
          Engineered for quality, shaped by nature.
        </h2>
      </div>

      {/* Floating Info Cards Overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 h-full flex items-center justify-center pointer-events-none">
        
        {/* Anatomical Card 1: 3-Ply Strength */}
        <div className="anatomy-point-1 absolute opacity-0 translate-y-12 scale-95 max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-3xl border border-[#4A6B52]/15 shadow-xl pointer-events-auto text-center">
          <span className="text-[2.5rem] block leading-none">💪</span>
          <h3 className="text-2xl font-heading text-[#1F2922] mt-3">
            Dense 3-Ply Strength
          </h3>
          <p className="text-sm font-body text-[#1F2922]/80 mt-2">
            Interlocking organic bamboo fibers woven to resist tearing under moisture. High-capacity absorbency without compromising structural integrity.
          </p>
        </div>

        {/* Anatomical Card 2: Unbleached Cellulose */}
        <div className="anatomy-point-2 absolute opacity-0 translate-y-12 scale-95 max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-3xl border border-[#4A6B52]/15 shadow-xl pointer-events-auto text-center">
          <span className="text-[2.5rem] block leading-none">🌿</span>
          <h3 className="text-2xl font-heading text-[#1F2922] mt-3">
            100% Unbleached Purity
          </h3>
          <p className="text-sm font-body text-[#1F2922]/80 mt-2">
            Completely free from chlorine bleaching, chemical optical brighteners, and toxic fragrances. Naturally hypoallergenic, skin-friendly cellulose.
          </p>
        </div>

        {/* Anatomical Card 3: Zero-Plastic Package */}
        <div className="anatomy-point-3 absolute opacity-0 translate-y-12 scale-95 max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-3xl border border-[#4A6B52]/15 shadow-xl pointer-events-auto text-center">
          <span className="text-[2.5rem] block leading-none">📦</span>
          <h3 className="text-2xl font-heading text-[#1F2922] mt-3">
            Zero Plastic Footprint
          </h3>
          <p className="text-sm font-body text-[#1F2922]/80 mt-2">
            Posed on raw wood and packaged in 100% recyclable, plastic-free paper wraps. Delivered in biodegradable cardboard shipping boxes.
          </p>
        </div>

      </div>

      {/* Action scroll down tracker badge */}
      <div className="absolute bottom-12 z-20 pointer-events-none text-xs uppercase tracking-widest text-[#4A6B52] font-semibold bg-white/80 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
        <span>Scrub to rotate 360°</span>
      </div>
    </section>
  );
}
