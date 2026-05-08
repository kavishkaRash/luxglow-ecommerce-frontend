import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit, FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { IoClose, IoWarningOutline } from "react-icons/io5";

function ProductsDeleteConfirm(props) {
    const productID = props.productID;
    const close = props.close;
    const refresh = props.refresh;

    function deleteProduct() {
        const token = localStorage.getItem("token");
        axios
            .delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                close();
                toast.success("Product deleted Successfully")
                refresh();
            }).catch(() => {
                toast.error("Failed to delete product")
            });
    }

    return (
        <div className="fixed inset-0 w-full h-screen bg-secondary/20 backdrop-blur-md z-[100] flex justify-center items-center p-4">
            {/* Modal Card */}
            <div className="w-full max-w-[440px] bg-white rounded-[35px] shadow-2xl border border-white p-8 relative animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={close}
                    className="absolute right-6 top-6 w-10 h-10 flex items-center justify-center rounded-full text-secondary/40 hover:bg-primary hover:text-accent transition-all duration-300"
                >
                    <IoClose size={24} />
                </button>

                <div className="flex flex-col items-center text-center">
                    {/* Warning Icon */}
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                        <IoWarningOutline size={32} className="text-accent" />
                    </div>

                    <h2 className="text-secondary text-2xl font-serif italic mb-2">Remove Product?</h2>

                    <p className="text-gray-500 font-light leading-relaxed mb-8">
                        Are you sure you want to delete the product <br />
                        <span className="font-mono text-secondary font-bold text-xs bg-primary px-2 py-1 rounded-md mt-2 inline-block">
                            ID: {productID}
                        </span>
                        <br /> This action is permanent.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex w-full gap-4">
                        <button
                            onClick={close}
                            className="flex-1 py-4 rounded-2xl border border-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteProduct}
                            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-accent to-secondary text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-accent/20 hover:opacity-90 transition-all active:scale-95"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            axios
                .get(import.meta.env.VITE_API_URL + "/api/products")
                .then((response) => {
                    setProducts(response.data);
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    return (
        <div className="w-full min-h-screen bg-primary p-6 lg:p-10 font-sans">
            {isDeleteConfirmVisible && (
                <ProductsDeleteConfirm
                    refresh={() => {
                        setIsLoading(true);
                    }}
                    productID={productToDelete}
                    close={() => {
                        setIsDeleteConfirmVisible(false);
                    }}
                />
            )}

            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-secondary text-4xl font-serif italic tracking-tight">
                        Inventory{" "}
                        <span className="font-sans not-italic text-2xl ml-2 opacity-50">
                            / LuxeGlow
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-light">
                        Manage and update your luxury product listings.
                    </p>
                </div>

                <Link
                    to={"/admin/add-product"}
                    className="flex items-center justify-center gap-2 bg-accent text-white px-8 py-3 rounded-2xl shadow-lg shadow-accent/20 hover:opacity-90 active:scale-95 transition-all text-sm font-bold uppercase tracking-widest"
                >
                    <FaPlus size={14} />
                    Add Product
                </Link>
            </div>

            {/* Modern Table Container */}
            <div className="bg-white/60  rounded-[40px] shadow-2xl shadow-secondary/5 border border-white overflow-hidden">
                {isLoading ? <Loader /> : <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-secondary/5 bg-secondary/5">
                            <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60">
                                Preview
                            </th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60">
                                Product Details
                            </th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60">
                                Category
                            </th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60">
                                Stocks
                            </th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60 text-center">
                                Pricing
                            </th>
                            <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60 text-right">
                                Management
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-secondary/5">
                        {products.map((item) => (
                            <tr
                                key={item.productID}
                                className="group hover:bg-white/80 transition-all duration-300"
                            >
                                {/* Image Cell */}
                                <td className="p-6">
                                    <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-500">
                                        <img
                                            src={item.images[0]}
                                            className="w-full h-full object-cover"
                                            alt={item.name}
                                        />
                                    </div>
                                </td>

                                {/* ID & Name Cell */}
                                <td className="p-6">
                                    <span className="text-[10px] font-mono text-gray-400 block mb-1">
                                        #{item.productID}
                                    </span>
                                    <span className="text-secondary font-bold text-lg tracking-tight group-hover:text-accent transition-colors">
                                        {item.name}
                                    </span>
                                </td>

                                {/* Category Cell */}
                                <td className="p-6">
                                    <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                </td>

                                {/* stock */}
                                <td className="p-11">
                                    <span className="text-secondary font-bold text-lg tracking-tight group-hover:text-accent transition-colors">
                                        {item.stock}
                                    </span>
                                </td>

                                {/* Price Cell */}
                                <td className="p-6 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-secondary font-black text-lg">
                                            ${item.price.toLocaleString()}
                                        </span>
                                        <span className="text-gray-400 text-xs line-through decoration-accent/30 font-light">
                                            ${item.labelledPrice.toLocaleString()}
                                        </span>
                                    </div>
                                </td>

                                {/* Action Cell */}
                                <td className="p-6">
                                    <div className="flex flex-row gap-3 justify-end">
                                        <button
                                            onClick={() => {
                                                navigate("/admin/update-reviews", {
                                                    state: item,
                                                });
                                            }}
                                            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-secondary hover:bg-secondary hover:text-white hover:shadow-lg hover:shadow-secondary/20 transition-all"
                                        >
                                            <FaRegEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setProductToDelete(item.productID);
                                                setIsDeleteConfirmVisible(true);
                                            }}
                                            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 transition-all"
                                        >
                                            <FaRegTrashCan size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>}

                {/* Empty State / Footer */}
                {products.length === 0 && (
                    <div className="p-20 text-center text-gray-400 italic">
                        No products found in the LuxeGlow vault.
                    </div>
                )}
            </div>
        </div>
    );
}
