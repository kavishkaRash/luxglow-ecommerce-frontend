import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { IoClose, IoTimeOutline, IoCheckmarkDoneOutline, IoCloseCircleOutline } from "react-icons/io5";

export default function OrderInfoModal({ isModelOpen, selectedOrder, closeModal, refresh }) {
    
    if (!isModelOpen || !selectedOrder) return null;

    // Logic to update order status
    const updateStatus = (newStatus) => {
        const token = localStorage.getItem("token");
        axios.put(`${import.meta.env.VITE_API_URL}/api/orders/status/${selectedOrder.orderID}`, 
            { status: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
            toast.success(`Order marked as ${newStatus}`);
            refresh(); // Trigger the parent to re-fetch orders
            closeModal();
        })
        .catch(() => {
            toast.error("Failed to update order status");
        });
    };

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-amber-100 text-amber-600 border-amber-200';
            case 'delivered': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            case 'cancelled': return 'bg-rose-100 text-rose-600 border-rose-200';
            default: return 'bg-secondary/10 text-secondary border-secondary/20';
        }
    };

    return (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
            {/* Modal Container */}
            <div className="bg-white/90 backdrop-blur-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-[45px] shadow-2xl border border-white flex flex-col relative animate-in zoom-in duration-300">
                
                {/* Header Section */}
                <div className="p-8 border-b border-secondary/5 flex justify-between items-start bg-white/50">
                    <div className="flex flex-col">
                        <h2 className="text-secondary text-3xl font-serif italic leading-none">Order Manifest</h2>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-accent mt-3">
                            REF: #{selectedOrder.orderID}
                        </span>
                    </div>
                    <button 
                        onClick={closeModal}
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all shadow-sm"
                    >
                        <IoClose size={20} />
                    </button>
                </div>

                {/* Content Section (Scrollable) */}
                <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
                    
                    {/* Customer & Shipping Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/30 border-b border-secondary/5 pb-2">Client Identity</h3>
                            <div className="space-y-1.5">
                                <p className="text-secondary font-serif text-xl italic">{selectedOrder.customerName}</p>
                                <p className="text-sm text-gray-500 font-light tracking-wide">{selectedOrder.email}</p>
                                <p className="text-sm text-gray-500 font-light">{selectedOrder.phone}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/30 border-b border-secondary/5 pb-2">Delivery Destination</h3>
                            <p className="text-sm text-secondary/70 leading-relaxed italic font-light bg-primary/20 p-4 rounded-2xl border border-white">
                                {selectedOrder.address}
                            </p>
                        </div>
                    </div>

                    {/* Order Inventory */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/30 border-b border-secondary/5 pb-2">Product Selection</h3>
                        <div className="grid gap-3">
                            {selectedOrder.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-5 bg-white p-3 rounded-[25px] border border-secondary/5 group hover:border-accent/20 transition-all">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-primary shadow-inner">
                                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-secondary font-bold text-sm tracking-tight">{item.name}</p>
                                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">SKU: {item.productID}</p>
                                    </div>
                                    <div className="text-right pr-4">
                                        <p className="text-secondary font-black text-sm">LKR {item.price.toFixed(2)}</p>
                                        <p className="text-[10px] text-accent font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Section: Summary & Actions */}
                <div className="p-8 bg-secondary/5 border-t border-secondary/5 space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                        
                        {/* Status Management */}
                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] uppercase tracking-widest font-black text-secondary/40">Update Journey Status</span>
                            <div className="flex gap-2">
                                <button onClick={() => updateStatus('delivered')}  className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-emerald-100" title="Mark Delivered">
                                    <IoCheckmarkDoneOutline size={18} />
                                </button>
                                <button onClick={() => updateStatus('pending')} className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-all shadow-sm border border-amber-100" title="Set to Pending">
                                    <IoTimeOutline size={18} />
                                </button>
                                <button onClick={() => updateStatus('cancelled')} className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-rose-100" title="Cancel Order">
                                    <IoCloseCircleOutline size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Grand Total */}
                        <div className="text-right">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-secondary/40 block mb-1">Grand Valuation</span>
                            <div className="flex items-baseline justify-end gap-2 text-secondary">
                                <span className="text-sm font-light italic opacity-60">LKR</span>
                                <span className="text-4xl font-black tracking-tighter italic">
                                    {selectedOrder.total.toFixed(2)}
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-gray-400 mt-2 block">
                                Placed on: {new Date(selectedOrder.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}