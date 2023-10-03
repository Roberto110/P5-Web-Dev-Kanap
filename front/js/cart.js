// All variables
// Variables for cart item
let cartSection = document.getElementById('cart__items')
// Variables for totals
let totalQuantity = document.getElementById('totalQuantity');
let totalPrice = document.getElementById('totalPrice');
// Variables for form
let orderButton = document.getElementById('order');
let orderForm = document.getElementById('cart__order__form');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

// Gets the cart from local storage and assigns it to a variable.
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart);

// Create an array that will be used to store fetch requests for each item in the cart variable.
let fetchArray = [];

cart.forEach((productInCart) => {
    fetchArray.push(fetch('http://localhost:3000/api/products/' + productInCart.id).then(response => response.json()))
});

// Promise.all accepts the fetchArray and returns a single promise 
Promise.all(fetchArray).then(results => {
    calculateTotalPrice(results); // !!Ask Faisal if this is in the right place!!
    calculateTotalQuantity(); // !!Ask Faisal if this is in the right place!!
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


    // Delete button
    cartItemSettingsDelete.addEventListener('click', () => {
        // Store the closest cart item in a variable.
        let closestCartItem = cartItemSettingsDelete.closest('.cart__item');
        // find the index of the item in the cart array with the same id & color as the closestCartItem variable.
        let closestCartItemIndex = cart.findIndex((cartItem) => cartItem.id == closestCartItem.getAttribute('data-id') && cartItem.color == closestCartItem.getAttribute('data-color'));
        // delete the cart item with that index.
        cart.splice([closestCartItemIndex], 1);
        // add the updated cart array back to the localStorage.
        localStorage.setItem('cart', JSON.stringify(cart));
        // remove the closestCartItem from the page.
        cartItem.remove(closestCartItem);
        calculateTotalQuantity();
        // calculateTotalPrice(); not working here <-----
    });

    // Quantity change event listener
    cartItemSettingsInput.addEventListener('change', () => {
        
    });
}

// Loop that calculates the total price of the items in the cart. Not function as intended when using delete button.
let calculateTotalPrice = (results) => {
    let totalPriceVariable = 0; // needs to be moved out of loop
    if (cart.length === 0) {
        totalQuantity.textContent = 0;
    }
    
    for (let i = 0; i < cart.length; i++) {
        totalPriceVariable = totalPriceVariable + results[i].price * Number(cart[i].quantity);
        totalPrice.textContent = totalPriceVariable;
    }
}

// Loop that updates the total quantity of the items in the cart.
const calculateTotalQuantity = () => {
    if (cart.length === 0) {
        totalQuantity.textContent = 0;
    }

    for (let i = 0, totalQuantityVariable = 0; i < cart.length; i++) {
        totalQuantityVariable = totalQuantityVariable + Number(cart[i].quantity);
        totalQuantity.textContent = totalQuantityVariable;
    }
}

orderButton.addEventListener('click', (event) => {
    event.preventDefault();
    // let contact = {
    //     "First Name": firstName.value,
    //     "Last Name": lastName.value,
    //     "Address": address.value, 
    //     "City": city.value,
    //     "Email": email.value
    // };

    const payload = new FormData(orderForm);
    const data = Object.fromEntries(payload);
    console.log(...payload);
    fetch('http://localhost:3000/api/products/order', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
    orderForm.reset();
});


/**
 * Element.closest()
 * 4. Use a 'change' event listener on the quantity field to change the price, total price, and cart quantity value.
 * 5. Use a 'click' event listener to on the delete button to delete a product from the cart entirely.
 * 
 * for both update and delete, on the event object get the closest element (article), 
 * from the article get the data-id and data-color, with the id and color look at the storage (cart), do update or delete on the item from the card
 * re-compute the total items and total price.
 **/
