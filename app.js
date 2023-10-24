//main container
const mainContainer = document.querySelector(".container");

//search box
const searchBox = document.querySelector(".search-box");

//search input
const searchInput = document.querySelector(".search-box-input");

//display msg
const displayMsg = document.querySelector(".display-msg");

//info box of food
const infoBox = document.querySelector(".info-box");

//button view recipe
const viewRecipeBtn = document.querySelector(".view-recipe");

//instructions box
const instructionsBox = document.querySelector(".instructions-box");

//instructions span
const instructionsDetails = document.querySelector(".instructions");

//button close recipe
const closeRecipeBtn = document.querySelector(".close-instructions");

searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  let inputValue = e.target.value;
  if (e.key == "Enter") {
    if (e.target.value != "") {
      getDataFood(inputValue);
    }
  }
});

const getDataFood = async (inputValue) => {
  infoBox.style.display = "block";
  displayMsg.style.display = "none";
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
  );
  const data = await response.json();
  const dataFood = data.meals[0];

  infoBox.innerHTML = `
        <header class="title-dish">
            <img class="title-dish-img" src="${dataFood.strMealThumb}" alt="">
            <aside class="box-name-dish">
            <h4 class="name-dish">${dataFood.strMeal}</h4>
            <p class="name-dish-nationality">${dataFood.strArea}</p>
            </aside> 
        </header>
    `;

  instructionsDetails.innerHTML = dataFood.strInstructions;

  let count = 1;
  let measureIngredient = [];

  for (const key in dataFood) {
    if (key.startsWith("strIngredient") && dataFood[key]) {
      let ingredient = dataFood[key];
      let measure = dataFood["strMeasure" + count];
      count++;
      measureIngredient.push(`${measure} ${ingredient}`);
    }
  }

  const ulIngredient = document.createElement("ul");
  ulIngredient.classList.add("ingredients-dish");
  measureIngredient.forEach((dataIngredient) => {
    const liIngredient = document.createElement("li");
    liIngredient.innerHTML = dataIngredient;
    ulIngredient.appendChild(liIngredient);
    infoBox.appendChild(ulIngredient);
  });

  viewRecipeBtn.style.display = "block";
};

viewRecipeBtn.addEventListener("click", () => {
  infoBox.style.display = "none";
  instructionsBox.style.display = "block";
  viewRecipeBtn.style.display = "none";
  closeRecipeBtn.style.display = "block";
  searchInput.disabled = true;
});

closeRecipeBtn.addEventListener("click", () => {
  infoBox.style.display = "block";
  instructionsBox.style.display = "none";
  viewRecipeBtn.style.display = "block";
  closeRecipeBtn.style.display = "none";
  searchInput.disabled = false;
});
