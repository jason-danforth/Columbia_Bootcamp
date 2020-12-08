// Array of recipe objects
var recipes = [
  { dish: "Fried fish", spice: "Dorrigo" },
  { dish: "Crab Rangoon", spice: "Akudjura" },
  { dish: "Pickled Okra", spice: "Chili pepper" },
  { dish: "Macaroni salad", spice: "Pepper" },
  { dish: "Apple butter", spice: "Avens" },
  { dish: "Pepperoni Pizza", spice: "Asafoetida" },
  { dish: "Hog fry", spice: "Peppermint" },
  { dish: "Corn chowder", spice: "Akudjura" },
  { dish: "Home fries", spice: "Celery leaf" },
  { dish: "Hot chicken", spice: "Boldo" }];

console.log(recipes);

// @TODO: YOUR CODE HERE

dishes = [];
spices = [];

recipes.forEach((recipe) => {
  // Get the entries for each object in the array
  Object.entries(recipe).forEach(([key, value]) => {
    // Log the key and value
    console.log(`Key: ${key} and Value ${value}`);
    dishes.push(recipe.dish)
    spices.push(recipe.spice)
  });

});

dishes.map(item => item)
spices.map(item => item)

dishes.forEach(item => console.log(item))
spices.forEach(item => console.log(item))