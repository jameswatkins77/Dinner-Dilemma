$("#randomRecipe").click(function(){
  var randomNumber = Math.ceil(Math.random()*777777);
  var randomRecipe = "https:spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+randomNumber+"/information?mashape-key=56qAxsJjW9mshzGaoLVCCDMefIskp1WYULzjsnMivzE2pLMQin&includeNutrition=false";
  $.ajax({url: randomRecipe,
    success: function(result){
        $("#recipeDisplay").html("");
        $("#recipeDisplay").append('<h1>'+result.title+'</h1>');
        $("#recipeDisplay").append('<a href="'+result.sourceUrl+'">'+'<img src="'+result.image+'" alt="Recipe">'+'</a>');
        $("#recipeDisplay").append('<a href="'+result.sourceUrl+'"><p>Click here for recipe</p>'+'</a>');
    }});
});
$("#submitAdvanced").click(function(){
  $("#rightAdvanced").html("");
  $.ajax({
    url: "https:spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?"+cuisine_input()+diet_input()+ingredients()+allergies_input()+"&limitLicense=false&"+max_calories()+"&number=100&offset=0&"+advanced_keyword()+"&ranking=1&mashape-key=56qAxsJjW9mshzGaoLVCCDMefIskp1WYULzjsnMivzE2pLMQin",
    success: function(result){
      if (result.results.length === 0) {
        return $("#rightAdvanced").append('<h2>There are no matching recipes for those criteria.'+'<br>'+'Please try again.</h2>');
      }
    for (var i = 0; i < result.results.length; i++) {
      var id = result.results[i].id;
      $.ajax({
        url: "https:spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id+"/information?mashape-key=56qAxsJjW9mshzGaoLVCCDMefIskp1WYULzjsnMivzE2pLMQin&includeNutrition=false",
        success: function(result){
          $("#rightAdvanced").append('<h1>'+result.title+'</h1>');
          $("#rightAdvanced").append('<a href='+result.sourceUrl+'>'+'<img class="advanced" src=' +result.image+ ' alt="Recipe">'+'</a>');
          $("#rightAdvanced").append('<a href='+result.sourceUrl+'><p>Click here for recipe</p>'+'</a>');
        }});
    }
    }});
});
$("#submitTakeOut").click(function(){
  $("#takeOutResultsDisplay").html("");
  var zip = ($("#zipCodeTakeOut").val());
  $.ajax({url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=delivery+in+"+zip+"&key=AIzaSyBi6-ASk_2LLrX2WZxLEcbrcT698EL72F8", success: function(result){
    for (var i = 0; i < result.results.length; i++) {
      var place_id = result.results[i].place_id;
      $.ajax({url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+place_id+"&key=AIzaSyBi6-ASk_2LLrX2WZxLEcbrcT698EL72F8", success: function(result){
          if (isFoodDeliveryPlace(result.result.types[0])) {
            $("#takeOutResultsDisplay").append('<p class ="displayTakeout">'+'Name: '+result.result.name);
            $("#takeOutResultsDisplay").append("Rating: "+result.result.rating+"<br>");
            $("#takeOutResultsDisplay").append('<a id ="takeoutWebsite" href ='+result.result.url+'>Click for Google website </a>'+'<br>');
            $("#takeOutResultsDisplay").append("Phone Number: "+result.result.formatted_phone_number);
          }
        }});
    }
    }});
});
