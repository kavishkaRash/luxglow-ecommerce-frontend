import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import Header from "../components/header";

export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
                (response) => {
                    setProducts(response.data);
                    setIsLoading(false);
                }
            ).catch((error) => {
                console.error("Error fetching products:", error);
                setIsLoading(false);
                toast.error("failed to load products");
            }
            );
        }
    }, [isLoading]);

    return (

        <div className="w-full h-screen bg-primary" >

            <Header />
            {
                isLoading ? <Loader />
                    :
                    <div className="w-full min-h-full flex felx-row flex-wrap">
                        {
                            products.map((item) => {
                                {
                                    return (
                                        <div>
                                            <ProductCard key={item.ProductID} product={item} />
                                        </div>
                                    )
                                }
                            })
                            
                        }
                         
                    </div>
            }
        </div>
    )
}