import React from 'react';
import { IoSparklesOutline, IoShieldCheckmarkOutline, IoHeartOutline, IoEarthOutline } from "react-icons/io5";

export default function AboutUs() {
    return (
        <div className="w-full min-h-screen bg-[#FFFBFD] font-sans selection:bg-accent selection:text-white overflow-hidden">
            
            {/* --- HERO SECTION: Brand Introduction --- */}
            <section className="relative px-6 pt-24 pb-20 lg:pt-32 lg:pb-32 max-w-7xl mx-auto text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent opacity-60 -z-10" />
                
                <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-black mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-700">
                    Est. 2026 • LuxeGlow Beauty
                </span>
                
                <h1 className="text-secondary text-5xl md:text-7xl font-serif italic mb-8 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Defined by <span className="text-accent">Radiance</span>, <br />
                    Driven by Self-Care.
                </h1>
                
                <p className="max-w-2xl mx-auto text-gray-500 font-light leading-relaxed text-lg italic animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    LuxGlow is a modern beauty and skincare destination dedicated to helping people feel confident and radiant in their own skin. We believe beauty is not about perfection — it’s about <span className="text-secondary font-bold">self-expression</span> and the ritual of care.
                </p>
            </section>

            {/* --- CORE OFFERING: Skincare & Cosmetics --- */}
            <section className="px-6 py-20 bg-primary/30">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative group overflow-hidden rounded-[50px] aspect-[4/5] shadow-2xl shadow-secondary/10">
                        <img 
                            src="https://i.pinimg.com/736x/96/17/36/9617363ad8686f41ae79fabc8fcc2216.jpg" 
                            alt="Luxury Product" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
                    </div>
                    
                    <div className="space-y-8">
                        <h2 className="text-secondary text-4xl font-serif italic">The LuxeGlow Collection</h2>
                        <p className="text-gray-500 font-light leading-loose">
                            From the silken touch of our dermatologically-inspired <span className="text-accent font-medium">skincare</span> to the bold pigments of our <span className="text-accent font-medium">cosmetics</span>, we curate only the essentials. Every product in the LuxeGlow vault is a blend of scientific precision and aesthetic elegance.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-6 bg-white rounded-3xl border border-secondary/5 shadow-sm">
                                <span className="text-secondary font-bold block mb-1">Skincare</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Advanced Formulas</span>
                            </div>
                            <div className="p-6 bg-white rounded-3xl border border-secondary/5 shadow-sm">
                                <span className="text-secondary font-bold block mb-1">Cosmetics</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Trend-Forward</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MISSION: Why We Exist --- */}
            <section className="px-6 py-24 max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white mb-8 shadow-lg shadow-accent/20">
                    <IoSparklesOutline size={28} />
                </div>
                <h2 className="text-[10px] uppercase tracking-[0.4em] text-secondary/40 font-black mb-6">Our Mission</h2>
                <blockquote className="text-2xl md:text-4xl text-secondary font-serif leading-snug italic px-4">
                    "To provide high-quality beauty products that combine style, care, and confidence while remaining <span className="underline decoration-accent/30 underline-offset-8">affordable and accessible</span> to everyone who dreams of glowing."
                </blockquote>
            </section>

            {/* --- WHY CHOOSE US: Trust Factors --- */}
            <section className="px-6 py-20 bg-secondary/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-secondary text-4xl font-serif italic mb-4">Why LuxeGlow?</h2>
                        <p className="text-gray-400 font-light uppercase tracking-widest text-[10px]">The pillars of our community</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[40px] border border-white hover:shadow-xl hover:shadow-secondary/5 transition-all duration-500 group">
                            <IoShieldCheckmarkOutline className="text-accent mb-6 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-secondary font-bold text-lg mb-3">Uncompromising Quality</h3>
                            <p className="text-gray-500 text-sm font-light leading-relaxed">We source premium, safe ingredients to ensure every drop meets the highest standards of beauty safety.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[40px] border border-white hover:shadow-xl hover:shadow-secondary/5 transition-all duration-500 group">
                            <IoHeartOutline className="text-accent mb-6 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-secondary font-bold text-lg mb-3">Customer Satisfaction</h3>
                            <p className="text-gray-500 text-sm font-light leading-relaxed">Our relationship with you begins after the purchase. We are committed to your long-term radiance journey.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[40px] border border-white hover:shadow-xl hover:shadow-secondary/5 transition-all duration-500 group">
                            <IoEarthOutline className="text-accent mb-6 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-secondary font-bold text-lg mb-3">Trendy & Conscious</h3>
                            <p className="text-gray-500 text-sm font-light leading-relaxed">We stay ahead of global beauty trends while maintaining a soul that values authenticity and elegance.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VISION: Future --- */}
            <section className="px-6 py-32 text-center bg-white relative">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-secondary text-xs font-black uppercase tracking-[0.4em]">Our Vision</h2>
                    <h3 className="text-secondary text-4xl md:text-5xl font-serif italic">The Future is Luminous</h3>
                    <p className="text-gray-500 font-light text-lg">
                        We aim to become the world's most trusted beauty destination for individuals who value authenticity over perfection and elegance over trends.
                    </p>
                    <div className="pt-10">
                        <button className="px-12 py-5 bg-gradient-to-r from-secondary to-accent text-white rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-accent/20 hover:opacity-90 active:scale-95 transition-all">
                            Join the Glow
                        </button>
                    </div>
                </div>
            </section>

            {/* --- FOOTER TAG --- */}
            <footer className="py-12 border-t border-secondary/5 text-center">
                <p className="text-[9px] uppercase tracking-[0.8em] text-secondary/20 font-black">
                    LuxeGlow • Skin • Soul • Style
                </p>
            </footer>
        </div>
    );
}