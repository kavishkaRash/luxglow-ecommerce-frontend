import { useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline, IoChevronForward } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utils/addToCart";

export default function OrderConfirmModal({ isOpen, orderID, closeModal, cart }) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    if (!isOpen) return null;

    async function purchaseCart() {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please login to complete your purchase");
            navigate("/login");
            return;
        }

        try {
            const itmes = [];
            for (let i = 0; i < cart.length; i++) {
                itmes.push({
                    productID: cart[i].productID,
                    quantity: cart[i].quantity
                });
            }

            await axios.post(import.meta.env.VITE_API_URL + "/api/orders", {
                customerName: name === "" ? null : name,
                address: address,
                items: itmes
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            clearCart();
            setIsProcessing(true);

            setTimeout(() => {
                closeModal();
                navigate("/products");
            }, 5000);

        } catch (error) {
            toast.error("Failed to complete purchase. Please try again.");
            console.error("Purchase Error:", error);
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-md flex items-center justify-center z-[100] p-4 transition-all duration-500">

            {/* Main Modal Card */}
            <div className="relative bg-white/90 backdrop-blur-2xl w-full max-w-md rounded-[40px] shadow-2xl border border-white overflow-hidden animate-in fade-in zoom-in duration-300">

                
                {isProcessing && (
                    <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                            <IoCheckmarkDoneOutline size={40} className="text-emerald-500" />
                        </div>
                        <h2 className="text-secondary text-3xl font-serif italic mb-3">Order Secured</h2>
                        <p className="text-gray-500 font-light leading-relaxed">
                            Thank you for your purchase. Your LuxeGlow treasures are being prepared. Redirecting to  product page...
                        </p>
                        <div className="mt-8 w-12 h-1 bg-primary rounded-full overflow-hidden">
                            <div className="h-full bg-accent animate-progress"></div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="p-8 pb-4 flex justify-between items-start">
                    <div>
                        <h2 className="text-secondary text-2xl font-serif italic">Finalize Order</h2>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mt-1">Shipping Information</p>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2 rounded-full hover:bg-primary text-secondary/40 hover:text-secondary transition-all"
                    >
                        <IoCloseOutline size={24} />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-8 pt-4 space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-secondary/40 ml-1">Recipient Name</label>
                        <input
                            className="w-full h-14 px-6 rounded-2xl border border-secondary/5 bg-primary/30 focus:bg-white focus:ring-2 focus:ring-accent/10 focus:border-accent/20 outline-none transition-all placeholder:text-gray-300 text-secondary font-medium"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Isabella Valli"
                        />
                    </div>

                    {/* Address Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-secondary/40 ml-1">Delivery Address</label>
                        <textarea
                            className="w-full h-32 p-6 rounded-2xl border border-secondary/5 bg-primary/30 focus:bg-white focus:ring-2 focus:ring-accent/10 focus:border-accent/20 outline-none transition-all placeholder:text-gray-300 text-secondary font-medium resize-none"
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter full shipping address..."
                        />
                    </div>

                    {/* Footer Info */}
                    <div className="bg-primary/50 p-4 rounded-2xl border border-white">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">Items in Bag</span>
                            <span className="text-secondary font-bold">{cart.length} Products</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={purchaseCart}
                        className="group w-full h-16 bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary text-white rounded-2xl shadow-xl shadow-accent/20 flex items-center justify-center gap-3 transition-all duration-500 active:scale-95"
                    >
                        <span className="font-bold uppercase tracking-[0.2em] text-xs">Confirm & Pay</span>
                        <IoChevronForward className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-center text-[10px] text-gray-400 italic">
                        Secured by LuxeGlow Encryption
                    </p>
                </div>
            </div>
        </div>
    );
}