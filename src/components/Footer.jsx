import React, { useState } from 'react';
import { Mail, Check, Share2, Award } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);
  const [copyrightText, setCopyrightText] = useState('© 2026 Eco Turtles Exploration LLP. All rights reserved.');
  const [termsText, setTermsText] = useState('Terms of Use');
  const [privacyText, setPrivacyText] = useState('Privacy Policy');

  // Calculator State
  const [household, setHousehold] = useState(2);
  const [wipes, setWipes] = useState(3);
  const [preachiness, setPreachiness] = useState(5);
  const [scoreCalculated, setScoreCalculated] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState({ trees: 0, water: 0 });

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email) return;
    setSignedUp(true);
  };

  const calculateBumScore = () => {
    // Math formulas:
    // Avg toilet paper used per person per year: ~85 rolls.
    // Switching saves: 37 gallons water per roll + 17 trees per tonne paper.
    // Weight of toilet roll: ~200g. 1 roll = 0.0002 tonnes. 1 roll = 0.0034 trees saved.
    const rollsUsed = household * 85 * (wipes / 3);
    const trees = Math.round(rollsUsed * 0.0034 * 10) / 10;
    const water = Math.round(rollsUsed * 37);

    setCalculatedScore({
      trees: Math.max(0.1, trees),
      water,
    });
    setScoreCalculated(true);
  };

  const shareBumScore = () => {
    const text = `My household's bums saved ${calculatedScore.trees} trees and ${calculatedScore.water} gallons of water this year by switching to Circulr! What about yours? Calculate your bum's score here:`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=https%3A%2F%2Fthinkcirculr.com`;
    window.open(shareUrl, '_blank');
  };

  return (
    <footer 
      className="w-full text-[#1F2922] py-20 px-6 border-t border-[#4A6B52]/20 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: 'url(/assets/images/image6.png)',
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left: Email Signup & Interactive easter eggs */}
        <div className="flex flex-col justify-between gap-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#4A6B52] font-extrabold bg-white/80 px-3 py-1 rounded-full border border-[#4A6B52]/20 shadow-sm">
              Join the Circle
            </span>
            <h3 className="text-5xl font-heading mt-6 italic leading-none text-[#1F2922]">
              A little extra for your bums.
            </h3>
            <p className="text-sm font-body text-[#1F2922]/80 mt-3 max-w-md">
              Sign up for our newsletter to get 10% off your first purchase, BOGO deals updates, and eco-facts that aren't dry.
            </p>

            {/* Form */}
            <form onSubmit={handleSignup} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
              {signedUp ? (
                <div className="w-full p-4 rounded-full bg-white/90 border border-[#4A6B52]/30 text-[#4A6B52] font-bold text-center flex items-center justify-center gap-2 shadow-sm">
                  <Check className="w-5 h-5 animate-bounce" /> Code <span className="font-mono bg-[#4A6B52]/10 px-2 py-0.5 rounded text-[#4A6B52] ml-1">BXGYPROMO</span> unlocked!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    placeholder="Enter email for coupon code"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow px-6 py-3 rounded-full bg-white/90 border border-[#4A6B52]/20 text-[#1F2922] placeholder-[#1F2922]/50 focus:outline-none focus:border-[#4A6B52] focus:scale-[1.01] transition-all duration-300 font-body text-sm shadow-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#4A6B52] hover:bg-[#39533F] text-[#FAF8F5] font-bold font-body transition-colors duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer shadow-sm"
                  >
                    <Mail className="w-4 h-4" /> Subscribe
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Legal / Copyright details */}
          <div className="flex flex-col sm:flex-row gap-6 sm:items-center text-xs text-[#1F2922]/60 font-body">
            <span
              onMouseEnter={() => setCopyrightText('Stop looking at our bottom. Go save some trees instead.')}
              onMouseLeave={() => setCopyrightText('© 2026 Eco Turtles Exploration LLP. All rights reserved.')}
              className="hover:text-[#1F2922] transition-colors duration-300 cursor-help"
            >
              {copyrightText}
            </span>
            <div className="flex gap-4">
              <a
                href="#terms"
                onMouseEnter={() => setTermsText('Borrrring. But necessary.')}
                onMouseLeave={() => setTermsText('Terms of Use')}
                className="hover:text-[#1F2922] transition-colors duration-300"
              >
                {termsText}
              </a>
              <a
                href="#privacy"
                onMouseEnter={() => setPrivacyText('Still boring.')}
                onMouseLeave={() => setPrivacyText('Privacy Policy')}
                className="hover:text-[#1F2922] transition-colors duration-300"
              >
                {privacyText}
              </a>
            </div>
          </div>
        </div>

        {/* Right: The Bum-Score Impact Calculator */}
        <div className="bg-white/80 border border-[#4A6B52]/15 p-8 rounded-3xl backdrop-blur-md shadow-lg flex flex-col justify-between gap-6">
          
          <div>
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#4A6B52] font-bold">
              <Award className="w-5 h-5 text-[#4A6B52]" /> Bum Impact Score
            </span>
            <h4 className="text-2xl font-heading mt-3 italic text-[#1F2922]">
              How much difference does your bum make?
            </h4>
            <p className="text-xs font-body text-[#1F2922]/70 mt-1">
              Switching from wood-pulp to bamboo tissue leaves a massive footprint. Let's calculate yours.
            </p>
          </div>

          {scoreCalculated ? (
            /* Result Badge styled card with leaf gradient background image */
            <div
              className="relative p-6 rounded-2xl border border-[#4A6B52]/40 bg-[#FAF8F5] text-[#1F2922] shadow-inner overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(rgba(250,248,245,0.92), rgba(250,248,245,0.92)), url(/assets/images/image6.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="text-center relative z-10">
                <span className="text-[4rem] block leading-none">🏆</span>
                <h5 className="font-heading text-3xl italic font-bold text-[#1F2922] mt-2">
                  Eco-Hero Bum Certified!
                </h5>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/70 p-3 rounded-xl border border-[#4A6B52]/10">
                    <span className="text-2xl font-bold font-mono text-[#4A6B52] block">
                      {calculatedScore.trees}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#1F2922]/70 block">
                      Trees Saved / year
                    </span>
                  </div>
                  <div className="bg-white/70 p-3 rounded-xl border border-[#4A6B52]/10">
                    <span className="text-2xl font-bold font-mono text-[#4A6B52] block">
                      {calculatedScore.water}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#1F2922]/70 block">
                      Gals Water Saved
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setScoreCalculated(false)}
                    className="flex-1 py-2 rounded-full border border-[#4A6B52]/30 text-xs font-bold text-[#4A6B52] hover:bg-[#4A6B52]/10 transition-colors cursor-pointer"
                  >
                    Recalculate
                  </button>
                  <button
                    onClick={shareBumScore}
                    className="flex-1 py-2 rounded-full bg-[#4A6B52] hover:bg-[#39533F] text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share Score
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Calculator Inputs */
            <div className="flex flex-col gap-4 font-body">
              {/* Slider 1 */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1F2922]/80 flex justify-between">
                  <span>Household Size:</span>
                  <span className="font-mono text-[#4A6B52]">{household} people</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={household}
                  onChange={(e) => setHousehold(Number(e.target.value))}
                  className="w-full accent-[#4A6B52] mt-1 cursor-pointer"
                />
              </div>

              {/* Slider 2 */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1F2922]/80 flex justify-between">
                  <span>Average Wipes per Toilet Session:</span>
                  <span className="font-mono text-[#4A6B52]">{wipes} wipes</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={wipes}
                  onChange={(e) => setWipes(Number(e.target.value))}
                  className="w-full accent-[#4A6B52] mt-1 cursor-pointer"
                />
              </div>

              {/* Slider 3 */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1F2922]/80 flex justify-between">
                  <span>Recycling Preachiness Scale:</span>
                  <span className="font-mono text-[#4A6B52]">Level {preachiness}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={preachiness}
                  onChange={(e) => setPreachiness(Number(e.target.value))}
                  className="w-full accent-[#4A6B52] mt-1 cursor-pointer"
                />
              </div>

              <button
                onClick={calculateBumScore}
                className="w-full mt-2 py-3 bg-[#4A6B52] hover:bg-[#39533F] text-white rounded-full text-sm font-bold transition-all duration-300 cursor-pointer shadow-md"
              >
                Calculate My Bum Score 📊
              </button>
            </div>
          )}

        </div>

      </div>
    </footer>
  );
}
