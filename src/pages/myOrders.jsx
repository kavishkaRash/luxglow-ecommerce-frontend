import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Loader from "../components/loader";
import { HiOutlineShoppingBag, HiOutlineCalendar, HiOutlineCreditCard } from "react-icons/hi";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(import.meta.env.VITE_API_URL + "/api/orders", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setOrders(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    function getStatusStyle(status) {
        switch (status) {
            case "pending": return "bg-amber-100/80 text-amber-700 border-amber-200";
            case "processing": return "bg-blue-100/80 text-blue-700 border-blue-200";
            case "shipped": return "bg-indigo-100/80 text-indigo-700 border-indigo-200";
            case "delivered": return "bg-emerald-100/80 text-emerald-700 border-emerald-200";
            case "cancelled": return "bg-rose-100/80 text-rose-700 border-rose-200";
            default: return "bg-slate-100/80 text-slate-700 border-slate-200";
        }
    }

    return (
        <div className="w-full min-h-screen bg-primary selection:bg-accent selection:text-white">
            <Header />

            {/* --- ORDER DETAILS MODAL --- */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-secondary/40 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
                    <div className="w-full max-w-4xl bg-white rounded-[3rem] p-8 md:p-12 relative max-h-[90vh] overflow-y-auto shadow-2xl">
                        <button 
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-500 text-2xl"
                        >
                            ×
                        </button>

                        <div className="mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary text-accent text-[10px] font-black uppercase tracking-widest mb-4">
                                <HiOutlineShoppingBag /> Finalizing Ritual
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif italic text-secondary">
                                Order {selectedOrder.orderID}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {[
                                { label: "Customer", val: selectedOrder.customerName },
                                { label: "Address", val: selectedOrder.address },
                                { label: "Investment", val: `Rs. ${selectedOrder.total}` }
                            ].map((info, i) => (
                                <div key={i} className="bg-primary/50 border border-secondary/5 rounded-[2rem] p-6 group hover:bg-white hover:shadow-xl transition-all duration-500">
                                    <p className="text-[10px] uppercase tracking-widest text-secondary/30 mb-2 font-bold">{info.label}</p>
                                    <h3 className="text-lg font-serif italic text-secondary group-hover:text-accent transition-colors">{info.val}</h3>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/40 font-black mb-6 px-2">Included Products</p>
                            {selectedOrder.items.map((item) => (
                                <div key={item.productID} className="flex items-center gap-6 bg-white border border-secondary/5 rounded-3xl p-4 hover:shadow-lg transition-all duration-500">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl shadow-sm" />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-serif italic text-secondary">{item.name}</h3>
                                        <div className="flex gap-4 mt-2 text-xs text-secondary/40 font-medium">
                                            <span>Qty: {item.quantity}</span>
                                            <span className="text-accent">Rs. {item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <section className="max-w-7xl mx-auto px-6 py-24">
                {/* --- HEADER --- */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-3 bg-white border border-secondary/10 px-5 py-2 rounded-full mb-8 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary/70">Vault History</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif italic text-secondary mb-8 leading-tight">My Orders</h1>
                    <p className="max-w-2xl mx-auto text-secondary/40 leading-relaxed italic font-light">Your curated history of elegance and glow rituals.</p>
                </div>

                {loading ? (
                    <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
                        <Loader />
                        <span className="text-[10px] uppercase tracking-widest text-secondary/20 animate-pulse">Retrieving Chronicles...</span>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white/60 backdrop-blur-md rounded-[3.5rem] p-20 text-center border border-white shadow-xl">
                        <h2 className="text-3xl font-serif italic text-secondary mb-4 opacity-40">The Vault is Empty</h2>
                        <button className="text-accent text-[10px] font-black uppercase tracking-widest hover:tracking-[0.4em] transition-all duration-500">Begin Your Ritual →</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-12">
                        {orders.map((order) => (
                            <div key={order.orderID} className="group bg-white rounded-[3.5rem] p-10 border border-secondary/5 shadow-[0_20px_50px_-20px_rgba(156,39,176,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(233,30,99,0.15)] transition-all duration-700 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-bl-[100%] transition-all duration-700 group-hover:bg-accent/5" />
                                
                                <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                                                {order.status}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-widest text-secondary/20 font-bold flex items-center gap-2">
                                                <HiOutlineCalendar /> {new Date(order.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h2 className="text-4xl font-serif italic text-secondary mb-6 group-hover:text-accent transition-colors">{order.orderID}</h2>
                                        
                                        <div className="flex gap-12 text-sm text-secondary/40 font-light italic">
                                            <div><p className="text-[10px] uppercase tracking-widest not-italic font-black text-secondary/20 mb-1">Total</p>Rs. {order.total}</div>
                                            <div><p className="text-[10px] uppercase tracking-widest not-italic font-black text-secondary/20 mb-1">Manifestations</p>{order.items.length} Items</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:items-end justify-between">
                                        <div className="flex -space-x-4 mb-6">
                                            {order.items.slice(0, 3).map((item, i) => (
                                                <img key={i} src={item.image} className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-lg" alt="preview" />
                                            ))}
                                            {order.items.length > 3 && (
                                                <div className="w-16 h-16 rounded-full border-4 border-white bg-primary flex items-center justify-center text-[10px] font-black text-accent shadow-lg">+{order.items.length - 3}</div>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => setSelectedOrder(order)}
                                            className="group/btn relative w-fit bg-secondary text-white px-12 py-4 rounded-full uppercase tracking-[0.3em] text-[10px] font-black transition-all duration-500 overflow-hidden"
                                        >
                                            <span className="relative z-10">Expand Details</span>
                                            <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}