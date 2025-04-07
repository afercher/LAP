import React, { useState } from "react";
import {BASE_URL} from "../../config.js";
import "./register.css"; // eigene CSS-Datei

export const Register = () => {
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password, displayName }),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setSuccess(true);
                setError(null);
            } else {
                setError(result.message || "Registrierung fehlgeschlagen");
            }
        } catch (err) {
            setError("Server nicht erreichbar");
        }
    };

    return (
        <div className="register-page">
            <h2>Registrieren</h2>
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="error">{error}</p>}
                {success && (
                    <p className="success">Registrierung erfolgreich! 🎉</p>
                )}

                <div className="form-actions">
                    <button type="submit">Registrieren</button>
                    <p className="login-hint">
                        Schon ein Konto? <a href="/login">Jetzt einloggen</a>
                    </p>
                </div>
            </form>
        </div>
    );
};
