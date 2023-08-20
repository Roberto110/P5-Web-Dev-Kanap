// Variables
let colorSelector = document.getElementById('colors')
let productImageDiv = document.getElementById('item__img')
let productName = document.getElementById('title')
let productDescription = document.getElementById('description')
let productPrice = document.getElementById('price')
let addToCartButton = document.getElementById('addToCart')
let productQuantity = document.getElementById('quantity')

// Use URLSearchParams to get the product id from the URL 
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')

// Creates a new XMLHttpRequest object
let apiRequest = new XMLHttpRequest();

// Determines the type of request and the URL the request will be sent to.
apiRequest.open('GET', 'http://localhost:3000/api/products/' + id)

// Sends the request
apiRequest.send();

// Function that stores the API response and then uses it to create and populate the product information.
apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4) {
        const response = JSON.parse(apiRequest.response);
        productName.textContent = response.name;
        productDescription.textContent = response.description;
        productPrice.textContent = response.price;
        let productImage = document.createElement('img')
        productImage.setAttribute('src', response.imageUrl)
        productImage.setAttribute('alt', response.altTxt)
        productImageDiv.appendChild(productImage);
        for (let i = 0; i < response.colors.length; i++) {
            let newColor = document.createElement('option')
            newColor.setAttribute('value', response.colors[i])
            newColor.textContent = response.colors[i];
            colorSelector.appendChild(newColor);
        }
    }
}
// Click listener on the addToCartButton that creates a cart array and a product object. The product object contains the id, color and quantity
// of the product shown on that page. Product is then pushed into the cart array and the cart is then sent to localStorage.
addToCartButton.addEventListener('click', () => {
    if (localStorage) {
        if (colorSelector.value === "") {
            alert('Please choose a color.')
        } else if (productQuantity.value === "0") {
            alert('Please choose a quantity.')
        } else {
            // Create cart variable and assign it to the cart item in localStorage. localStorage needs to be parsed to change it from a string to an object.
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log('cart from local storage', cart) //I'm confused by this outcome. Even though product hasn't yet been pushed to the cart at this point, it acts like it has been.
            let product = {
                'id': id,
                'color': colorSelector.value,
                'quantity': productQuantity.value
            };
            let checkProduct = (cartItem) => {
                return cartItem.id === product.id && cartItem.color === product.color;
            }
            if (cart.find(checkProduct)) {
                cart.find(checkProduct).quantity = cart.find(checkProduct).quantity + product.quantity;
                console.log(cart.find(checkProduct).quantity)
            } else {
                cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(cart)); //This works without JSON.stringify. Ask Faizal why it works and if it is necessary.
            console.log(cart);
        }
    } else {
        alert("Sorry, your browser doesn't support local storage.")
    }
})

