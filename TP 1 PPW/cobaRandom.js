var randomItem = function(){
	var lebar = 4;
	var panjang = 4;
	var total = lebar*panjang/2;
	var item = [];

	for(var i =0; i < total;i++){
		item.push(i);
		item.push(i);
	}
	//var item = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
	var newArray = [];
	while(item.length > 0){
		var pushedItem = item[Math.floor(Math.random()*item.length)];
		newArray.push(pushedItem);
		var index = item.indexOf(pushedItem);
		var deleted = item.splice(index, 1);
	}
	return newArray;
}

var loadImage = function(array){
	var output = "";
	while(array.length > 0){
		var loadItem = array[Math.floor(Math.random()*array.length)];
		var imageContainer = document.getElementById("flex-container");
		if(imageContainer !=null){
			var output = output + "<img id='emo" + loadItem +".jpg'"+ "src='cardSleeve.png'></div>";
			document.getElementById("flex-container").innerHTML = output;
		}
		var index = array.indexOf(loadItem);
		var deleted = array.splice(index, 1);
	}
}

var loadSleeve = function(){
	var output = "";
	for(var i = 0; i < 16;i++){
		var imageContainer = document.getElementById("flex-container");
		if(imageContainer !=null){
			var output = output + "<img src=\"cardSleeve.png\"></div>";
			document.getElementById("flex-container").innerHTML = output;
		}
	}
}

var loginChecker = function(){
	var usernameValue = document.getElementById("username").value;
	var passwordValue = document.getElementById("password").value

	var xmlhttp;
	var output = "";
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}
	else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var userData = JSON.parse(xmlhttp.responseText);
			var users = userData.users;
			for(var i = 0; i < users.length;i++){
				var user = users[i];
				var name = user.username;
				var password = user.password;

				if(usernameValue == name && passwordValue == password){
					document.getElementById("user").innerHTML = name;
					$("#login").fadeOut("slow");
					$("#home").fadeIn(3000);
				}
				else{
					alert("Username dan password salah");
				}
			}
		}
	}

	xmlhttp.open("GET","users.json",true);
	xmlhttp.overrideMimeType("application/json");
	xmlhttp.send();
	return false;
}

var clearHistory = function(){
	document.getElementById("rank").innerHTML = "";
	localStorage.removeItem("historyRank");
}