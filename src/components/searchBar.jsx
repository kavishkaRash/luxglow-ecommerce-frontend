import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearch, IoClose, IoChevronForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    return (
        <div className="font-sans">
            {/* --- OVERLAY BACKDROP --- */}
            <div
                className={`
                    fixed inset-0 h-screen bg-secondary/10 backdrop-blur-md z-[100]
                    transition-opacity duration-500 ease-in-out
                    ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"}
                `}
                onClick={() => setIsSearchOpen(false)}
            >
                {/* --- SEARCH SIDEBAR DRAWER --- */}
                <div
                    className={`
                        absolute right-0 top-0 w-full max-w-[480px] h-full bg-white/90 backdrop-blur-2xl
                        flex flex-col shadow-[-20px_0_50px_rgba(156,39,176,0.1)]
                        transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                        ${isSearchOpen ? "translate-x-0" : "translate-x-full"}
                    `}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    {/* Header */}
                    <div className="p-8 flex items-center justify-between border-b border-secondary/5">
                        <div className="flex flex-col">
                            <h2 className="text-secondary text-3xl font-serif italic leading-none">Search</h2>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-2">Find your radiance</p>
                        </div>
                        <button 
                            onClick={() => setIsSearchOpen(false)}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/50 text-secondary hover:bg-accent hover:text-white transition-all duration-300 group"
                        >
                            <IoClose className="text-2xl group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                    </div>

                    {/* Search Field Area */}
                    <div className="p-8">
                        <div className="relative group">
                            <input
                                type="search"
                                value={query}
                                onChange={async (e) => {
                                    setQuery(e.target.value);
                                    try {
                                        if (e.target.value === "") {
                                            setProducts([]);
                                        } else {
                                            const searchResults = await axios.get(import.meta.env.VITE_API_URL + "/api/products/search/" + e.target.value);
                                            setProducts(searchResults.data);
                                        }
                                    } catch (error) {
                                        console.error("Search failed:", error);
                                        toast.error("Search failed. Please try again.");
                                    }
                                }}
                                placeholder="Search our collection..."
                                className="w-full h-16 pl-6 pr-14 rounded-2xl bg-primary/30 border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary placeholder:text-gray-400 font-light italic"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-secondary/20">
                                <IoSearch className="text-xl" />
                            </div>
                        </div>

                        {/* Results Count Label */}
                        {query && (
                            <p className="mt-4 text-[10px] uppercase tracking-widest text-secondary/40 font-bold">
                                {products.length} {products.length === 1 ? 'Result' : 'Results'} found for "{query}"
                            </p>
                        )}
                    </div>

                    {/* Results Container */}
                    <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
                        {products.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {products.map((product) => (
                                    <div
                                        className="group flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-secondary/10 hover:bg-white hover:shadow-xl hover:shadow-secondary/5 cursor-pointer transition-all duration-300"
                                        key={product._id}
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            navigate("/overview/" + product.productID);
                                        }}
                                    >
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-primary">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-secondary font-bold text-sm group-hover:text-accent transition-colors">{product.name}</h3>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">View Details</p>
                                        </div>
                                        <IoChevronForwardOutline className="text-secondary/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        ) : query && !products.length ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                                    <IoSearch className="text-secondary/20 text-3xl" />
                                </div>
                                <p className="text-secondary/40 italic font-serif">No products found matching your search.</p>
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-4">
                                <p className="text-secondary/20 uppercase tracking-[0.4em] text-[9px] font-black">LuxeGlow Essentials</p>
                                <p className="text-gray-300 text-xs italic px-10 leading-relaxed">
                                    Try searching for "Serum", "Cream", or your favorite beauty ritual.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer / Suggestion area */}
                    <div className="p-8 bg-primary/30 mt-auto">
                        <span className="text-[9px] uppercase tracking-[0.5em] text-secondary/30 font-black">
                            LuxeGlow Beauty Search Protocol
                        </span>
                    </div>
                </div>
            </div>

            {/* --- OPEN TRIGGER BUTTON --- */}
            <div 
                className="group relative cursor-pointer p-2"
                onClick={() => setIsSearchOpen(true)}
            >
                <IoSearch className="text-2xl text-secondary group-hover:text-accent transition-colors" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform" />
            </div>
        </div>
    );
}