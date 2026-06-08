import React from 'react';
import { CartProvider } from './context/CartContext';
import SmoothScroll from './components/SmoothScroll';
import HeroSection from './components/HeroSection';
import DeforestationSection from './components/DeforestationSection';
import GrowthSection from './components/GrowthSection';
import ProcessSection from './components/ProcessSection';
import AnatomySection from './components/AnatomySection';
import ProductShelf from './components/ProductShelf';
import BYOBConfigurator from './components/BYOBConfigurator';
import Footer from './components/Footer';
import DividerQuoteSection from './components/DividerQuoteSection';

export default function App() {
  return (
    <CartProvider>
      <SmoothScroll>
        <div className="paper-grain relative w-full overflow-hidden min-h-screen bg-[#FAF8F5]">
          <main>
            {/* Section 1: Hero Video / Mask Reveal */}
            <HeroSection />

            {/* Section 2: Deforestation Tree-Pop Video Scrub */}
            <DeforestationSection />

            {/* Divider 1: Deforestation to Growth */}
            <DividerQuoteSection
              quote="Eco-friendly choices shouldn't feel like a punishment. We're here for a good time AND a long time."
              detail="Traditional paper giants clear millions of hectares of native forests annually and bleach rolls white with chlorine. We think it's time for a simple swap that doesn't cost the Earth."
              bgImage="/assets/images/image1.png"
              theme="dark"
            />

            {/* Section 3: Bamboo Growth Shoot Video Scrub */}
            <GrowthSection />

            {/* Divider 2: Growth to Process */}
            <DividerQuoteSection
              quote="We don't cut trees. We shave grass. (And it grows back faster than your hair)."
              detail="Bamboo is a giant grass, not a tree. It naturally regenerates from its root system, consumes 5x more carbon, and generates 35% more oxygen than equivalent stands of trees."
              bgImage="/assets/images/image6.png"
              theme="light"
            />

            {/* Section 3.3: Bamboo to Roll Manufacturing Process Canvas Scrub */}
            <ProcessSection />

            {/* Divider 3: Process to Anatomy */}
            <DividerQuoteSection
              quote="Naturally brown, organic, and unbleached. Just like your conscience."
              detail="By omitting chlorine bleaching and chemical optical brighteners, we keep toxic effluents out of rivers and preserve the raw, organic, pale-tan cellulose fibers."
              bgImage="/assets/images/image1.png"
              theme="dark"
            />

            {/* Section 3.5: 360° Anatomy Product Rotation Video Scrub */}
            <AnatomySection />

            {/* Section 4: Product Shelf (Horizontal Scroll & Fiber Magnifier) */}
            <ProductShelf />

            {/* Section 5: B.Y.O.B Configurator Box Drop Action */}
            <BYOBConfigurator />
          </main>

          {/* Section 6: Footer & Bum Score Calculator */}
          <Footer />
        </div>
      </SmoothScroll>
    </CartProvider>
  );
}
