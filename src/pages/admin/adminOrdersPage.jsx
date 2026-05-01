import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import OrderInfoModal from "../../components/orderInfoModal";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token");
            axios
                .get(import.meta.env.VITE_API_URL + "/api/orders", {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                })
                .then((response) => {
                    setOrders(response.data);
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    // Helper for Status Badge colors
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-amber-100 text-amber-600 border-amber-200';
            case 'delivered': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            case 'cancelled': return 'bg-rose-100 text-rose-600 border-rose-200';
            default: return 'bg-secondary/10 text-secondary border-secondary/20';
        }
    };

    return (
        <div className="w-full min-h-screen bg-primary p-6 lg:p-12 font-sans selection:bg-accent/20">
            <OrderInfoModal isModelOpen={isModelOpen} selectedOrder={selectedOrder} closeModal={() => setIsModelOpen(false)} refresh={() => setIsLoading(true)} />
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-secondary text-5xl font-serif italic tracking-tight">
                        Order <span className="text-accent">Vault</span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-light tracking-wide">
                        Overseeing the luxury journey of every LuxeGlow creation.
                    </p>
                </div>
                
                <div className="bg-white/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white flex gap-8 shadow-sm">
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Total Orders</p>
                        <p className="text-secondary font-bold text-xl">{orders.length}</p>
                    </div>
                    <div className="w-[1px] bg-secondary/10 h-full"></div>
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Currency</p>
                        <p className="text-secondary font-bold text-xl">LKR</p>
                    </div>
                </div>
            </div>

            {/* Modern Table Container */}
            <div className="bg-white/80 backdrop-blur-2xl rounded-[45px] shadow-2xl shadow-secondary/5 border border-white overflow-x-auto">
                {isLoading ? (
                    <div className="py-20"><Loader /></div>
                ) : (
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-secondary/5 border-b border-secondary/5">
                                <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/50">Reference</th>
                                <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/50">Customer</th>
                                <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/50">Contact Info</th>
                                <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/50">Shipping Destination</th>
                                <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/50 text-right">Value</th>
                                <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/50 text-center">Status</th>
                                <th className="p-8 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/50 text-right">Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-secondary/5">
                            {orders.map((item) => (
                                <tr
                                    key={item.orderID}
                                    className="group hover:bg-primary/40 transition-all duration-500 cursor-pointer"
                                    onClick={() => {
                                        setSelectedOrder(item);
                                        setIsModelOpen(true);
                                    }}
                                >
                                    {/* ID Cell */}
                                    <td className="p-8">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-mono text-secondary/40 font-bold tracking-tighter">#{item.orderID}</span>
                                            <span className="text-xs font-bold text-accent mt-1">{item.items.length} {item.items.length === 1 ? 'Item' : 'Items'}</span>
                                        </div>
                                    </td>

                                    {/* Customer Name */}
                                    <td className="p-8">
                                        <span className="text-secondary font-serif italic text-lg group-hover:text-accent transition-colors">
                                            {item.customerName}
                                        </span>
                                    </td>

                                    {/* Email & Phone */}
                                    <td className="p-8">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm text-secondary/70 font-medium">{item.email}</span>
                                            <span className="text-xs text-gray-400 font-light">{item.phone}</span>
                                        </div>
                                    </td>

                                    {/* Address */}
                                    <td className="p-8 max-w-[200px]">
                                        <p className="text-xs text-secondary/60 leading-relaxed font-light line-clamp-2 italic">
                                            {item.address}
                                        </p>
                                    </td>

                                    {/* Total Value */}
                                    <td className="p-8 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Total</span>
                                            <span className="text-secondary font-black text-lg tracking-tighter">
                                                LKR {item.total.toFixed(2)}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="p-8 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm transition-all duration-300 ${getStatusStyles(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="p-8 text-right">
                                        <span className="text-xs font-mono text-gray-400 font-bold">
                                            {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Empty State */}
                {orders.length === 0 && !isLoading && (
                    <div className="py-32 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">✨</span>
                        </div>
                        <h3 className="text-secondary font-serif italic text-xl">The vault is quiet.</h3>
                        <p className="text-gray-400 text-sm mt-2 font-light">No luxury orders have been recorded yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}