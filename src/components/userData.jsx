import axios from "axios";
import { useEffect, useState } from "react";
import { IoChevronDown, IoSettingsOutline, IoLogOutOutline, IoBagHandleOutline } from "react-icons/io5";

export default function UserData() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        window.location.reload(); // Simple logic to clear state
    };

    return (
        <div className="relative font-sans">
            {/* Loading Spinner */}
            {loading && (
                <div className="flex items-center justify-center p-2">
                    <div className="w-6 h-6 border-2 border-accent border-b-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* User Profile Trigger */}
            {user && (
                <div className="relative">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="group flex items-center gap-3 bg-white/40 hover:bg-white backdrop-blur-md px-2 py-1.5 pr-4 rounded-full border border-secondary/10 transition-all duration-300 shadow-sm active:scale-95"
                    >
                        {/* Avatar */}
                        <div className="relative">
                            <img 
                                src={user.image} 
                                className="w-9 h-9 rounded-full border-2 border-secondary/20 object-cover shadow-sm group-hover:border-accent transition-colors" 
                                alt="Profile"
                            />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>

                        {/* Name */}
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[10px] uppercase tracking-widest font-black text-secondary/40">Welcome</span>
                            <span className="text-secondary font-serif italic font-bold text-sm">
                                {user.firstName}
                            </span>
                        </div>

                        {/* Chevron */}
                        <IoChevronDown 
                            className={`text-secondary/40 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`} 
                        />
                    </button>

                    {/* Elegant Custom Dropdown Menu */}
                    {isMenuOpen && (
                        <>
                            {/* Invisible Backdrop to close menu */}
                            <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
                            
                            <div className="absolute top-full mt-3 right-0 w-56 bg-white/95 backdrop-blur-xl rounded-[25px] shadow-2xl shadow-secondary/10 border border-white p-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-4 py-3 border-b border-secondary/5 mb-1">
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Account Access</p>
                                </div>
                                
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-secondary hover:bg-primary transition-colors text-sm font-medium group">
                                    <IoSettingsOutline className="group-hover:text-accent transition-colors" />
                                    Account Settings
                                </button>
                                
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-secondary hover:bg-primary transition-colors text-sm font-medium group">
                                    <IoBagHandleOutline className="group-hover:text-accent transition-colors" />
                                    My Orders
                                </button>
                                
                                <div className="h-[1px] bg-secondary/5 my-1 mx-2"></div>
                                
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 transition-colors text-sm font-bold group"
                                >
                                    <IoLogOutOutline className="text-lg" />
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}