import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { addTocart, getCartTotal, getItemTotal, loadCart } from "../utils/addToCart"
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState(loadCart());

    return (
        <div className="w-full min-h-[calc(100vh-140px)] flex flex-col py-12 items-center bg-primary font-sans">
            <div className="w-full max-w-[850px] px-6">
                
                {/* Cart Header */}
                <div className="mb-10 text-center lg:text-left">
                    <h1 className="text-secondary text-4xl font-serif italic tracking-tight">Your Beauty Bag</h1>
                    <p className="text-gray-500 text-sm mt-1 font-light">Review your selected essentials before checkout.</p>
                </div>

                {/* Cart Items List */}
                <div className="flex flex-col gap-6">
                    {cart.map((item, index) => {
                        return (
                            <div key={index} className="group relative w-full bg-white/70 backdrop-blur-md rounded-[35px] p-4 flex flex-col sm:flex-row gap-6 items-center border border-white shadow-xl shadow-secondary/5 hover:shadow-secondary/10 transition-all duration-500">
                                
                                {/* Product Image */}
                                <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-inner flex-shrink-0">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.image} alt={item.name} />
                                </div>

                                {/* Info Section */}
                                <div className="flex-grow flex flex-col text-center sm:text-left">
                                    <span className="text-[10px] font-mono text-gray-400 tracking-tighter mb-1">#{item.productID}</span>
                                    <h2 className="text-secondary font-serif italic text-xl leading-tight mb-2 truncate max-w-[200px]">
                                        {item.name}
                                    </h2>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-secondary/40">Category Selection</span>
                                </div>

                                {/* Quantity Control */}
                                <div className="flex items-center bg-primary/50 rounded-2xl px-3 py-2 gap-4">
                                    <button 
                                        onClick={() => { addTocart(item, -1); setCart(loadCart()); }}
                                        className="text-secondary/60 hover:text-accent transition-colors"
                                    >
                                        <CiCircleChevDown size={28} />
                                    </button>
                                    <span className="font-bold text-secondary text-xl min-w-[30px] text-center">{item.quantity}</span>
                                    <button 
                                        onClick={() => { addTocart(item, 1); setCart(loadCart()); }}
                                        className="text-secondary/60 hover:text-accent transition-colors"
                                    >
                                        <CiCircleChevUp size={28} />
                                    </button>
                                </div>

                                {/* Pricing Section */}
                                <div className="flex flex-col items-end pr-4 min-w-[140px]">
                                    {item.labelledPrice > item.price && (
                                        <span className="text-xs text-gray-400 line-through font-light italic">
                                            LKR {item.labelledPrice.toFixed(2)}
                                        </span>
                                    )}
                                    <span className="font-black text-secondary text-lg tracking-tighter">
                                        LKR {item.price.toFixed(2)}
                                    </span>
                                    <div className="h-[1px] w-8 bg-accent/20 my-1"></div>
                                    <span className="text-[10px] uppercase font-bold text-accent tracking-widest">
                                        Total: {getItemTotal(item).toFixed(2)}
                                    </span>
                                </div>

                                {/* Delete Button - Now integrated into the card design */}
                                <button 
                                    onClick={() => { addTocart(item, -item.quantity); setCart(loadCart()); }}
                                    className="sm:absolute -right-3 -top-3 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:scale-110 transition-all border border-gray-50"
                                >
                                    <BiTrash size={18} />
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Cart Summary / Footer */}
                {cart.length > 0 ? (
                    <div className="mt-12 w-full bg-white rounded-[40px] p-8 flex flex-col md:flex-row justify-between items-center shadow-2xl shadow-secondary/10 border border-white">
                        <div className="flex flex-col mb-6 md:mb-0">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-secondary/40">Subtotal Amount</span>
                            <span className="text-3xl font-black text-secondary tracking-tighter">
                                <span className="text-sm font-light mr-2 italic">LKR</span>
                                {getCartTotal().toFixed(2)}
                            </span>
                        </div>
                        
                        <Link 
                            to="/checkout" 
                            state={cart} 
                            className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-accent to-secondary text-white font-bold uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-accent/20 hover:opacity-90 active:scale-95 transition-all text-center"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                ) : (
                    <div className="text-center py-20 italic text-secondary/40">
                        Your beauty bag is currently empty.
                    </div>
                )}
            </div>
        </div>
    );
}