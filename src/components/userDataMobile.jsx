import axios from "axios";
import { useEffect, useState } from "react";
import {
    IoChevronDown,
    IoSettingsOutline,
    IoLogOutOutline,
    IoBagHandleOutline,
    IoPersonOutline
} from "react-icons/io5";

export default function UserDataMobile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null) {
            axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    setUser(res.data);
                    setLoading(false);
                }).catch(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    setLoading(false);
                })
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className="w-full font-sans">
            {/* Loading State */}
            {loading && (
                <div className="flex items-center gap-3 p-4 bg-white/20 rounded-[20px] animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-secondary/10"></div>
                    <div className="h-4 w-24 bg-secondary/10 rounded-full"></div>
                </div>
            )}

            {/* Authenticated State */}
            {user && (
                <div className="flex flex-col overflow-hidden transition-all duration-500">

                    {
                        isLogoutConfirmOpen && (
                            <div className="fixed inset-0 bg-secondary/20 backdrop-blur-md flex items-center justify-center z-[200] p-4 animate-in fade-in duration-300">
                                {/* Modal Card */}
                                <div className="bg-white/90 backdrop-blur-2xl w-full max-w-sm rounded-[45px] p-10 shadow-2xl border border-white flex flex-col items-center text-center animate-in zoom-in duration-300">

                                    {/* Icon Circle */}
                                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 shadow-inner border border-secondary/5">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <span className="text-3xl text-secondary">✨</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-secondary text-2xl font-serif italic mb-2">Signing Out?</h3>
                                    <p className="text-gray-500 text-xs font-light tracking-wide leading-relaxed mb-8">
                                        Your LuxeGlow journey is safe with us. We’ll be here whenever you’re ready for more radiance.
                                    </p>

                                    {/* Actions */}
                                    <div className="flex flex-col w-full gap-3">
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem("token");
                                                window.location.reload();
                                            }}
                                            className="w-full h-14 bg-secondary text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-accent transition-all shadow-lg shadow-secondary/20 active:scale-[0.98]"
                                        >
                                            Yes, Sign Me Out
                                        </button>

                                        <button
                                            onClick={() => setIsLogoutConfirmOpen(false)}
                                            className="w-full h-14 bg-primary/50 text-secondary border border-secondary/10 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:border-secondary/30 transition-all active:scale-[0.98]"
                                        >
                                            Stay Signed In
                                        </button>
                                    </div>

                                    {/* Footer Subtle Brand Tag */}
                                    <span className="mt-8 text-[9px] uppercase tracking-widest font-black text-secondary/20 italic">
                                        LuxeGlow Beauty Essentials
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    
                    {/* User Header / Trigger */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`flex items-center gap-4 p-3 rounded-[25px] transition-all duration-300 border ${isMenuOpen
                            ? "bg-white border-secondary/10 shadow-lg shadow-secondary/5"
                            : "bg-secondary/5 border-transparent hover:bg-white/60"
                            }`}
                    >
                        <div className="relative">
                            <img
                                src={user.image}
                                className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm"
                                alt="Profile"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>

                        <div className="flex-grow text-left">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/30 leading-none mb-1">
                                Signed in as
                            </p>
                            <h3 className="text-secondary font-serif italic font-bold text-lg leading-tight">
                                {user.firstName}
                            </h3>
                        </div>

                        <div className={`p-2 rounded-full bg-primary transition-transform duration-500 ${isMenuOpen ? "rotate-180 bg-accent text-white" : "text-secondary/40"}`}>
                            <IoChevronDown size={18} />
                        </div>
                    </button>

                    {/* Inline Expandable Menu (Accordion Style) */}
                    <div className={`grid transition-all duration-500 ease-in-out ${isMenuOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}>
                        <div className="overflow-hidden">
                            <div className="bg-white/40 backdrop-blur-md rounded-[30px] p-2 border border-white/60 space-y-1">

                                <button className="w-full flex items-center gap-4 px-5 py-4 rounded-[20px] text-secondary hover:bg-white transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                                        <IoPersonOutline size={16} />
                                    </div>
                                    <span className="text-sm font-bold tracking-wide uppercase text-[11px]">Profile Details</span>
                                </button>

                                <button className="w-full flex items-center gap-4 px-5 py-4 rounded-[20px] text-secondary hover:bg-white transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                                        <IoBagHandleOutline size={16} />
                                    </div>
                                    <span className="text-sm font-bold tracking-wide uppercase text-[11px]">My Orders</span>
                                </button>

                                <button className="w-full flex items-center gap-4 px-5 py-4 rounded-[20px] text-secondary hover:bg-white transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                                        <IoSettingsOutline size={16} />
                                    </div>
                                    <span className="text-sm font-bold tracking-wide uppercase text-[11px]">Settings</span>
                                </button>

                                <div className="h-[1px] bg-secondary/5 mx-5 my-2"></div>

                                <button
                                    onClick={() => { setIsLogoutConfirmOpen(true) }}
                                    className="w-full flex items-center gap-4 px-5 py-4 rounded-[20px] text-rose-500 hover:bg-rose-50 transition-all group font-black"
                                >
                                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                        <IoLogOutOutline size={18} />
                                    </div>
                                    <span className="uppercase tracking-[0.2em] text-[11px]">Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Unauthenticated State (Optional placeholder) */}
            {!user && !loading && (
                <a href="/login" className="flex items-center justify-center gap-3 w-full py-4 bg-secondary text-white rounded-full font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-secondary/20 active:scale-95 transition-all">
                    <IoPersonOutline size={18} />
                    Login / Register
                </a>
            )}
        </div>
    );
}