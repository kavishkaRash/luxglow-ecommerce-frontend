import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function NewArrivalSection() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/api/products").then((res) => {
            const latestProducts = res.data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4);
            setProducts(latestProducts);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
    }, []); 

    return (
        <section className="relative w-full py-28  selection:bg-accent selection:text-white overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />
            
            <div className="max-w-7xl mx-auto px-6">
                
                <div className="flex flex-col items-center text-center mb-20">
                    <div className="inline-flex items-center gap-3 bg-white/80 border border-secondary/10 px-5 py-2 rounded-full mb-6 shadow-sm backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary/70">
                            The Latest Edit
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-serif italic text-secondary leading-tight">
                        New Arrivals
                    </h2>
                    
                    <p className="mt-4 text-secondary/40 font-light tracking-widest uppercase text-[10px] md:text-xs">
                        Freshly Curated • Just for your ritual
                    </p>

                    <div className="relative mt-10 w-32 h-[1px] bg-secondary/10 overflow-hidden">
                        <div className="absolute inset-0 bg-accent -translate-x-full animate-[shimmer_3s_infinite]" />
                    </div>
                </div>

                {isLoading ? (
                    <div className="h-[50vh] flex flex-col items-center justify-center gap-4">
                        <Loader />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-secondary/40 animate-pulse">
                            Unveiling Beauty...
                        </span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {products.map((item, index) => (
                            <div
                                key={item.productID}
                                className="group opacity-0 animate-[fadeInUp_1s_ease-out_forwards]"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="relative transition-all duration-700 ease-out group-hover:-translate-y-3">
                                    <ProductCard product={item} />
                                    
                                    <div className="absolute -inset-2 rounded-3xl border border-accent/0 group-hover:border-accent/10 transition-all duration-700 pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && (
                    <div className="mt-24 flex justify-center">
                        <button className="group flex flex-col items-center gap-4">
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary/60 group-hover:text-accent transition-colors">
                                View Full Collection
                            </span>
                            <div className="w-12 h-12 rounded-full border border-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                <svg 
                                    className="w-5 h-5 transition-transform group-hover:translate-y-1" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                        </button>
                    </div>
                )}
            </div>

            {/* Custom Animation Keyframes for the Shimmer & Entrance */}
            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}