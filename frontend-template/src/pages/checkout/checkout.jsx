import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config.js";
import "./checkout.css";

export const Checkout = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState({
        name: "",
        address: "", // ⬅️ wichtig: heißt hier jetzt "address" (nicht street)
        state: "",
        country: "",
        city: "",
        postal_code: ""
    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch(`${BASE_URL}/cart/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ address })
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setSuccess(true);
                setAddress({
                    name: "",
                    street: "",
                    state: "",
                    country: "",
                    city: "",
                    postal_code: ""
                });

                setTimeout(() => {
                    navigate("/"); // oder /orders etc.
                }, 3000);
            } else {
                setError(result.message || "Bestellung fehlgeschlagen.");
            }
        } catch (error) {
            setError("Server nicht erreichbar.");
        }
    };

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>

            <form onSubmit={handleSubmit} className="checkout-form">
                <input name="name" value={address.name} onChange={handleChange} placeholder="Name" required />
                <input name="address" value={address.street} onChange={handleChange} placeholder="Straße" required />
                <input name="city" value={address.city} onChange={handleChange} placeholder="Stadt" required />
                <input name="state" value={address.state} onChange={handleChange} placeholder="Bundesland" required />
                <input name="postal_code" value={address.postal_code} onChange={handleChange} placeholder="Postleitzahl" required />
                <input name="country" value={address.country} onChange={handleChange} placeholder="Land" required />

                {error && <p className="error">{error}</p>}
                {success && <p className="success">🎉 Bestellung erfolgreich!</p>}

                <button type="submit">Jetzt kaufen</button>
            </form>
        </div>
    );
};
