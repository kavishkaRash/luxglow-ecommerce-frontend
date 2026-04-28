import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";

export default function ProductOverview() {
    const params = useParams();
    const [status, setStatus] = useState("loading");
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/api/products/" + params.id).then(
            (res) => {
                setProduct(res.data)
                setStatus("success")
            }
        ).catch(() => {
            toast.error("Failed to fetch Product")
            setStatus("error")
        })
    }, [params.id]); // Logic note: Added dependency to match standards, kept flow the same.

    return (
        <div className="w-full min-h-[calc(100vh-140px)] bg-primary/30 flex items-center justify-center p-6 lg:p-12">
            {status == "loading" && <Loader />}
            
            {status == "success" && (
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* LEFT: IMAGE SECTION */}
                    <div className="w-full aspect-square flex justify-center items-center bg-white rounded-[40px] shadow-2xl shadow-secondary/5 overflow-hidden border border-white p-4 lg:p-10">
                        <ImageSlider images={product.images} />
                    </div>

                    {/* RIGHT: DETAILS SECTION */}
                    <div className="flex flex-col h-full justify-center">
                        {/* Category Badge */}
                        <div className="mb-6">
                            <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-[0.2em] border border-secondary/5">
                                {product.category}
                            </span>
                        </div>

                        {/* Product Title & Alt Names */}
                        <h1 className="text-4xl lg:text-5xl font-serif text-secondary italic leading-tight">
                            {product.name}
                            <div className="mt-2 flex flex-wrap gap-2">
                                {product.altNames.map((name, index) => (
                                    <span key={index} className="text-sm font-sans not-italic font-light text-secondary/50 flex items-center">
                                        {index !== 0 && <span className="mx-2 opacity-30">•</span>}
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </h1>

                        {/* Description */}
                        <div className="mt-8 border-l-2 border-accent/20 pl-6">
                            <p className="text-gray-600 leading-relaxed font-light text-lg italic">
                                "{product.description}"
                            </p>
                        </div>

                        {/* Pricing Section */}
                        <div className="mt-10 flex items-center gap-6">
                            {product.labelledPrice > product.price ? (
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-400 line-through font-light">
                                        LKR {product.labelledPrice.toFixed(2)}
                                    </span>
                                    <span className="text-4xl font-bold text-accent tracking-tighter">
                                        <span className="text-lg mr-1">LKR</span>
                                        {product.price.toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-4xl font-bold text-secondary tracking-tighter">
                                    <span className="text-lg mr-1 font-medium">LKR</span>
                                    {product.price.toFixed(2)}
                                </span>
                            )}
                            
                            {product.labelledPrice > product.price && (
                                <div className="bg-accent/10 text-accent px-3 py-1 rounded-lg text-xs font-bold uppercase">
                                    Save {Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)}%
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row w-full gap-4 mt-12">
                            <button className="flex-1 h-16 rounded-2xl bg-gradient-to-r from-accent to-secondary text-white font-bold uppercase tracking-widest text-xs shadow-xl shadow-accent/20 hover:opacity-90 active:scale-95 transition-all">
                                Add to Cart
                            </button>
                            <button className="flex-1 h-16 rounded-2xl border-2 border-secondary/10 text-secondary font-bold uppercase tracking-widest text-xs hover:bg-white hover:border-secondary/20 active:scale-95 transition-all">
                                Buy it Now
                            </button>
                        </div>

                        {/* Trust Factors */}
                        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-secondary/5 pt-8">
                            <div className="text-[10px] text-secondary/40 uppercase tracking-widest font-bold">
                                ✓ Global Shipping
                            </div>
                            <div className="text-[10px] text-secondary/40 uppercase tracking-widest font-bold">
                                ✓ Luxury Packaging
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {status == "error" && (
                <div className="text-center p-20 bg-white rounded-[40px] shadow-xl">
                    <h1 className="text-accent text-2xl font-serif italic">Something went wrong.</h1>
                    <p className="text-gray-400 mt-2">The beauty secrets you seek are currently hidden.</p>
                </div>
            )}
        </div>
    )
}