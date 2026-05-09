import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import Header from "../components/header";
import {useSearchParams} from "react-router-dom"

export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get("category");

    useEffect(() => {
        if (isLoading) {
            axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
                (response) => {
                    setProducts(response.data);
                    setIsLoading(false);
                }
            ).catch((error) => {
                console.error("Error fetching products:", error);
                setIsLoading(false);
                toast.error("failed to load products");
            }
            );
        }
    }, [isLoading]);

    const filteredProducts = selectedCategory
        ? products.filter(
            (item)=> item.category === selectedCategory
        ) : products;

    const groupedProduct = filteredProducts.reduce((acc, item) => {
        const category = item.category || "others";

        if (!acc[category]) {
            acc[category] = [];
        }

        acc[category].push(item);

        return acc;
    }, {});


    return (
        <div className="w-full min-h-screen bg-primary selection:bg-accent selection:text-white" >
            <Header />
            
            {isLoading ? (
                <div className="h-[70vh] flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                    {/* Page Intro */}
                    <div className="mb-20 text-center">
                        <div className="inline-flex items-center gap-3 bg-white/50 border border-secondary/10 px-4 py-1 rounded-full mb-4 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary/60">Curated Beauty</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif italic text-secondary">Our Collections</h1>
                    </div>

                    {Object.keys(groupedProduct).map((category) => (
                        <section key={category} className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            
                            {/* Category Header */}
                            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12 border-b border-secondary/5 pb-6">
                                <div className="flex-1">
                                    <p className="text-accent text-[11px] font-black uppercase tracking-[0.4em] mb-2">Explore</p>
                                    <h2 className="text-4xl md:text-5xl font-serif italic text-secondary capitalize">
                                        {category}
                                    </h2>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {groupedProduct[category].length} Items available
                                    </span>
                                </div>
                            </div>

                            {/* Product Grid - Upgraded to Grid for better responsiveness */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
                                {groupedProduct[category].map((item) => (
                                    <div key={item.productID} className="transition-transform duration-500 hover:-translate-y-2">
                                        <ProductCard product={item} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Empty State Fallback */}
                    {Object.keys(groupedProduct).length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-secondary/40 font-serif italic text-2xl">No products found in our vault...</p>
                        </div>
                    )}
                </main>
            )}
            
            {/* Minimalist Footer Decor */}
            <div className="py-12 border-t border-secondary/5 flex justify-center">
                 <img src="/logo1.png" alt="LuxeGlow" className="h-8 opacity-20 grayscale" />
            </div>
        </div>
    )
}