// All variables
// Variables for cart item
let cartSection = document.getElementById('cart__items')
// Variables for totals
let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');

// Gets the cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);


let fetchArray = [];

cart.forEach((product) => {
    fetchArray.push(fetch('http://localhost:3000/api/products/' + product.id).then(response => response.json()))
});

Promise.all(fetchArray).then(results => {
    results.forEach((product, i) => {
        console.log(product);
        addProduct(product, i);
     })
});

// Iterates through each product in the local storage and creates a new entry for each product on the cart page.
function addProduct(product, i) {
    // Product in cart
    let cartItem = document.createElement('article');
    cartItem.setAttribute('class', 'cart__item');
    cartItem.setAttribute('data-id', cart[i].id); 
    cartItem.setAttribute('data-color', cart[i].color);
    // Product image
    let cartItemImageDiv = document.createElement('div');
    cartItemImageDiv.setAttribute('class', 'cart__item__img');
    cartItem.appendChild(cartItemImageDiv);
    let cartItemImage = document.createElement('img');
    cartItemImage.setAttribute('src', product.imageUrl)
    cartItemImage.setAttribute('alt', product.altTxt)
    cartItemImageDiv.append(cartItemImage);
    // Product information
    let cartItemContent = document.createElement('div');
    cartItemContent.setAttribute('class', 'cart__item__content');
    cartItem.append(cartItemContent);
    let cartItemDescription = document.createElement('div');
    cartItemDescription.setAttribute('class', 'cart__item__content__description');
    cartItemContent.append(cartItemDescription);
    let productName = document.createElement('h2');
    productName.textContent = product.name;
    let productColor = document.createElement('p');
    productColor.textContent = cart[i].color;
    let productPrice = document.createElement('p');
    productPrice.textContent = '€' + product.price;
    cartItemDescription.append(productName, productColor, productPrice);
    // Product settings
    let cartItemSettings = document.createElement('div');
    cartItemSettings.setAttribute('class', 'cart__item__content__settings');
    cartItemContent.append(cartItemSettings);
    let cartItemSettingsQuantity = document.createElement('div');
    cartItemSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
    cartItemSettings.append(cartItemSettingsQuantity);
    let cartItemSettingsQuantityText = document.createElement('p')
    cartItemSettingsQuantityText.textContent = 'Quantity :';
    let cartItemSettingsInput = document.createElement('input');
    cartItemSettingsInput.setAttribute('type', 'number');
    cartItemSettingsInput.setAttribute('class', 'itemQuantity');
    cartItemSettingsInput.setAttribute('name', 'itemQuantity');
    cartItemSettingsInput.setAttribute('min', '1');
    cartItemSettingsInput.setAttribute('max', '100');
    cartItemSettingsInput.setAttribute('value', cart[i].quantity) 
    cartItemSettingsQuantity.append(cartItemSettingsQuantityText, cartItemSettingsInput);
    let cartItemSettingsDelete = document.createElement('div');
    let cartItemSettingsDeleteText = document.createElement('p')
    cartItemSettingsDeleteText.setAttribute('class', 'deleteItem');
    cartItemSettingsDeleteText.textContent = 'Delete';
    cartItemSettingsDelete.append(cartItemSettingsDeleteText)
    cartItemSettings.append(cartItemSettingsDelete);
    cartSection.append(cartItem);
    totalPrice.textContent = product.price * cart[i].quantity;
    totalQuantity.textContent = cart[i].quantity + cart[i].quantity;

    cartItemSettingsDelete.addEventListener('click', () => {
        let closestCartItem = cartItemSettingsDelete.closest('.cart__item');
        closestCartItem.getAttribute('data-id');
        closestCartItem.getAttribute('data-color');
        cartItem.remove(closestCartItem);
        // store cartItem.remove(cartItemSettingsDelete.closest('.cart__item')); into a variable. DONE.
        // get the data attributes (color, id). DONE.
        // go to cart from localstorage, look for product with same id and color, then remove it.
        // store the cart back into the localstorage.
    })

}


/**
 * For this page I need to:
 * 
 * 1. Get the cart from the localStorage. e.g let cart = JSON.parse(localStorage.getItem('cart')) || []; DONE
 * 
 * 2. Use a for loop (or .forEach method) to iterate through each product in the cart. DONE
 * 
 * 2a. use multiple fetch to get the price for each product id (Promise.all([F1, F2, F3,F3]))
 * 
 * 2b. Get each product property and assign it to an id from the HTML to make it show up on the cart page. (similar to homepage).
 * 
 * 3. Iterate through the values of each product in the cart (multipied by their quantity) and assign it to the total price.
 * Also get quantity and assign to articles(total quantity).
 * 
 * Element.closest()
 * 4. Use a 'change' event listener on the quantity field to change the price, total price, and cart quantity value.
 * 5. Use a 'click' event listener to on the delete button to delete a product from the cart entirely.
 * 
 * for both update and delete, on the event object get the closest element (article), 
 * from the article get the data-id and data-color, with the id and color look at the storage (cart), do update or delete on the item from the card
 * re-compute the total items and total price.
 **/