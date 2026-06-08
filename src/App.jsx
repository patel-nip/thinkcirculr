import React from 'react';
import { CartProvider } from './context/CartContext';
import SmoothScroll from './components/SmoothScroll';
import HeroSection from './components/HeroSection';
import DeforestationSection from './components/DeforestationSection';
import GrowthSection from './components/GrowthSection';
import AnatomySection from './components/AnatomySection';
import ProductShelf from './components/ProductShelf';
import BYOBConfigurator from './components/BYOBConfigurator';
import Footer from './components/Footer';

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

            {/* Section 3: Bamboo Growth Shoot Video Scrub */}
            <GrowthSection />

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
