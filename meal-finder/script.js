const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const random = document.querySelector("#random");
const mealsEl = document.querySelector("#meals");
const resultHeading = document.querySelector("#result-heading");
const single_mealEl = document.querySelector("#single-meal");

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = "";

  // Get search item
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>`
            )
            .join("");
        }
      });
    // Clear search term
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

// Function: get random meal
function getRandomMeal() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  console.log(meal["strIngredient1"]);

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  console.log(ingredients);

  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
      </ul>
    </div>
  </div>`;
}

// Event listeners
submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
  const mealID = e.target.closest(".meal-info").dataset.mealid;
  getMealById(mealID);

  // const mealInfo = e.path.find((item) => {
  //   if (item.classList) {
  //     return item.classList.contains("meal-info");
  //   } else {
  //     return false;
  //   }
  // });

  // if (mealInfo) {
  //   const mealID = mealInfo.getAttribute("data-mealid");
  //   getMealById(mealID);
  // }
});

random.addEventListener("click", getRandomMeal);
