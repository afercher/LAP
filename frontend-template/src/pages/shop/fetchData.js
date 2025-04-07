import { BASE_URL } from "../../config";

export async function fetchData(endpoint, method = "GET", body = null) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include", // 👈 damit der Cookie mitgeschickt wird
        body: body ? JSON.stringify(body) : null
    });

    return await res.json();
}

export async function addToCart(productInfos) {
    const cartItem = {
        "product_id": productInfos.product_id,
        "quantity": productInfos.quantity,
    };

    try {
        const response = await fetch(`${BASE_URL}/cart/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartItem),
            credentials: "include", // 👈 damit der Cookie mitgeschickt wird
        });

        if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
        return null;
    }
}

export async function removeFromCart(productInfos) {
    const cartItem = {
        "product_id": productInfos.product_id,
        "quantity": productInfos.quantity,
    };

    try {
        const response = await fetch(`${BASE_URL}/cart/remove`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartItem),
        });

        if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Fehler beim Entfernen aus dem Warenkorb:", error);
        return null;
    }
}

export async function getCart() {
    try {
        const response = await fetch(`${BASE_URL}/cart/list`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // 👈 damit der Cookie mitgeschickt wird
        });

        if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Fehler beim Abrufen des Warenkorbs:", error);
        return null;
    }
}

export async function getCartItemCount() {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
}

async function getProductById(productId) {
    try {
        const response = await fetch(`${BASE_URL}/products/get?id=${productId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`HTTP-Fehler! Status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Fehler beim Abrufen des Produkts:", error);
        return null;
    }
}