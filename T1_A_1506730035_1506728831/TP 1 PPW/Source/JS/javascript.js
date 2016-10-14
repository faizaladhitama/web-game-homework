var checked = 0;

function UserRecord(username,time){
	this.username = username;
	this.time = time;

	this.getUsername = function(){
		return this.username;	
	}

	this.getTime = function(){
		return this.time;
	}
}

var welcomeAnimation = function(){
	$("#login").hide();
	$("#welcome").delay("slow").fadeIn(3000);
	$("#welcome").delay("slow").fadeOut(1000);
	$("#project").delay(3000).fadeIn(3000);
	$("#project").delay("slow").fadeOut(2000);
	$("#transitionScreen").delay(9000).fadeOut(2000);
	$("#login").delay(9000).fadeIn(2000);
}

var sortArray = function(array){
	if(typeof array == "object"){
		array.sort(function(a,b){
			return parseInt(a.time)-parseInt(b.time);
		});
	}
}

var addRank = function(array){
	var output = "";
	for(var i = 0; i < array.length;i++){
		var obj = array[i];
		var username = obj.username;
		var time = obj.time;
		output+="<li>"+username + " - " +savedToString(time)+"</li>";
	}
	document.getElementById("rank").innerHTML = output;
}

var randomItem = function(){
	var lebar = 4;
	var panjang = 4;
	var total = lebar*panjang/2;
	var item = [];

	for(var i =0; i < total;i++){
		item.push(i);
		item.push(i);
	}
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
	checked = 0;
	var output = "";
	while(array.length > 0){
		var loadItem = array[Math.floor(Math.random()*array.length)];
		var imageContainer = document.getElementById("flex-container");
		if(imageContainer !=null){
			var output = output + "<img id='Source/Images/ImagesMatch/BackToSchool/atk" + loadItem +".jpg'"+ "src='Source/Images/CardSleeve/cardSleeve3.png'></div>";
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
			var output = output + "<img src=\"Source/Images/CardSleeve/cardSleeve3.png\"></div>";
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
			var checkUser = false;
			var checkPass = false;
			for(var i = 0; i < users.length;i++){
				var user = users[i];
				var name = user.username;
				var password = user.password;

				if(usernameValue == name && passwordValue == password){
					document.getElementById("user").innerHTML = name;
					$("#login").fadeOut("slow");
					$("#header h1").delay("slow").fadeIn("slow");
					$("#home").fadeIn(3000);
					checkUser = true;
					checkPass = true;
				}
				else if(usernameValue == name && passwordValue != password){
					checkUser = true;
					checkPass = false;
				}
			}
			loginAlert(checkUser,checkPass);
		}
	}

	xmlhttp.open("GET","Source/JS/users.json",true);
	xmlhttp.overrideMimeType("application/json");
	xmlhttp.send();
	return false;
}

var loginAlert = function(alert1,alert2){
	if(alert1 && !alert2){
		alert("Password yang anda masukkan salah");
	}
	else if(!alert1){
		console.log("masuk");
		alert("Username yang anda masukkan salah");
	}
}

var clearHistory = function(){
	document.getElementById("rank").innerHTML = "";
	localStorage.removeItem("historyRank");
}

var openCredit = function(){
	$("h1").fadeOut("slow");
	$("#home").fadeOut("slow");
	$("#creditPage").fadeIn(3000);
}

var playGame = function(){
	$("#home").fadeOut("slow");
	$("#game").fadeIn(3000);
}

var back = function(){
	if(document.getElementById("game").style.display != "none"){
		$("#game").fadeOut("slow");
		stopTimer();
		$("#home").delay("slow").fadeIn(3000);
		loadSleeve();
	}
	else if(document.getElementById("creditPage").style.display != "none"){
		$("#creditPage").fadeOut("slow");
		$("h1").delay("slow").fadeIn("slow");
		$("#home").fadeIn(3000);
	}
}

var checkImage = function(arrayIndex,arrayGambar,countSolve){
	setTimeout(function(){
		if(arrayGambar[0] != arrayGambar[1]){
			var gambar0 = document.getElementById("flex-container").childNodes[arrayIndex[0]];
			var gambar1 = document.getElementById("flex-container").childNodes[arrayIndex[1]];
			gambar0.src = "Source/Images/CardSleeve/cardSleeve3.png";
			gambar1.src = "Source/Images/CardSleeve/cardSleeve3.png";
		}
		else{
			checked+=1;
		}
	},500);
	return checked;
}