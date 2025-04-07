import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { useApp } from "../hooks/appContext";
import "./navbar.css";

export const Navbar = () => {
    const { cartItemCount, user, logout } = useApp();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <div className="navbar">
            <div className="navbar-header">
                <button className="hamburger" onClick={toggleMenu}>
                    ☰
                </button>
                <Link to="/" className="shop-link">
                    Shop
                </Link>
            </div>

            <div className={`links ${menuOpen ? "open" : ""}`}>
                {user ? (
                    <span className="user-name">Eingeloggt als {user.display_name}</span>
                ) : null}

                <Link to="/cart" className="cart-link">
                    <ShoppingCart size={24} />
                    {cartItemCount > 0 && (
                        <span className="cart-item-count">{cartItemCount}</span>
                    )}
                </Link>

                {!user ? (
                    <Link to="/login" className="login-link">Login</Link>
                ) : (
                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};
