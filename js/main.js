var randomizer;

$(document).ready(function(){
	randomizer = new Randomizer($("#stage-image"), $("#health-stat"), $("#attack-stat"),$("#speed-stat"), $("#crit-stat"),$("#pickup-stat"), $("#haste-stat"),$("#regen-stat"), $("#defense-stat"),$("#fans-stat"), $("#noweapons-stat"), $("#difficulty-slider"));
	
	$("label[for=difficulty-slider]").html("Difficulty: " + "Normal" + " - " + 40);
	$("#difficulty-slider").change(function(){
		var difficulty = $("#difficulty-slider").val()
		var difficultyLabel = "";
		if(difficulty<25)
			difficultyLabel = "Easy";
		else if(difficulty<50)
			difficultyLabel = "Normal";
		else if(difficulty<69)
			difficultyLabel = "Hard";
		else if(difficulty==69)
			difficultyLabel = "Nice";
		else
			difficultyLabel = "Very hard";
		
		$("label[for=difficulty-slider]").html("Difficulty: " + difficultyLabel + " - " + difficulty);
	});
	
	$("#randomize-btn").click(function(){
		randomizer.randomize();
	});
	
	$("#randomize-with-difficulty-btn").click(function(){
		randomizer.randomizeWithDifficulty();
	});
	
	$("#draw-difficulty").click(function(){
		randomizer.drawRandomDifficulty();
	});
})

