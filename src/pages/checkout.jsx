import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getItemTotal } from "../utils/addToCart";
import toast from "react-hot-toast";
import axios from "axios";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import OrderConfirmModal from "../components/orderConfirmModal";
import Header from "../components/header";



export default function Checkout() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state || []);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function getCartTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }


    return (
        <div className="w-full h-screen bg-primary/40 flex flex-col items-center  font-sans">
            <Header />
            <div className="w-full max-w-[800px] py-12 px-4">

                <OrderConfirmModal isOpen={isOpen} cart={cart} closeModal={() => setIsOpen(false)} />

                {/* Elegant Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-secondary text-4xl font-serif italic tracking-tight">Final Review</h1>
                    <p className="text-gray-500 text-sm mt-2 font-light">Confirm your LuxeGlow selections before we prepare your delivery.</p>
                </div>

                {/* Product List */}
                <div className="flex flex-col gap-4 mb-10">
                    {cart.map((item, index) => {
                        return (
                            <div key={index} className="group relative w-full bg-white/80 backdrop-blur-xl rounded-[30px] p-4 flex flex-col md:flex-row items-center gap-6 border border-white shadow-xl shadow-secondary/5 transition-all duration-500">

                                {/* Product Image */}
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.image} alt={item.name} />
                                </div>

                                {/* Title & Info */}
                                <div className="flex-grow flex flex-col text-center md:text-left">
                                    <h2 className="text-secondary font-serif italic text-lg leading-tight truncate max-w-[220px]">
                                        {item.name}
                                    </h2>
                                    <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-tighter">SKU: {item.productID}</span>
                                </div>

                                {/* Quantity Controller */}
                                <div className="flex items-center bg-primary/40 rounded-xl px-2 py-1 gap-3">
                                    <button
                                        onClick={() => {
                                            const newCart = [...cart];
                                            if (newCart[index].quantity > 1) {
                                                newCart[index].quantity -= 1;
                                            }
                                            setCart(newCart);
                                        }}
                                        className="text-secondary/60 hover:text-accent transition-colors"
                                    >
                                        <CiCircleChevDown size={24} />
                                    </button>
                                    <span className="font-bold text-secondary text-lg min-w-[20px] text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => {
                                            const newCart = [...cart];
                                            newCart[index].quantity += 1;
                                            setCart(newCart);
                                        }}
                                        className="text-secondary/60 hover:text-accent transition-colors"
                                    >
                                        <CiCircleChevUp size={24} />
                                    </button>
                                </div>

                                {/* Pricing Section */}
                                <div className="flex flex-col items-end min-w-[120px]">
                                    {item.labelledPrice > item.price && (
                                        <span className="text-[10px] text-gray-300 line-through italic">
                                            LKR {item.labelledPrice.toFixed(2)}
                                        </span>
                                    )}
                                    <span className="font-bold text-secondary text-base">
                                        LKR {item.price.toFixed(2)}
                                    </span>
                                    <div className="h-[1px] w-6 bg-accent/20 my-1"></div>
                                    <span className="text-[10px] uppercase font-black text-accent tracking-widest">
                                        Sub: {getItemTotal(item).toFixed(2)}
                                    </span>
                                </div>

                                {/* Delete Action */}
                                <button className="md:absolute -right-3 -top-3 w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:scale-110 transition-all border border-gray-50">
                                    <BiTrash size={16} onClick={() => { /* Logic Placeholder */ }} />
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Final Order Summary Card */}
                <div className="w-full bg-white rounded-[40px] shadow-2xl shadow-secondary/10 border border-white overflow-hidden">
                    <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-8">

                        {/* Total Label */}
                        <div className="flex flex-col text-center md:text-left">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-secondary/40">Grand Total Payable</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-light text-secondary italic">LKR</span>
                                <span className="text-4xl font-black text-secondary tracking-tighter">
                                    {getCartTotal().toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Order Action */}
                        <Link
                            to="/checkout"
                            onClick={() => {
                                setIsOpen(true);
                            }}
                            className="group relative overflow-hidden w-full md:w-[240px] h-16 rounded-2xl bg-secondary flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-secondary/20 active:scale-95"
                        >
                            <span className="relative z-10 text-white font-bold uppercase tracking-[0.2em] text-xs" >
                                Confirm Order
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Link>
                    </div>

                    {/* Trust Banner */}
                    <div className="bg-primary/30 py-3 text-center">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-secondary/40 font-bold">
                            Secure Checkout • Authentic LuxeGlow Products • Quality Guaranteed
                        </p>
                    </div>
                </div>

                {/* Return Link */}
                <div className="mt-8 text-center">
                    <Link to="/cart" className="text-[10px] uppercase tracking-widest font-bold text-secondary/40 hover:text-accent transition-colors">
                        ← Return to Bag
                    </Link>
                </div>
            </div>
        </div>
    );
}