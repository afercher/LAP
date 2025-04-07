import React, { useEffect, useState } from 'react';
import { fetchData } from "./fetchData";
import { BASE_URL } from "../../config";
import { Product } from "./product";
import "./home.css";

export const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const data = await fetchData('/products/list');
            if (data.success) {
                setProducts(data.data.map((product) => ({
                    ...product,
                    image_url: `${BASE_URL}${product.image_url}`,
                })));
            }
        }
        loadProducts();
    }, []);

    return (
        <div className="shop-home">
            <div>
                <h1 className="shopTitle">Andi's Shop</h1>
            </div>
            <div className="products">
                {products.map((product) => (
                <Product data={product}/>
                ))}
            </div>
        </div>
    );
};
