const CART_KEY = 'shopping_cart';

export const getCart = () => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};
export const addToCart = (newItem) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === newItem.id);

    if (existingItem) {
        existingItem.number += newItem.number;
    } else {
        cart.push(newItem);
    }

    saveCart(cart);
};

export const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeFromCart = (id) => {
    const updated = getCart().filter(item => item.id !== id);
    saveCart(updated);
    return updated;
};

export const updateCartItem = (id, newQuantity) => {
    const updated = getCart().map(item =>
        item.id === id ? { ...item, number: newQuantity } : item
    );
    saveCart(updated);
    return updated;
};

