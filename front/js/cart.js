let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');

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
 * 1. Get the cart from the localStorage. e.g let cart = JSON.parse(localStorage.getItem('cart')) || [];
 * 2. Use a for loop (or .forEach method) to iterate through each product in the cart.
 * 2a. use multiple fetch to get the price for each product id (Promisse.all([F1, F2, F3,F3]))
 * 2b. Get each product poperty and assign it to an id from the HTML to make it show up on the cart page. (similar to homepage).
 * 3. Iterate through the values of each product in the cart (multipied by their quantity) and assign it to the total price.
 * Also get quantity and assign to articles(total quantity).
 * 
 * Element . closest()
 * 4. Use a 'change' event listener on the quantity field to change the price, total price, and cart quantity value.
 * 5. Use a 'click' event listener to on the delete button to delete a product from the cart entirely.
 * 
 * for both (update and delete), on the event opbject, get the closesrt element (article), 
 * from the article get the data-id and data-color, with the id and color look at the storage (cart), do update or delete thye item from the card
 * re compiute the total items and total price
 */
/*
let fetchArray = [];
cart.forEach((product) => {
    fetchArray.push(fetch('www.google.com/productId'));
    console.log(product.id);
    console.log(product.color);
    console.log(product.quantity);
});

const allData = Promisse.all(fetchArray);//updated products info
*/