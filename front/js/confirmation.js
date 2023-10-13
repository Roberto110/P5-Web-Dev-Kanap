// Get the order id from the URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Set the orderId element's text content to the order id retrieved from the URL.
let orderId = document.getElementById("orderId");
orderId.textContent = id;
