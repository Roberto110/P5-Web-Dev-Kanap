// All variables
// Variables for cart item
let cartSection = document.getElementById('cart__items');
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
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
let addressErrorMsg = document.getElementById('addressErrorMsg');
let cityErrorMsg = document.getElementById('cityErrorMsg');
let emailErrorMsg = document.getElementById('emailErrorMsg');


// Gets the cart from local storage and assigns it to a variable.
let/*faizal changed to 'var' - why?*/ cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log('cart: ', cart);

// Create an array that will be used to store fetch requests for each item in the cart variable.
let fetchArray = [];

cart.forEach((productInCart) => {
    fetchArray.push(fetch('http://localhost:3000/api/products/' + productInCart.id).then(response => response.json()))
});

let findMeAndUpdatePrice = (id, price) => { 
    for (item of cart) { 
        if (item.id == id) { 
            item.price = price;
        }
    }
}

// Promise.all accepts the fetchArray and returns a single promise 
Promise.all(fetchArray).then(results => {
    results.forEach((product, i) => {
        addProduct(product, i);
        //when got the reply from the fetch, check for each item in the cart and update its price
        findMeAndUpdatePrice(product._id, product.price);
    });
    calculateTotalQuantity();
    calculateTotalPrice();
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
        calculateTotalPrice(); 
    });

    // Quantity change event listener
    cartItemSettingsInput.addEventListener('change', () => {
        let closestCartItem = cartItemSettingsInput.closest('.cart__item');
        let closestCartItemIndex = cart.findIndex((cartItem) => cartItem.id == closestCartItem.getAttribute('data-id') && cartItem.color == closestCartItem.getAttribute('data-color'));
        cart[closestCartItemIndex].quantity = cartItemSettingsInput.value;
        localStorage.setItem('cart', JSON.stringify(cart));
        calculateTotalQuantity();
        calculateTotalPrice()
    });
}

// Loop that calculates the total price of the items in the cart. Not functioning as intended.
let calculateTotalPrice = () => {
    if (cart.length === 0) {
        totalQuantity.textContent = 0;
    }

    let totalPriceVariable = 0;
    for (let i = 0; i < cart.length; i++) {
        console.log('cart[i].price: ', cart[i].price);
        console.log('Number(cart[i].quantity: ', Number(cart[i].quantity));
        totalPriceVariable = totalPriceVariable + cart[i].price * Number(cart[i].quantity);
        totalPrice.textContent = totalPriceVariable;
    }
    console.log('totalPriceVariable: ', totalPriceVariable);
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

let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/i;
let textRegEx = /^[A-Z-]+$/i;
let addressRegEx = /^[0-9]+\s?[\w]+\s?[\w]+/;

orderButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (textRegEx.test(firstName.value) === false) {
        firstNameErrorMsg.textContent = "Please enter a valid name."
    } else {
        firstNameErrorMsg.textContent = "";
    }

    if (textRegEx.test(lastName.value) === false) {
        lastNameErrorMsg.textContent = "Please enter a valid name."
    } else {
        lastNameErrorMsg.textContent = "";
    }

    if (addressRegEx.test(address.value) === false) {
        addressErrorMsg.textContent = "Please enter a valid address."
    } else {
        addressErrorMsg.textContent = "";
    }

    if (textRegEx.test(city.value) === false) {
        cityErrorMsg.textContent = "Please enter a valid city."
    } else {
        cityErrorMsg.textContent = "";
    }

    if (emailRegEx.test(email.value) === false) {
        emailErrorMsg.textContent = "Please enter a valid email address."
    } else {
        emailErrorMsg.textContent = "";
    }

    if (textRegEx.test(firstName.value) && textRegEx.test(lastName.value) && addressRegEx.test(address.value) && textRegEx.test(city.value) && emailRegEx.test(email.value)) {
        let contact = {
            "firstName": firstName.value,
            "lastName": lastName.value,
            "address": address.value, 
            "city": city.value,
            "email": email.value
        };
        orderForm.reset();

        let products = []
        for (let i = 0; i < cart.length; i++){
            products.push(cart[i].id);
        }

      
        console.log('request body contact: ', contact);
        console.log('request body productTable: ', products);
        
        console.table('request body: ', JSON.stringify({ contact, products }));


        const postContact = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contact, products }),
        };

        fetch('http://localhost:3000/api/products/order', postContact)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        }).then(data => {
            console.log(data, "http://127.0.0.1:5500/front/html/confirmation.html/" + data.orderId);
            window.location.href = "http://127.0.0.1:5500/front/html/confirmation.html?id=" + data.orderId;
        })
    }
});
