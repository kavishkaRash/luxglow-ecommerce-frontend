import { Route, Routes, Link, useNavigate } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2 } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import AdminAddNewProduct from "./admin/adminAddNewProduct";
import UpdateAddNewProduct from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../components/loader";

export default function AdminPage() {
    const [userLoaded, setUserLoaded] = useState(false);
    const navigate = useNavigate();

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

    return (
        <div className="w-full h-full bg-primary flex p-2">
            <div className="w-75 h-full  bg-primary">
                <div className="w-[90%] w-10 h-[70px]">
                    <img src="/logo1.png" alt="" className="h-[70px]" />

                    <div className="bg-accent w-40 h-8 rounded-2xl mt-5 flex items-center justify-center">
                        <span className="text-white text-xl ml-4">Admin Panel</span>
                    </div>

                </div>
                <div className="mt-20 flex flex-col gap-2 px-4">

                    <Link to="/admin" className="w-[90%] flex items-center gap-2 p-2 rounded-lg">
                        Dashboard
                        <FaChartLine />
                    </Link>

                    <Link to="/admin/orders" className="w-[90%] flex items-center gap-2 p-2 rounded-lg">
                        Orders
                        <MdShoppingCartCheckout /> 
                    </Link>

                    <Link to="/admin/products" className="w-[90%] flex items-center gap-2 p-2 rounded-lg">
                        Products
                        <BsBox2 />
                    </Link>

                     <Link to="/admin/users" className="w-[90%] flex items-center gap-2 p-2 rounded-lg">
                        Users
                        <HiOutlineUser />
                    </Link>

                    

                </div>




            </div>

            <div className="w-[calc(100%-300px)] h-full border-3 border-accent rounded-[20px] overflow-hidden">
                <div className="h-full w-full max-w-full max-h-full overflow-y-scroll ">
                   { userLoaded? <Routes>
                        <Route path="/" element={<h1> Dashboard</h1>}></Route>
                        <Route path="/products" element={<AdminProductPage />}></Route>
                        <Route path="/orders" element={<AdminOrdersPage />}></Route>
                        <Route path="/add-product" element={<AdminAddNewProduct />}></Route>
                        <Route path="/update-product" element={<UpdateAddNewProduct />}></Route>
                    </Routes>: <Loader />}
                </div>
            </div>
        </div>
    );
}
