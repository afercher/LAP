import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/appContext.jsx"; // ⬅️ Hook importieren
import "./login.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { login } = useApp(); // ⬅️ login aus dem AppContext holen

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await login(email, password); // ⬅️ jetzt wird user gesetzt und cart geladen

        if (res.success) {
            navigate("/");
        } else {
            setError(res.message || "Login fehlgeschlagen");
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
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

                <div className="form-actions">
                    <button type="submit">Anmelden</button>
                    <p className="register-hint">
                        Noch kein Konto?{" "}
                        <a href="/register">Jetzt registrieren</a>
                    </p>
                </div>
            </form>
        </div>
    );
};
