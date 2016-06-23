$("#randomRecipe").click(function(){
  var randomNumber = Math.ceil(Math.random()*777777);
  var randomRecipe = "https:spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+randomNumber+"/information?mashape-key=56qAxsJjW9mshzGaoLVCCDMefIskp1WYULzjsnMivzE2pLMQin&includeNutrition=false";
  $.ajax({url: randomRecipe,
    success: function(result){
        $("#recipeDisplay").html("");
        $("#recipeDisplay").append('<h1>'+result.title+'</h1>');
        $("#recipeDisplay").append('<img src="'+result.image+'" alt="Recipe">');
        $("#recipeDisplay").append('<a href="'+result.sourceUrl+'"><p>Click here for recipe</p>'+'</a>');
    }});
});

$("#submitAdvanced").click(function(){
  $("#rightAdvanced").html("");
  var cuisine_input = $("#cuisineInput option:selected").val().toLowerCase();
  var diet_input = $("#dietInput option:selected").val().toLowerCase();
  var allergies_input = function(array){
    var bar = $("#allergiesInput option:selected");
    if (bar.length>1) {
      var foo =[];
      for (var i = 0; i < bar.length-1; i++) {
        foo += bar[i].value+"%2C"+"+";
      }
      foo += bar[bar.length-1].value;
      return foo;
    } else if (bar.length === 1) {
      return $("#allergiesInput option:selected").val();
    } else{
      return("");
    }
  };
  var ingredients = function(array){
    var bar = $("#ingredients").val().split(", ");
    if (bar.length>1) {
      var foo = [];
      for (var i = 0; i < bar.length-1; i++) {
        foo += bar[i]+"%2C"+"+";
      }
      foo += bar[bar.length-1];
      return foo;
    } else if (bar.length === 1) {
      return $("#ingredients").val().split(",").toString();
    } else {
      return ("");
    }
  };
  var max_calories = $("#maxCalories").val();
  var advanced_keyword = $("#advancedKeyword").val().toLowerCase();
  $.ajax({
    url: "https:spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?cuisine="+cuisine_input+"&diet="+diet_input+"&includeIngredients="+ingredients()+"&intolerances="+allergies_input()+"&limitLicense=false&maxCalories="+max_calories+"&number=100&offset=0&query="+advanced_keyword+"&ranking=1&mashape-key=56qAxsJjW9mshzGaoLVCCDMefIskp1WYULzjsnMivzE2pLMQin",
    success: function(result){
    for (var i = 0; i < result.results.length; i++) {
      var id = result.results[i].id;
      $.ajax({
        url: "https:spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id+"/information?mashape-key=56qAxsJjW9mshzGaoLVCCDMefIskp1WYULzjsnMivzE2pLMQin&includeNutrition=false",
        success: function(result){
          $("#rightAdvanced").append('<h1>'+result.title+'</h1>');
          $("#rightAdvanced").append('<img src=' +result.image+ ' alt="Recipe">');
          $("#rightAdvanced").append('<a href='+result.sourceUrl+'><p>Click here for recipe</p>'+'</a>');
        }});
    }
    }});
});
$("#submitTakeOut").click(function(){
  $("#takeOutResultsDisplay").html("");
  var zip = ($("#zipCodeTakeOut").val());
  $.ajax({url: "https:maps.googleapis.com/maps/api/place/textsearch/json?query=delivery+in+"+zip+"&key=AIzaSyBi6-ASk_2LLrX2WZxLEcbrcT698EL72F8", success: function(result){
    for (var i = 0; i < result.results.length; i++) {
      var place_id = result.results[i].place_id;
      $.ajax({url: "https:maps.googleapis.com/maps/api/place/details/json?placeid="+place_id+"&key=AIzaSyBi6-ASk_2LLrX2WZxLEcbrcT698EL72F8", success: function(result){
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
