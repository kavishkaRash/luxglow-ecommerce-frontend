import { Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout, MdOutlineRateReview } from "react-icons/md";
import { BsBox2 } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import AdminAddNewProduct from "./admin/adminAddNewProduct";
import UpdateAddNewProduct from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../components/loader";
import AdminUserPage from "./admin/adminUserPage";
import AdminReviewPage from "./admin/adminReviewPage";
import UpdateAddNewReview from "./admin/adminUpdateReview";
import AdminAddNewReview from "./admin/adminAddNewReview";
import AdminDashboard from "./admin/adminDashboard";

export default function AdminPage() {
    const [userLoaded, setUserLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // To track active routes for styling

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please login to access admin panel");
            navigate("/login");
        }
        axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if (res.data.role !== "admin"){
                toast.error("You do not have permission to access admin panel");
                navigate("/login");
                return;
            }
            setUserLoaded(true);
        })
        .catch(error => {
            toast.error("Failed to load user data");
            localStorage.removeItem("token");
            navigate("/login");
        });
    }, []);

    // Helper to style active links
    const linkStyle = (path) => {
        const isActive = location.pathname === path;
        return `group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium tracking-tight ${
            isActive 
            ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
            : "text-secondary/60 hover:bg-white hover:text-secondary hover:shadow-sm"
        }`;
    };

    return (
        <div className="w-full h-screen bg-primary flex overflow-hidden font-sans">
            {/* --- SIDEBAR --- */}
            <aside className="w-72 h-full flex flex-col p-6 border-r border-secondary/5">
                {/* Brand Identity */}
                <div className="mb-12">
                    <img src="/logo1.png" alt="LuxeGlow" className="h-12 object-contain" />
                    <div className="mt-6 inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-accent text-[10px] font-black uppercase tracking-widest italic">
                            Management Suite
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-3 flex-1">
                    <Link to="/admin" className={linkStyle("/admin")}>
                        <FaChartLine className="text-lg" />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/admin/orders" className={linkStyle("/admin/orders")}>
                        <MdShoppingCartCheckout className="text-lg" /> 
                        <span>Orders</span>
                    </Link>

                    <Link to="/admin/products" className={linkStyle("/admin/products")}>
                        <BsBox2 className="text-lg" />
                        <span>Products</span>
                    </Link>

                    <Link to="/admin/reviews" className={linkStyle("/admin/reviews")}>
                        <MdOutlineRateReview className="text-lg" />
                        <span>Reviews</span>
                    </Link>

                    <Link to="/admin/users" className={linkStyle("/admin/users")}>
                        <HiOutlineUser className="text-lg" />
                        <span>Customers</span>
                    </Link>
                </nav>

                {/* Sidebar Footer */}
                <div className="mt-auto p-4 bg-white/50 rounded-3xl border border-white">
                    <p className="text-[10px] text-gray-400 font-bold uppercase text-center tracking-tighter">
                        LuxeGlow v2.1.0-Core
                    </p>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 h-full p-4 lg:p-6 bg-primary/30">
                <div className="h-full w-full bg-white rounded-[40px] shadow-[0_20px_70px_rgba(156,39,176,0.06)] border border-white overflow-hidden relative">
                    <div className="h-full w-full overflow-y-auto custom-scrollbar">
                        {userLoaded ? (
                            <div className="animate-in fade-in duration-700">
                                <Routes>
                                    <Route path="/" element={<AdminDashboard />}></Route>
                                    <Route path="/products" element={<AdminProductPage />}></Route>
                                    <Route path="/orders" element={<AdminOrdersPage />}></Route>
                                    <Route path="/users" element={<AdminUserPage />}></Route>
                                    <Route path="/add-product" element={<AdminAddNewProduct />}></Route>
                                    <Route path="/add-review" element={<AdminAddNewReview/>}></Route>
                                    <Route path="/reviews" element={<AdminReviewPage />}></Route>
                                    <Route path="/update-product" element={<UpdateAddNewProduct />}></Route>
                                    <Route path="/update-reviews" element={<UpdateAddNewReview />}></Route>
                                </Routes>
                            </div>
                        ) : (
                            <div className="h-full w-full flex items-center justify-center">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}