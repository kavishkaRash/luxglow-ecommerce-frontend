import {
    FaInstagram,
    FaFacebookF,
    FaTiktok,
    FaYoutube
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <footer className="w-full bg-[#24142D] text-white pt-24 pb-10">

            <div className="max-w-7xl mx-auto px-6">

                {/* TOP */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20 border-b border-white/10">

                    {/* BRAND */}
                    <div>

                        <h2 className="text-4xl font-serif italic mb-6">
                            LuxGlow
                        </h2>

                        <p className="text-white/60 leading-relaxed text-sm">
                            Elevating beauty with luxury skincare,
                            makeup, and fragrance collections crafted
                            for timeless elegance.
                        </p>

                    </div>

                    {/* QUICK LINKS */}
                    <div>

                        <h3 className="uppercase tracking-[0.3em] text-xs font-bold mb-6 text-white/80">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-4 text-white/60 text-sm">

                            <Link to="/">Home</Link>
                            <Link to="/products">Products</Link>
                            <Link to="/about">About</Link>
                            <Link to="/contact">Contact</Link>

                        </div>

                    </div>

                    {/* CATEGORIES */}
                    <div>

                        <h3 className="uppercase tracking-[0.3em] text-xs font-bold mb-6 text-white/80">
                            Categories
                        </h3>

                        <div className="flex flex-col gap-4 text-white/60 text-sm">

                            <Link to="/products?category=perfume">
                                Perfume
                            </Link>

                            <Link to="/products?category=skincare">
                                Skincare
                            </Link>

                            <Link to="/products?category=makeup">
                                Makeup
                            </Link>

                            <Link to="/products?category=haircare">
                                Haircare
                            </Link>

                        </div>

                    </div>

                    {/* NEWSLETTER */}
                    <div>

                        <h3 className="uppercase tracking-[0.3em] text-xs font-bold mb-6 text-white/80">
                            Newsletter
                        </h3>

                        <p className="text-white/60 text-sm mb-6 leading-relaxed">
                            Subscribe for exclusive offers,
                            beauty tips, and new arrivals.
                        </p>

                        <div className="flex">

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 bg-white/10 border border-white/10 px-4 py-3 outline-none text-sm"
                            />

                            <button className="bg-accent px-6 text-xs uppercase tracking-[0.2em] font-bold">
                                Join
                            </button>

                        </div>

                    </div>

                </div>

                {/* BOTTOM */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">

                    <p className="text-white/40 text-sm">
                        © 2026 LuxGlow. All rights reserved.
                    </p>

                    {/* SOCIALS */}
                    <div className="flex items-center gap-5 text-white/70">

                        <a
                            href="#"
                            className="hover:text-accent transition"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="#"
                            className="hover:text-accent transition"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="#"
                            className="hover:text-accent transition"
                        >
                            <FaTiktok />
                        </a>

                        <a
                            href="#"
                            className="hover:text-accent transition"
                        >
                            <FaYoutube />
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    );
}