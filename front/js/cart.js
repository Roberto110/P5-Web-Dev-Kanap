let cart = JSON.parse(localStorage.getItem('cart'));
console.log(cart);

// can I use the .foreach method to iterate through the products(objects) in cart? Does it function exactly the same as a for loop?

cart.forEach((product) => {
    console.log(product.id);
    console.log(product.color);
    console.log(product.quantity);
});

/**
 * For this page I need to:
 * 1. Get the cart from the localStorage.
 * 2. Use a for loop (or .forEach method) to iterate through each product in the cart.
 * 2b. Get each product poperty and assign it to an id from the HTML to make it show up on the cart page. (similar to homepage).
 * 3. Iterate through the values of each product in the cart (multipied by their quantity) and assign it to the total price.
 * Also get quantity and assign to articles(total quantity).
 * 4. Use a 'change' event listener on the quantity field to change the price, total price, and cart quantity value.
 * 5. Use a 'click' event listener to on the delete button to delete a product from the cart entirely.
 */