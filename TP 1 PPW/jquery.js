$(document).ready(function(){
	var counter = 0;
	var arrayIndex = [];
	var arrayGambar = [];
	var solved = 0;
	var done = false;
	
	$("#login").hide();
	$("#welcome").delay("slow").fadeIn(3000);
	$("#welcome").delay("slow").fadeOut(1000);
	$("#project").delay(3000).fadeIn(3000);
	$("#project").delay("slow").fadeOut(2000);
	$("#transitionScreen").delay(9000).fadeOut(2000);
	$("#login").delay(9000).fadeIn(2000);
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

	var sortArray = function(array){
		if(typeof array == "Object"){
			array.sort(function(a,b){
				return parseInt(a)-parseInt(b);
			});
		}
	}

	var addRank = function(array){
		console.log("add rank :" + array.length);
		var output = "";
		for(var i = 0; i < array.length;i++){
			var obj = array[i];
			var username = obj.username;
			var time = obj.time;
			output+="<li>"+username + " - " +savedToString(time)+"</li>";
		}
		document.getElementById("rank").innerHTML = output;
	}

	if(localStorage["historyRank"] != undefined){
		historyArray = JSON.parse(localStorage["historyRank"]);
		sortArray(historyArray);
		addRank(historyArray);
	}

	$("body").on("click","#gameStart",function(){
		solved = 0;
		loadImage(randomItem());
		stopTimer();
		startTimer();

		$('body').on('click','img',function(){
		var source = $(this).attr("src");
		var idImage = $(this).attr("id");
		var indexGambar = $(this).index();

			if(source == "cardSleeve.png"){
				if(arrayIndex[0] != indexGambar && counter < 2){
					$(this).prop('src',idImage);
					arrayGambar.push(idImage);
					arrayIndex.push(indexGambar);
					counter++;
					if(counter == 2){
						checkImage(arrayIndex,arrayGambar);
						arrayIndex = [];
						arrayGambar = [];
						counter = 0;
						console.log(solved);
						if(solved == 7){
							pauseTimer();
							var username = document.getElementById("username").value;
							if(localStorage["historyRank"] == undefined){

								var historyArray = [];
								var userRec = new UserRecord(username,pauseTimer());
								historyArray.push(userRec);
								localStorage["historyRank"] = JSON.stringify(historyArray);
								var history = JSON.parse(localStorage["historyRank"]);
							}
							else{
								var historyArray = JSON.parse(localStorage["historyRank"]);
								console.log(historyArray);
								historyArray.push(new UserRecord(username,pauseTimer()));
								localStorage["historyRank"] = JSON.stringify(historyArray);
							}
							sortArray(historyArray);
							addRank(historyArray);
							done = true;
							return;
						}
					}
				}
			}
		});
		var checkImage = function(arrayIndex,arrayGambar){
			setTimeout(function(){
				if(arrayGambar[0] != arrayGambar[1]){
					var gambar0 = document.getElementById("flex-container").childNodes[arrayIndex[0]];
					var gambar1 = document.getElementById("flex-container").childNodes[arrayIndex[1]];
					gambar0.src = "cardSleeve.png";
					gambar1.src = "cardSleeve.png";
				}
				else{
					solved+=1;
				}
			},500);
		}
	});


	var randomItem = function(){
		var item = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
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
});
