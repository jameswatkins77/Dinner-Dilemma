function isFoodDeliveryPlace(type) {
  return type === "meal_takeaway" || type === "meal_delivery" || type === "restaurant"
};
var cuisine_input = function(){
  if ($("#cuisineInput option:selected").val().toLowerCase()==="") {
    return "";
  } else {
    return "cuisine="+$("#cuisineInput option:selected").val().toLowerCase();
  }
};
var diet_input = function(){
  if ($("#dietInput option:selected").val().toLowerCase()==="") {
    return "";
  } else {
    return "&diet="+$("#dietInput option:selected").val().toLowerCase();
  }
};
var max_calories = function(){
  if ($("#maxCalories").val()==="") {
    return "";
  } else {
    return "&maxCalories="+$("#maxCalories").val();
  }
};
var advanced_keyword = function(){
  if ($("#advancedKeyword").val().toLowerCase()==="") {
    return "";
  } else {
    return "&query="+$("#advancedKeyword").val().toLowerCase();
  }
};
var allergies_input = function(array){
  var bar = $("#allergiesInput option:selected");
  if (bar.length>1) {
    var foo =[];
    for (var i = 0; i < bar.length-1; i++) {
      foo += bar[i].value+"%2C"+"+";
    }
    foo += bar[bar.length-1].value;
    return "&intolerances="+foo;
  } else if (bar.length === 1) {
    return "&intolerances="+$("#allergiesInput option:selected").val();
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
    return "&includeIngredients="+foo;
  } else if (bar[0] !== "") {
    return "&includeIngredients="+$("#ingredients").val().split(",").toString();
  } else {
    return ("");
  }
};
