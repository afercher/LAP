import React, { useContext } from 'react';
import { addToCart } from "./fetchData";
import { AppContext } from "../../hooks/appContext.jsx";

export const Product = (props) => {
    const { id, name, image_url, price_per_unit } = props.data;
    const { refreshCartItemCount, isLoggedIn } = useContext(AppContext); // ✅ `isLoggedIn` holen

    const addItemToCart = async () => {
        const cartItem = { product_id: id, quantity: 1 };
        const response = await addToCart(cartItem);

        if (response?.success) {
            refreshCartItemCount();
        } else {
            alert("Failed to add product to cart");
        }
    };

    return (
        <div className="product">
            <img src={image_url} alt={name} />
            <div className="info">
                <p><b>{name}</b></p>
                <p>€ {price_per_unit}</p>
            </div>
            <button
                className="addToCartBttn"
                onClick={addItemToCart}
                disabled={!isLoggedIn} // ✅ Button deaktivieren wenn nicht eingeloggt
            >
                Add to cart
            </button>
        </div>
    );
};
