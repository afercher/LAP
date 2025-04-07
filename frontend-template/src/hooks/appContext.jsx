import { createContext, useContext, useEffect, useState } from "react";
import { fetchData, getCart } from "../pages/shop/fetchData.js";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [loading, setLoading] = useState(true); // optional, falls du Ladezustand brauchst

    // 🛒 Cart laden
    const refreshCartItemCount = async () => {
        try {
            const res = await getCart();
            const count = res?.data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
            setCartItemCount(count);
        } catch (err) {
            console.error("Fehler beim Laden des Warenkorbs:", err);
        }
    };

    // 🔐 Login
    const login = async (email, password) => {
        const res = await fetchData("/users/login", "POST", { email, password });
        if (res.success) {
            setUser(res.data);
            await refreshCartItemCount(); // Cart nach Login
        }
        return res;
    };

    // 🚪 Logout
    const logout = async () => {
        await fetchData("/users/logout", "POST");
        setUser(null);
        setCartItemCount(0);
    };

    // 🔍 Beim App-Start: User + Cart prüfen
    useEffect(() => {
        const init = async () => {
            try {
                const res = await fetchData("/users/info", "GET");
                if (res.success) {
                    setUser(res.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            } finally {
                await refreshCartItemCount();
                setLoading(false);
            }
        };

        init();
    }, []);

    return (
        <AppContext.Provider
            value={{
                user,
                cartItemCount,
                login,
                logout,
                refreshCartItemCount,
                isLoggedIn: !!user,
                loading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
