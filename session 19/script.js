const products = [
    { id: 1, name: "Tai nghe Bluetooth", price: 350000, image: "", description: "" },
    { id: 2, name: "Chuột không dây", price: 250000, image: "", description: "" }
];

let cart = [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    try {
        const data = JSON.parse(localStorage.getItem("cart"));
        cart = Array.isArray(data) ? data : [];
    } catch {
        cart = [];
    }
}

function formatVND(n) {
    return n.toLocaleString("vi-VN") + " VNĐ";
}

function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if (item) item.quantity++;
    else cart.push({ id: id, quantity: 1 });
    saveCart();
    renderCart();
}

function increase(id) {
    const item = cart.find(i => i.id === id);
    if (item) item.quantity++;
    saveCart();
    renderCart();
}

function decrease(id) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity--;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    renderCart();
}

function removeItem(id) {
    const product = products.find(p => p.id === id);
    if (confirm("Xóa " + product.name + "?")) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
        renderCart();
    }
}

function clearCart() {
    if (confirm("Xóa toàn bộ giỏ hàng?")) {
        cart = [];
        saveCart();
        renderCart();
    }
}

function getCartDetail() {
    return cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return {
            ...product,
            quantity: item.quantity,
            total: product.price * item.quantity
        };
    });
}

function getStats() {
    const totalItems = cart.length;
    const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => {
        const p = products.find(p => p.id === i.id);
        return sum + p.price * i.quantity;
    }, 0);

    return {
        totalItems,
        totalQuantity,
        totalPrice
    };
}

loadCart();