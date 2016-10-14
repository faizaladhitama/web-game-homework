$(document).ready(function(){
	var counter = 0;
	var arrayIndex = [];
	var arrayGambar = [];
	var done = false;
	var solved = 0;
	
	welcomeAnimation();

	if(localStorage["historyRank"] != undefined){
		historyArray = JSON.parse(localStorage["historyRank"]);
		sortArray(historyArray);
		addRank(historyArray);
	}

	//click start
	$("body").on("click","#gameStart",function(){
		var solved = 0;
		loadImage(randomItem());
		stopTimer();
		startTimer();

		//click gambar
		$('body').on('click','img',function(){
		var source = $(this).attr("src");
		var idImage = $(this).attr("id");
		var indexGambar = $(this).index();

			//gambar yang diclick merupakan sleeve
			if(source == "Source/Images/CardSleeve/cardSleeve3.png"){
				if(arrayIndex[0] != indexGambar && counter < 2){
					$(this).prop('src',idImage);
					arrayGambar.push(idImage);
					arrayIndex.push(indexGambar);
					counter++;
					//2 gambar terbuka
					if(counter == 2){
						solved = checkImage(arrayIndex,arrayGambar,solved);
						arrayIndex = [];
						arrayGambar = [];
						counter = 0;
						//permainan selesai
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
	});
});
