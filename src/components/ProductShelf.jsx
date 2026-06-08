import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 'toilet-paper',
    name: 'Bamboo Toilet Paper',
    description: '3-Ply | 160 Pulls | Pack of 6. Super soft, unbleached, and chemical-free.',
    price: 250,
    bgColor: 'bg-[#FBEBE8]', // Soft pink
    borderColor: 'border-[#F1D1CC]',
    image: '/assets/images/image2.png',
  },
  {
    id: 'facial-tissues',
    name: 'Bamboo Facial Tissues',
    description: '2-Ply | 100/200 Pulls. Incredibly soft, unbleached boxes for everyday use.',
    price: 110,
    bgColor: 'bg-[#E3EFF1]', // Soft blue
    borderColor: 'border-[#D0DFE2]',
    image: '/assets/images/image3.png',
  },
  {
    id: 'tissue-tube',
    name: 'Bamboo Tissue Tube',
    description: '1 Tube + 3 Refills. Fits perfectly in your car cup holders and compact slots.',
    price: 200,
    bgColor: 'bg-[#FAF3E5]', // Soft cream
    borderColor: 'border-[#ECDCC1]',
    image: '/assets/images/image3.png', // Uses the same tissue asset or generic placeholder
  },
  {
    id: 'garbage-bags',
    name: 'Compostable Garbage Bags',
    description: 'Made of cornstarch and PBAT. Composts into organic matter, zero microplastics.',
    price: 180,
    bgColor: 'bg-[#EAF0EB]', // Soft sage
    borderColor: 'border-[#D1E0D4]',
    image: '/assets/images/image4.png',
  },
];

export default function ProductShelf() {
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const magnifierRef = useRef(null);
  const { addToCart } = useCart();
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [magnifierCoords, setMagnifierCoords] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });

  useEffect(() => {
    const scrollSection = scrollSectionRef.current;
    const container = containerRef.current;
    if (!scrollSection || !container) return;

    // Horizontal Scroll Trigger
    const scrollWidth = scrollSection.scrollWidth - window.innerWidth;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${scrollWidth + 800}`,
      pin: true,
      scrub: 1.2,
      invalidateOnRefresh: true,
      animation: gsap.to(scrollSection, {
        x: -scrollWidth,
        ease: 'none',
      }),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate background offset for magnifier
    // Scale is 2x, so bg offset is double the coordinate
    const bgX = -(x * 2) + 90; // 90 is half of magnifier width (180px)
    const bgY = -(y * 2) + 90;

    setMagnifierCoords({
      x: e.clientX,
      y: e.clientY,
      bgX,
      bgY,
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#FAF8F5] flex flex-col justify-between py-16"
    >
      {/* Title Header */}
      <div className="max-w-6xl mx-auto px-6 w-full text-center">
        <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold bg-[#EAF0EB] px-3 py-1 rounded-full">
          Product Showcase
        </span>
        <h2 className="text-5xl md:text-6xl font-heading text-[#1F2922] mt-4">
          Simple swaps that make a serious difference.
        </h2>
        <p className="text-sm font-body text-[#1F2922]/60 mt-1 max-w-lg mx-auto">
          Hover with your mouse to inspect the raw unbleached bamboo fibers. (Keep an eye out for surprises!)
        </p>
      </div>

      {/* Horizontal Scroll Section */}
      <div className="w-full flex-grow flex items-center overflow-hidden">
        <div
          ref={scrollSectionRef}
          className="flex gap-8 px-12 md:px-24 whitespace-nowrap"
          style={{ willChange: 'transform' }}
        >
          {products.map((product, idx) => (
            <div
              key={product.id}
              className={`w-[320px] md:w-[420px] h-[480px] md:h-[520px] rounded-3xl border-2 ${product.borderColor} ${product.bgColor} p-8 flex flex-col justify-between shrink-0 shadow-lg relative group transition-transform duration-500 hover:scale-[1.01]`}
            >
              {/* Product Info */}
              <div className="whitespace-normal">
                <h3 className="text-2xl md:text-3xl font-heading text-[#1F2922]">
                  {product.name}
                </h3>
                <p className="text-xs font-body text-[#1F2922]/70 mt-2 line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Product Image Component with Solid White Background & Padding */}
              <div 
                className="relative w-full h-[220px] md:h-[260px] my-4 overflow-hidden rounded-2xl flex items-center justify-center bg-white border border-[#4A6B52]/10 shadow-inner p-6 cursor-zoom-in group/img"
                onMouseEnter={() => setHoveredCardIndex(idx)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
              >
                {/* Static Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Purchase Controls */}
              <div className="flex items-center justify-between whitespace-normal">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#1F2922]/50 font-bold block">
                    Price
                  </span>
                  <span className="text-2xl font-bold text-[#1F2922] font-mono">
                    ₹{product.price}.00
                  </span>
                </div>

                <MagneticButton onClick={() => addToCart(product)}>
                  Add & Double BOGO
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fiber X-Ray Scope Magnifier Lens Overlay */}
      {hoveredCardIndex !== null && (
        <div
          ref={magnifierRef}
          className="fixed w-[180px] h-[180px] rounded-full border-3 border-[#4A6B52] pointer-events-none z-50 bg-[#FAF8F5] shadow-2xl overflow-hidden flex flex-col justify-between items-center text-center p-4"
          style={{
            left: `${magnifierCoords.x}px`,
            top: `${magnifierCoords.y}px`,
            transform: 'translate(-50%, -50%)',
            backgroundImage: 'url(/assets/images/image5.png)',
            backgroundSize: '840px 840px', // Coordinates zoom scale
            backgroundPosition: `${magnifierCoords.bgX}px ${magnifierCoords.bgY}px`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Subtle Koala Secret Overlay inside Magnifier */}
          <div className="absolute inset-0 bg-[#FAF8F5]/10 pointer-events-none mix-blend-multiply" />
          <div className="mt-auto bg-[#FAF8F5]/90 px-2 py-0.5 rounded-full border border-[#4A6B52]/10 z-10 text-[10px] font-bold text-[#4A6B52] shadow-sm select-none">
            🐨 Raw Bamboo Fibers
          </div>
        </div>
      )}
    </section>
  );
}
