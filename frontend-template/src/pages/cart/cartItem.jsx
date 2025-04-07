import React, { useContext, useEffect, useState } from 'react';
import { addToCart, removeFromCart, getCart } from "../shop/fetchData";
import { AppContext } from "../../hooks/appContext.jsx";

export const CartItem = (props) => {
    const { product_id, name, image_url, price_per_unit, description } = props.data;
    const { refreshCartItemCount } = useContext(AppContext);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchQuantity = async () => {
            const response = await getCart();
            if (response?.success) {
                const item = response.data.find(item => item.product.id === product_id);
                const qty = item?.quantity || 0;
                setQuantity(qty);
                props.onQuantityChange(product_id, qty); // 👈 direkt beim ersten Laden
            }
        };
        fetchQuantity();
    }, [product_id]);

    useEffect(() => {
        props.onQuantityChange(product_id, quantity); // 👈 on change callback
    }, [quantity]);

    if (quantity === 0) {
        return null;
    }

    const addItemToCart = async () => {
        const cartItem = { product_id, quantity: 1 };
        const response = await addToCart(cartItem);
        if (response?.success) {
            setQuantity(prev => prev + 1);
            refreshCartItemCount();
        } else {
            alert("Failed to add product to cart");
        }
    };

    const removeItemFromCart = async () => {
        const cartItem = { product_id, quantity: 1 };
        const response = await removeFromCart(cartItem);
        if (response?.success) {
            setQuantity(prev => Math.max(prev - 1, 0));
            refreshCartItemCount();
        } else {
            alert("Failed to remove product from cart");
        }
    };

    const removeIcon = quantity === 1 ? "🗑" : "-";

    return (
        <div key={product_id} className="cart-item">
            <img src={image_url} alt={name} />
            <div className="cart-item-details">
                <h3>{name}</h3>
                <p>{description}</p>
                <p>Preis pro Einheit: {price_per_unit} €</p>

                <div className="quantity-control">
                    <button className="quantity-btn" onClick={removeItemFromCart}>{removeIcon}</button>
                    <span className="quantity-number">{quantity}</span>
                    <button className="quantity-btn" onClick={addItemToCart}>+</button>
                </div>
            </div>
        </div>
    );
};
