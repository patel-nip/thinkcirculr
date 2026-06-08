import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const availableItems = [
  { id: 'toilet-paper', name: 'Bamboo Toilet Paper', price: 250, icon: '🧻' },
  { id: 'facial-tissues', name: 'Bamboo Facial Tissues', price: 110, icon: '🤧' },
  { id: 'tissue-tube', name: 'Bamboo Tissue Tube', price: 200, icon: '🧪' },
  { id: 'garbage-bags', name: 'Compostable Garbage Bags', price: 180, icon: '🗑️' },
];

export default function BYOBConfigurator() {
  const { cart, addToCart, updateQuantity, removeFromCart, totalPrice, totalItems, bogoTriggered } = useCart();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Web Audio Synth for comically cute POP sound effects
  const playSynthPop = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {
      console.log('Audio blocked', e);
    }
  };

  const handleAddItem = (item) => {
    playSynthPop();
    addToCart(item);

    // Play box drop confetti video triggers
    setIsPlayingVideo(true);
    const video = document.getElementById('box-drop-video');
    if (video) {
      video.currentTime = 0;
      video.play();
    }
    setTimeout(() => setIsPlayingVideo(false), 2500); // Video loop duration
  };

  const isFreeShipping = totalPrice >= 599;

  return (
    <section className="relative w-full min-h-screen bg-[#FAF8F5] py-24 flex flex-col items-center justify-between border-t border-[#4A6B52]/10">
      
      {/* Dynamic Free Shipping Truck Marquee */}
      <div className="w-full overflow-hidden bg-[#E0ECEE] py-2.5 border-y border-[#B5CED2] relative flex items-center h-12">
        <AnimatePresence>
          {isFreeShipping ? (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="flex items-center gap-4 text-[#1F2922] font-body text-sm font-bold whitespace-nowrap"
            >
              🚚 FREE SHIPPING UNLOCKED! (Drive it like you stole it) • 🌲 357M Trees Saved One Butt at a Time • 🧻 Double BOGO active
            </motion.div>
          ) : (
            <div className="w-full text-center text-[#1F2922]/70 text-xs font-semibold uppercase tracking-wider">
              Add ₹{Math.max(0, 599 - totalPrice)} more for Free Shipping & a happy delivery truck!
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-stretch">
        
        {/* Left: Box Creator Controls */}
        <div className="flex flex-col justify-between p-8 bg-white rounded-3xl border border-[#4A6B52]/10 shadow-xl">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold bg-[#EAF0EB] px-3 py-1 rounded-full">
              Gamified Configurator
            </span>
            <h3 className="text-4xl font-heading text-[#1F2922] mt-4 leading-tight">
              All bums on board. <br />
              <span className="text-[#4A6B52]">Build your eco-swaps bundle!</span>
            </h3>
            <p className="text-sm font-body text-[#1F2922]/60 mt-3 max-w-md">
              Tap any item to comically drop it into your custom box. Every single item added is automatically doubled for free!
            </p>

            {/* List of available items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {availableItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddItem(item)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#4A6B52]/15 hover:border-[#4A6B52] hover:bg-[#EAF0EB] text-left transition-all duration-300 transform active:scale-95 group cursor-pointer"
                >
                  <span className="text-3xl group-hover:animate-bounce">{item.icon}</span>
                  <div>
                    <span className="font-heading text-lg font-bold text-[#1F2922] block leading-none">
                      {item.name}
                    </span>
                    <span className="text-xs text-[#1F2922]/60 font-mono block mt-1">
                      ₹{item.price} + free extra
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* BOGO flash indicator banner */}
          <AnimatePresence>
            {bogoTriggered && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="mt-6 p-4 rounded-xl bg-[#FBEBE8] border border-[#F1D1CC] text-center text-[#FF0055] font-bold tracking-wider uppercase text-xs animate-pulse"
              >
                🎉 BUY 1 GET 1 FREE ACTIVATED! Double Items Added!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Box Preview & Confetti Video Trigger */}
        <div className="relative rounded-3xl overflow-hidden bg-[#FAF3E5] border border-[#ECDCC1] shadow-xl flex flex-col justify-between p-8 min-h-[460px]">
          
          {/* Confetti video container overlay */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
            <video
              id="box-drop-video"
              src="/assets/videos/section5.mp4"
              muted
              playsInline
              preload="auto"
              className={`w-full h-full object-cover transition-opacity duration-300 ${isPlayingVideo ? 'opacity-90' : 'opacity-0'}`}
            />
          </div>

          {/* Card header */}
          <div className="flex items-center justify-between border-b border-[#ECDCC1] pb-4 z-20">
            <span className="flex items-center gap-2 font-bold font-body text-sm text-[#1F2922]/70 uppercase tracking-wider">
              <Package className="w-5 h-5 text-[#4A6B52]" /> Your Custom Box
            </span>
            <span className="font-mono text-sm text-[#4A6B52] bg-white px-2 py-0.5 rounded-full border border-[#4A6B52]/10">
              {totalItems} items
            </span>
          </div>

          {/* Box items listing */}
          <div className="flex-grow my-6 overflow-y-auto max-h-[200px] z-20 no-scrollbar pr-1 flex flex-col gap-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <ShoppingBag className="w-12 h-12 text-[#1F2922]/30 mb-2 stroke-[1.5]" />
                <p className="text-sm font-body text-[#1F2922]/50 italic">
                  Box is empty. Drop some eco-goodness inside!
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#ECDCC1]/40 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {availableItems.find((a) => a.id === item.id)?.icon}
                    </span>
                    <div>
                      <span className="font-heading text-base font-bold text-[#1F2922] block leading-none">
                        {item.name}
                      </span>
                      <span className="text-xs font-mono text-[#4A6B52] mt-0.5 block">
                        ₹{item.price} each (BOGO pack)
                      </span>
                    </div>
                  </div>

                  {/* Quantity control updates */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#4A6B52]/20 rounded-lg overflow-hidden bg-[#FAF8F5]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 2)}
                        className="px-2 py-1 text-xs hover:bg-[#EAF0EB] text-[#4A6B52]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold font-mono text-[#1F2922]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 2)}
                        className="px-2 py-1 text-xs hover:bg-[#EAF0EB] text-[#4A6B52]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Pricing total summary */}
          <div className="border-t border-[#ECDCC1] pt-4 z-20">
            <div className="flex justify-between items-center text-[#1F2922]">
              <span className="text-xs uppercase font-bold tracking-wider">Subtotal:</span>
              <span className="text-3xl font-bold font-mono">₹{totalPrice}.00</span>
            </div>
            {cart.length > 0 && (
              <button
                onClick={() => alert(`Redirecting to payment loop for ₹${totalPrice}.00! Your bums will thank you!`)}
                className="w-full mt-4 py-3 bg-[#4A6B52] hover:bg-[#39533F] text-[#FAF8F5] rounded-full font-bold font-body transition-colors duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                Checkout Securely 🚀
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
