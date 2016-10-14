$(document).ready(function(){
	var counter = 0;
	var arrayIndex = [];
	var arrayGambar = [];
	var solved = 0;
	var done = false;
	
	// $("#login").hide();
	// $("#welcome").delay("slow").fadeIn(3000);
	// $("#welcome").delay("slow").fadeOut(1000);
	// $("#project").delay(3000).fadeIn(3000);
	// $("#project").delay("slow").fadeOut(2000);
	// $("#transitionScreen").delay(9000).fadeOut(2000);
	// $("#login").delay(9000).fadeIn(2000);

	//load rank saat awal
	if(localStorage["historyRank"] != undefined){
		historyArray = JSON.parse(localStorage["historyRank"]);
		sortArray(historyArray);
		addRank(historyArray);
	}

	//ngeclick start
	$("body").on("click","#gameStart",function(){
		solved = 0;
		loadImage(randomItem());
		stopTimer();
		startTimer();

		//ngeclick gambar
		$('body').on('click','img',function(){
		var source = $(this).attr("src");
		var idImage = $(this).attr("id");
		var indexGambar = $(this).index();
			//ngeclick penutup
			if(source == "cardSleeve.png"){
				if(arrayIndex[0] != indexGambar && counter < 2){
					$(this).prop('src',idImage);
					arrayGambar.push(idImage);
					arrayIndex.push(indexGambar);
					counter++;
					//2 gambar sama
					if(counter == 2){
						checkImage(arrayIndex,arrayGambar);
						arrayIndex = [];
						arrayGambar = [];
						counter = 0;
						//semua gambar solved
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
	});
});
