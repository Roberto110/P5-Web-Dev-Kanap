// Variables
let cardSection = document.getElementById("items");
let cardImage = document.getElementsByClassName("productImage");
let cardHeading = document.getElementsByClassName("productName");
let cardParagraph = document.getElementsByClassName("productDescription");
let card = document.getElementsByClassName("productCard");

// Function that creates a new card when called
let createNewCard = () => {
  let newCard = document.createElement("a");
  let newArticle = document.createElement("article");
  let newImage = document.createElement("img");
  let newHeading = document.createElement("h3");
  let newParagraph = document.createElement("p");
  newArticle.appendChild(newImage);
  newArticle.appendChild(newHeading);
  newArticle.appendChild(newParagraph);
  newCard.appendChild(newArticle);
  cardSection.appendChild(newCard);
  newImage.classList.add("productImage");
  newHeading.classList.add("productName");
  newParagraph.classList.add("productDescription");
  newCard.classList.add("productCard");
};

/**
 * Fetch request that gets product information from the API. The response is then parsed into JSON instead of text and then the json data
 * is used to run the createNewCard() function and populate the new cards that are made.
 */

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      createNewCard();
      card[i].setAttribute("href", "./product.html?id=" + data[i]._id);
      cardImage[i].setAttribute("src", data[i].imageUrl);
      cardImage[i].setAttribute("alt", data[i].altTxt);
      cardHeading[i].textContent = data[i].name;
      cardParagraph[i].textContent = data[i].description;
    }
  })
  .catch((error) => console.log(`Error: ${error}`));
