/**
*  Helper to Add/Remove classes on an element
*  Usage: 
*  Add class :: classHelper.addClass("#ele", "classname");
*  Remove class :: classHelper.removeClass("#ele", "classname");
*/

var classHelper = {
	addClass: function(selector, className){
		var elements = document.querySelectorAll(selector);
		var len = elements.length;
		var classes = className.split(" ");
		var clen = classes.length;
		for(var i=0; i<len; i++){
          for(var j=0; j<clen; j++){
          	elements[i].classList.add(classes[j]);
          }
		}
	},
	removeClass: function(selector, className){
		var elements = document.querySelectorAll(selector);
		var len = elements.length;
		var classes = className.split(" ");
		var clen = classes.length;
		for(var i=0; i<len; i++){
          for(var j=0; j<clen; j++){
          	elements[i].classList.remove(classes[j]);
          }
		}
	}

};