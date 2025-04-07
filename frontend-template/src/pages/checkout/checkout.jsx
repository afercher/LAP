import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/appContext";
import "./checkout.css";

export const Checkout = () => {
    const [addresses, setAddresses] = useState([]);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: "",
        address: "",
        state: "",
        country: "",
        city: "",
        postal_code: "",
    });

    const { refreshCartItemCount } = useApp();

    const navigate = useNavigate();

    // Lade vorhandene Adressen
    useEffect(() => {
        const loadAddresses = async () => {
            const res = await fetch(`${BASE_URL}/users/settings`, {
                credentials: "include",
            });
            const result = await res.json();
            if (res.ok && result.success) {
                setAddresses(result.data.addresses);
                if (result.data.addresses.length > 0) {
                    setSelected(result.data.addresses[0]);
                }
            }
        };
        loadAddresses();
    }, []);

    const handleCheckout = async () => {
        setError("");
        if (!selected) {
            setError("Bitte wähle eine Adresse aus.");
            return;
        }

        const res = await fetch(`${BASE_URL}/cart/checkout`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: selected }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
            setSuccess(true);
            setTimeout(() => navigate("/"), 2000);
        } else {
            setError(data.message || "Checkout fehlgeschlagen.");
        }
        refreshCartItemCount();
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();

        const res = await fetch(`${BASE_URL}/users/settings`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ addresses: [newAddress] }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
            // Neue Adressen neu laden
            const updated = await fetch(`${BASE_URL}/users/settings`, {
                credentials: "include",
            });
            const updatedData = await updated.json();
            if (updated.ok && updatedData.success) {
                setAddresses(updatedData.data.addresses);
                setSelected(updatedData.data.addresses[updatedData.data.addresses.length - 1]);
            }
            setShowModal(false);
            setNewAddress({
                name: "",
                address: "",
                state: "",
                country: "",
                city: "",
                postal_code: "",
            });
        } else {
            setError(data.message || "Adresse konnte nicht hinzugefügt werden.");
        }
    };

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>

            {addresses.length === 0 ? (
                <p>Keine Adresse vorhanden. Bitte eine Adresse hinzufügen:</p>
            ) : (
                <div className="address-select">
                    <label>Adresse auswählen:</label>
                    <select
                        value={selected?.address || ""}
                        onChange={(e) =>
                            setSelected(addresses.find((a) => a.address === e.target.value))
                        }
                    >
                        {addresses.map((addr, i) => (
                            <option key={i} value={addr.address}>
                                {addr.name}, {addr.address}, {addr.city}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <button onClick={() => setShowModal(true)} className="add-address-button">
                + Neue Adresse hinzufügen
            </button>

            <button className="checkout-button" onClick={handleCheckout}>
                Jetzt kaufen
            </button>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">✅ Bestellung erfolgreich!</p>}

            {showModal && (
                <div className="modal">
                    <form className="checkout-form" onSubmit={handleAddAddress}>
                        <input name="name" placeholder="Name" required
                               value={newAddress.name}
                               onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
                        <input name="address" placeholder="Straße" required
                               value={newAddress.address}
                               onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} />
                        <input name="city" placeholder="Stadt" required
                               value={newAddress.city}
                               onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
                        <input name="state" placeholder="Bundesland" required
                               value={newAddress.state}
                               onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />
                        <input name="postal_code" placeholder="PLZ" required
                               value={newAddress.postal_code}
                               onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })} />
                        <input name="country" placeholder="Land" required
                               value={newAddress.country}
                               onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} />
                        <button type="submit">Adresse speichern</button>
                        <button type="button" onClick={() => setShowModal(false)}>
                            Abbrechen
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
