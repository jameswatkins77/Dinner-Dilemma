$("#randomRecipe").click(function(){
  var randomNumber = Math.ceil(Math.random()*777777);
  console.log(randomNumber);
  var randomRecipe = '"https:spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+randomNumber+'/information?mashape-key=56qAxsJjW9mshzGaoLVCCDMefIskp1WYULzjsnMivzE2pLMQin&includeNutrition=false"';
  console.log(randomRecipe);
  // $.ajax({url: randomRecipe, success: function(result){
  $.ajax({url: "https:spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/444445/information?mashape-key=56qAxsJjW9mshzGaoLVCCDMefIskp1WYULzjsnMivzE2pLMQin&includeNutrition=false", success: function(result){
        $("#recipeDisplay").html("");
        $("#recipeDisplay").append('<h1>'+result.title+'</h1>');
        $("#recipeDisplay").append('<img src="'+result.image+'" alt="Recipe">');
        $("#recipeDisplay").append('<a href="'+result.sourceUrl+'"><p>Click here for recipe</p>'+'</a>');
    }});
})

$("#ingredients").click(function(){
  alert("Enter ingredients separated by commas. ie: lettuce, tomatoes, etc.")
})

$("#submitAdvanced").click(function(){
  var cuisine_input = $("#cuisineInput option:selected").val();
  var allergies_input = $("#allergiesInput option:selected").val();
  var diet_input = $("#dietInput option:selected").val();
  var ingredients = $("#ingredients").val();
  var max_calories = $("#maxCalories").val();
  var advanced_keyword = $("#advancedKeyword").val();
  console.log(cuisine_input);
  console.log(allergies_input);
  console.log(diet_input);
  console.log(ingredients);
  console.log(max_calories);
  console.log(advanced_keyword);
  // $.ajax({url: "https:spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?mashape-key=56qAxsJjW9mshzGaoLVCCDMefIskp1WYULzjsnMivzE2pLMQin&includeNutrition=false", success: function(result){
  $.ajax({url: "https:spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/444445/information?mashape-key=56qAxsJjW9mshzGaoLVCCDMefIskp1WYULzjsnMivzE2pLMQin&includeNutrition=false", success: function(result){
        $("#rightAdvanced").html("");
        $("#rightAdvanced").append('<h1>'+result.title+'</h1>');
        $("#rightAdvanced").append('<img src="'+result.image+'" alt="Recipe">');
        $("#rightAdvanced").append('<a href="'+result.sourceUrl+'"><p>Click here for recipe</p>'+'</a>');
    }});
})
