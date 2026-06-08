import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DeforestationSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const odometerRef = useRef(null);
  const treesContainerRef = useRef(null);
  const [showPrompt, setShowPrompt] = useState(false);

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
      img.src = `/assets/images/section2/frame_${frameNum}.jpg`;
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

    // Generate cartoon tree elements in container programmatically
    const treesContainer = treesContainerRef.current;
    if (treesContainer && treesContainer.children.length === 0) {
      for (let i = 0; i < 80; i++) {
        const tree = document.createElement('div');
        tree.className = 'tree-icon w-6 h-6 md:w-8 md:h-8 text-[#4A6B52] transition-transform duration-300';
        tree.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
            <path d="M12 2L3 17h6v5h6v-5h6L12 2z" />
          </svg>
        `;
        // Random positioning
        tree.style.position = 'absolute';
        tree.style.left = `${Math.random() * 95}%`;
        tree.style.top = `${Math.random() * 90}%`;
        tree.style.transform = `scale(${0.5 + Math.random() * 0.7})`;
        treesContainer.appendChild(tree);
      }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2500', // Pin duration
        pin: true,
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Check if progress is past 90% to trigger prompt
          setShowPrompt(self.progress > 0.9);
        }
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
    // Comically pop trees into the ground (shrink scale to 0)
    .to('.tree-icon', {
      scale: 0,
      opacity: 0,
      stagger: {
        amount: 2,
        from: 'random'
      },
      ease: 'back.in(1.7)'
    }, 0)
    // Scrub the counter numbers
    .to(odometerRef.current, {
      innerText: 357000000,
      snap: { innerText: 1 },
      duration: 2.5,
      ease: 'none'
    }, 0)
    // Fade in/out subtitling cards
    .to('.info-box-1', { opacity: 1, y: 0, duration: 0.5 }, 0.2)
    .to('.info-box-1', { opacity: 0, y: -20, duration: 0.5 }, 1.0)
    .to('.info-box-2', { opacity: 1, y: 0, duration: 0.5 }, 1.2)
    .to('.info-box-2', { opacity: 0, y: -20, duration: 0.5 }, 2.0)
    .to('.info-box-3', { opacity: 1, y: 0, duration: 0.5 }, 2.2);

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
      className="relative w-full h-screen overflow-hidden bg-[#EAE3D2]"
    >
      {/* Background Deforestation Canvas (Scrubbed) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none filter brightness-90 saturate-50"
        style={{ display: 'block' }}
      />

      {/* Floating Comical Trees Overlay */}
      <div ref={treesContainerRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none z-10" />

      {/* Main Stats Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-24 px-6 z-20">
        {/* Top Header */}
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-[#1F2922]/70 font-bold bg-[#FAF8F5]/80 px-3 py-1 rounded-full">
            The Hard Truth
          </span>
          <h2 className="text-4xl md:text-5xl font-heading mt-4 text-[#1F2922] max-w-lg">
            Our bums are draining our forests.
          </h2>
        </div>

        {/* Dynamic Odometer (Ticking up on Scroll) */}
        <div className="text-center bg-[#FAF8F5]/90 backdrop-blur-sm p-8 rounded-2xl border border-[#4A6B52]/10 shadow-xl max-w-xl w-full">
          <div className="text-[#4A6B52] text-5xl md:text-6xl font-bold tracking-tight leading-none mb-2 font-mono">
            <span ref={odometerRef}>0</span>
          </div>
          <p className="text-[#1F2922] text-sm uppercase tracking-wider font-semibold">
            Trees destroyed annually for paper products
          </p>
        </div>

        {/* Infobox messaging container */}
        <div className="relative w-full max-w-xl h-24 flex items-center justify-center">
          <div className="info-box-1 absolute opacity-0 translate-y-8 bg-[#FAF8F5] p-6 rounded-xl shadow-md border border-[#4A6B52]/10 text-center w-full">
            <p className="text-base text-[#1F2922]">
              India consumes <strong>2.1 million tonnes</strong> of hygiene paper yearly.
            </p>
          </div>
          <div className="info-box-2 absolute opacity-0 translate-y-8 bg-[#FAF8F5] p-6 rounded-xl shadow-md border border-[#4A6B52]/10 text-center w-full">
            <p className="text-base text-[#1F2922]">
              That's a forest the size of <strong>12,000 football fields</strong> wiped out. India ranks 3rd in tree loss.
            </p>
          </div>
          <div className="info-box-3 absolute opacity-0 translate-y-8 bg-[#FAF8F5] p-6 rounded-xl shadow-md border border-[#4A6B52]/10 text-center w-full">
            <p className="text-base text-[#1F2922] font-semibold text-[#4A6B52]">
              Surely, your bum deserves a cleaner, guilt-free conscience.
            </p>
          </div>
        </div>
      </div>

      {/* Comical Prompt at the end of the scroll */}
      <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-500 flex flex-col items-center text-sm font-bold text-[#4A6B52] bg-[#FAF8F5] px-4 py-2 rounded-full shadow-lg ${showPrompt ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span>Scroll to do better</span>
        <svg className="w-4 h-4 animate-bounce mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
