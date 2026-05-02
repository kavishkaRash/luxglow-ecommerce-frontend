import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { MdMenu, MdClose } from "react-icons/md"; // Added MdClose for a better user experience
import { Link } from "react-router-dom";
import { cartItemCount } from "../utils/addToCart.js";
import UserData from "./userData.jsx";
import UserDataMobile from "./userDataMobile.jsx";

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [count, setCount] = useState(cartItemCount());

    useEffect(() => {
        const updateCartCount = () => {
            setCount(cartItemCount());
        }

        window.addEventListener("cartUpdated", updateCartCount)

        return () => {
            window.removeEventListener("cartUpdated", updateCartCount)
        }
    }, []);

    return (
        <header className="w-full sticky top-0 z-50 transition-all duration-300">
            {/* Announcement Bar */}
            <div className="w-full h-10 flex justify-center items-center bg-accent text-white text-[11px] uppercase tracking-[0.2em] font-bold">
                <span>Free Delivery on Orders Over $10!</span>
            </div>

            {/* Main Navigation */}
            <nav className="w-full h-24 bg-primary/80 backdrop-blur-lg border-b border-secondary/5 text-secondary px-6 lg:px-12">
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between relative">

                    {/* Left: Mobile Menu Trigger */}
                    <div className="lg:hidden">
                        <MdMenu
                            className="text-4xl cursor-pointer hover:text-accent transition-colors"
                            onClick={() => setIsSidebarOpen(true)}
                        />
                    </div>

                    {/* Logo Section (Desktop Side & Center per original logic) */}
                    <div className="flex items-center">
                        <img
                            src="/logo1.png"
                            className="hidden lg:block h-16 w-auto object-contain hover:opacity-80 transition-opacity"
                            alt="LuxeGlow Logo"
                        />

                        <img
                            src="/logo1.png"
                            className="lg:hidden h-16 w-auto object-contain hover:opacity-80 transition-opacity"
                            alt="LuxeGlow Logo"
                        />
                    </div>



                    <div className="  absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="flex items-center gap-8 ">
                            {/* Desktop Nav Links */}
                            <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold ">
                                <Link to="/" className="hover:text-accent transition-colors relative group">
                                    Home
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
                                </Link>
                                <Link to="/products" className="hover:text-accent transition-colors relative group">
                                    Products
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
                                </Link>
                                <Link to="/about" className="hover:text-accent transition-colors relative group">
                                    About
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
                                </Link>
                                <Link to="/contact" className="hover:text-accent transition-colors relative group">
                                    Contact
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
                                </Link>
                            </div>


                        </div>
                    </div>



                    {/* Right: Cart and Desktop Links */}
                    <div className="flex items-center gap-8 ">

                        <div className=" hidden lg:flex">
                            <UserData />
                        </div>
                        {/* Cart Link */}
                        <Link to="/cart" className="relative p-2 hover:text-accent transition-colors">
                            <BsCart3 className="text-2xl" />
                            <span className="hidden lg:block absolute -top-1  text-center -right-1 bg-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {count > 99 ? "99+" : count}
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 w-full h-screen bg-primary/20 backdrop-blur-md z-[60] flex animate-in fade-in duration-300">
                    {/* Sidebar Content */}
                    <div className="w-[320px] bg-primary h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-500">

                        {/* Sidebar Header */}
                        <div className="p-8 flex flex-col items-center border-b border-secondary/5 relative">
                            <img src="/logo1.png" className="h-20 w-auto object-contain mb-4" alt="Logo" />
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="absolute top-6 left-6 text-3xl text-secondary hover:text-accent"
                            >
                                <MdMenu /> {/* Kept original logic using MdMenu to close */}
                            </button>
                        </div>

                        {/* Sidebar Links */}
                        <div className="flex flex-col p-4">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Products", path: "/products" },
                                { name: "About", path: "/about" },
                                { name: "Contact", path: "/contact" },
                                { name: "View Cart", path: "/cart" }
                            ].map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    className="p-5 text-[12px] uppercase tracking-[0.3em] font-bold text-secondary border-b border-secondary/5 hover:bg-white hover:text-accent transition-all"
                                >
                                    {link.name}
                                </a>
                            ))}
                            
                            <div className=" flex lg:hidden">
                                <UserDataMobile />
                            </div>
                        </div>

                        {/* Sidebar Footer */}
                        <div className="mt-auto p-8 text-center italic text-secondary/40 text-xs font-serif">
                            LuxeGlow Beauty Essentials
                        </div>
                    </div>

                    {/* Click outside to close */}
                    <div className="flex-grow" onClick={() => setIsSidebarOpen(false)}></div>
                </div>
            )}
        </header>
    );
}