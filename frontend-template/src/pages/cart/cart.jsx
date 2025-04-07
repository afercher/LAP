import React, { useEffect, useState } from 'react';
import { fetchData } from "../shop/fetchData.js";
import { BASE_URL } from "../../config.js";
import {useNavigate} from "react-router-dom";
import "./cart.css";
import { CartItem } from "./CartItem";

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState({}); // 🆕 speichern der aktuellen Mengen pro Produkt
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCartItems() {
            const data = await fetchData('/cart/list');
            if (data && data.success) {
                setCartItems(data.data.map((item) => ({
                    product_id: item.product.id,
                    quantity: item.quantity,
                    name: item.product.name,
                    description: item.product.description,
                    image_url: `${BASE_URL}${item.product.image_url}`,
                    price_per_unit: item.product.price_per_unit,
                })));
            } else {
                console.error("Warenkorb konnte nicht geladen werden.");
            }
        }

        loadCartItems();
    }, []);

    // Callback aus CartItem
    const handleQuantityChange = (product_id, quantity) => {
        setQuantities(prev => ({
            ...prev,
            [product_id]: quantity
        }));
    };

    // Gesamtbetrag berechnen aus `cartItems` + `quantities`
    const totalAmount = cartItems.reduce((sum, item) => {
        const qty = quantities[item.product_id] ?? item.quantity;
        return sum + item.price_per_unit * qty;
    }, 0);

    return (
        <div>
            <h1 className="cart-title">Warenkorb</h1>
            <div className="cart-wrapper">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <CartItem
                            key={item.product_id}
                            data={item}
                            onQuantityChange={handleQuantityChange}
                        />
                    ))}
                </div>

                <div className="cart-summary">
                    <p>Gesamtbetrag: <strong>{totalAmount.toFixed(2)} €</strong></p>
                    <button className="checkout-button" onClick={() => navigate("/checkout")}>Jetzt kaufen!</button>
                </div>
            </div>
        </div>
    );
};
