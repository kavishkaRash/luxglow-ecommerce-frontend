export function loadCart() {
    let cartString = localStorage.getItem("cart");

    if (cartString == null) {
        localStorage.setItem("cart", "[]")
        cartString = "[]"
    }
    const cart = JSON.parse(cartString)

    return cart;
}

export function getCartTotal() {
    const cart = loadCart();
    let total = 0;

    cart.forEach(
        (item) => {
            total += item.price * item.quantity
        }
    )

    return total
}

export function getItemTotal(item, quantity) {
    return item.price * item.quantity;
}

export function addTocart(product, quantity) {
    let cart = loadCart();

    const existingIndex = cart.findIndex(
        (item) => {
            return item.productID == product.productID
        }
    );

    if (existingIndex == -1) {

        if (quantity < 1) {
            console.log("Quantity must be at least 1");
            return;
        }

        const cartItem = {
            productID: product.productID,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            quantity: quantity,
            image: product.images[0]
        }
        cart.push(cartItem);

    } else {
        const existingItem = cart[existingIndex];

        const newQuantitiy = existingItem.quantity + quantity

        if (newQuantitiy < 1) {
            cart = cart.filter(
                (item) => {
                    return item.productID != product.productID
                }
            )
        } else {
            cart[existingIndex].quantity = newQuantitiy
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart))

}


