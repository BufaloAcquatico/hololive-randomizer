class Randomizer{
	stages;
	stageImg;
	
	healthStat;
	attackStat;
	speedStat;
	critStat;
	pickupStat;
	hasteStat;
	regenStat;
	defenseStat;
	
	fansStat;
	noWeaponsStat;
	
	difficultySlider;
	
	constructor(stageImg, healthStat, attackStat, speedStat, critStat, pickupStat, hasteStat, regenStat, defenseStat, fansStat, noWeaponsStat, difficultySlider){
		this.stages = [
		{filename:"stage1.png", difficulty: 0},
		{filename:"stage2.png", difficulty: 1},
		{filename:"stage3.png", difficulty: 2},
		{filename:"stage1hard.png", difficulty: 5},
		{filename:"stage2hard.png", difficulty: 10}
		];
		
		this.healthProbabilities = [2,2,2,2,2,2,1,1,1,1,1];
		this.attackProbabilities = [2,2,2,2,2,2,1,1,1,1,1];
		this.speedProbabilities = [2,2,2,2,2,2,1,1,1,1,1];
		this.critProbabilities = [5,5,4,4,3,3];
		this.pickupProbabilities = [2,2,2,2,2,2,1,1,1,1,1];
		this.hasteProbabilities = [5,5,4,4,3,3];
		this.regenProbabilities = [5,5,4,4,3,3];
		this.defenseProbabilities = [5,5,4,4,3,3];
		
		this.minimumHealthByStage = [0,2,3,5,6];
		this.minimumAttackByStage = [0,2,3,5,6];
		this.fansProbabilities = [2,2,3,3,4,4];
		this.noWeaponsProbabilities = [1,1,2,2,3,3];
		
		this.stageImg = stageImg;
		
		this.healthStat = healthStat;
		this.attackStat = attackStat;
		this.speedStat = speedStat;
		this.critStat = critStat;
		this.pickupStat = pickupStat;
		this.hasteStat = hasteStat;
		this.regenStat = regenStat;
		this.defenseStat = defenseStat;
		this.fansStat = fansStat;
		this.noWeaponsStat = noWeaponsStat;
		
		this.difficultySlider = difficultySlider;
		
		this.#printEmptyStatPoint(this.healthStat, 10);
		this.#printEmptyStatPoint(this.attackStat, 10);
		this.#printEmptyStatPoint(this.speedStat, 10);
		this.#printEmptyStatPoint(this.critStat, 5);
		this.#printEmptyStatPoint(this.pickupStat, 10);
		this.#printEmptyStatPoint(this.hasteStat, 5);
		this.#printEmptyStatPoint(this.regenStat, 5);
		this.#printEmptyStatPoint(this.defenseStat, 5);
		this.#printEmptyStatPoint(this.fansStat, 5);
		this.#printEmptyStatPoint(this.noWeaponsStat, 5);
	}
	
	#randomInRange(min, max){
		return Math.round( Math.random()*(max-min) + min);
	}
	
	#randomWithProbabilities(probabilities){
		var aux = [];
		for(var i = 0; i < probabilities.length; i++){
			aux[i] = 0;
		}
		while(true){
			var index = this.#randomInRange(0, probabilities.length-1);
			aux[index]++;
			if(aux[index] >= probabilities[index])
				return index;
		}
	}
	
	#randomizeStage(){
		var index = this.#pickRandomStageNumber();
		this.#applyStage(index);
	}
	
	#emptyStats(){
		this.healthStat.html("");
		this.attackStat.html("");
		this.speedStat.html("");
		this.critStat.html("");
		this.pickupStat.html("");
		this.hasteStat.html("");
		this.regenStat.html("");
		this.defenseStat.html("");
		this.fansStat.html("");
		this.noWeaponsStat.html("");
	}
	
	#randomizeStats(){
		this.#emptyStats();
		this.#applyStat(this.#randomWithProbabilities(this.healthProbabilities), this.healthStat, 10);
		this.#applyStat(this.#randomWithProbabilities(this.attackProbabilities), this.attackStat, 10);
		this.#applyStat(this.#randomWithProbabilities(this.speedProbabilities), this.speedStat, 10);
		this.#applyStat(this.#randomWithProbabilities(this.critProbabilities), this.critStat, 5);
		this.#applyStat(this.#randomWithProbabilities(this.pickupProbabilities), this.pickupStat, 10);
		this.#applyStat(this.#randomWithProbabilities(this.hasteProbabilities), this.hasteStat, 5);
		this.#applyStat(this.#randomWithProbabilities(this.regenProbabilities), this.regenStat, 5);
		this.#applyStat(this.#randomWithProbabilities(this.defenseProbabilities), this.defenseStat, 5);
		
		this.#applyStat(this.#randomWithProbabilities(this.fansProbabilities), this.fansStat, 5);
		this.#applyStat(this.#randomWithProbabilities(this.noWeaponsProbabilities), this.noWeaponsStat, 5);
	}
	
	#pickRandomStageNumber(){
		return this.#randomInRange(0, this.stages.length-1);
	}
	
	#applyStage(stageNumber){
		var stage = this.stages[stageNumber];
		this.stageImg.attr("src","img/" + stage.filename);
	}
	
	#applyStat(filled, statToFill, max){
		this.#printFilledStatPoint(statToFill, filled);
		this.#printEmptyStatPoint(statToFill, max - filled);
	}
	
	#printFilledStatPoint(stat, n){
		for(var i = 0; i < n; i++){
			stat.append("<img src='img/filled-stat-point.png' class='stat-point-img' />");
		}
	}
	
	#printEmptyStatPoint(stat, n){
		for(var i = 0; i < n; i++){
			stat.append("<img src='img/empty-stat-point.png' class='stat-point-img' />");
		}
	}
	
	randomize(){
		this.#shuffleAnimation();
	}
	
	drawRandomDifficulty(){
		var rollOne = this.#randomInRange(20,80);
		var rollTwo = this.#randomInRange(20,80);
		
		var difficulty = Math.max(rollOne, rollTwo);
		this.difficultySlider.val(difficulty);
		this.difficultySlider.trigger("change");
	}
	
	#computeDifficultyForStage(stage){
		switch (stage){
			case 0: return 0; // Stage 1
			case 1: return 1; // Stage 2
			case 2: return 2; // Stage 3
			case 3: return 10; // Stage 1 hard
			case 4: return 20; // Stage 2 hard
		}
	}
	
	#computeDifficultyForNoWeaponsStat(noWeaponsDraw){
		return noWeaponsDraw * 2;
	}
	
	#computeDifficultyForFansStat(fansDraw){
		return fansDraw * 2;
	}
	
	#computeDifficultyForGeneric5Stat(stat){
		return stat*2;
	}
	
	#computeDifficultyForGeneric10Stat(stat){
		return stat;
	}
	
	#applyRandomizedResult(result){
		this.#emptyStats();
		this.#applyStage(result.stage);
		this.#applyStat(result.healthStat, this.healthStat, 10);
		this.#applyStat(result.attackStat, this.attackStat, 10);
		this.#applyStat(result.speedStat, this.speedStat, 10);
		this.#applyStat(result.critStat, this.critStat, 5);
		this.#applyStat(result.pickupStat, this.pickupStat, 10);
		this.#applyStat(result.hasteStat, this.hasteStat, 5);
		this.#applyStat(result.regenStat, this.regenStat, 5);
		this.#applyStat(result.defenseStat, this.defenseStat, 5);
		this.#applyStat(result.fansStat, this.fansStat, 5);
		this.#applyStat(result.noWeaponsStat, this.noWeaponsStat, 5);
	}
	
	randomizeWithDifficulty(){
		$("#difficulty-result").html("Result: -");
		this.#shuffleAnimation();
		
		setTimeout(() => { 
		var difficulty = this.difficultySlider.val();
		
		var attempts = 100000;
		var distance = 99999;
		var result = {};
		var resultTotal = 0;
		while(true){
			var stage = this.#pickRandomStageNumber();
			console.log("Stage: " + stage);
			console.log("Minimum health:" + this.minimumHealthByStage[stage]);
			var healthDraw = this.#randomInRange(this.minimumHealthByStage[stage],10);
			var attackDraw = this.#randomInRange(this.minimumAttackByStage[stage],10);
			var speedDraw = this.#randomInRange(0,10);
			var critDraw = this.#randomInRange(0,5);
			var pickupDraw = this.#randomInRange(0,10);
			var hasteDraw = this.#randomInRange(0,5);
			var regenDraw = this.#randomInRange(0,5);
			var defenseDraw = this.#randomInRange(0,5);
			var fansDraw = this.#randomWithProbabilities(this.fansProbabilities);
			var noWeaponsDraw = this.#randomWithProbabilities(this.noWeaponsProbabilities);
			
			var total = 0;
			total += this.#computeDifficultyForStage(stage);
			
			total += 10 - this.#computeDifficultyForGeneric10Stat(healthDraw);
			total += 10 - this.#computeDifficultyForGeneric10Stat(attackDraw);
			total += 10 - this.#computeDifficultyForGeneric10Stat(speedDraw);
			total += 10 - this.#computeDifficultyForGeneric5Stat(critDraw);
			total += 10 - this.#computeDifficultyForGeneric10Stat(pickupDraw);
			total += 10 - this.#computeDifficultyForGeneric5Stat(hasteDraw);
			total += 10 - this.#computeDifficultyForGeneric5Stat(regenDraw);
			total += 10 - this.#computeDifficultyForGeneric5Stat(defenseDraw);
			total += this.#computeDifficultyForNoWeaponsStat(noWeaponsDraw);
			total += this.#computeDifficultyForFansStat(fansDraw);
			
			var newDistance = Math.abs(difficulty - total);
			if(newDistance < distance){
				result = { 
					stage: stage,
					healthStat: healthDraw,
					attackStat: attackDraw,
					speedStat: speedDraw,
					critStat: critDraw,
					pickupStat: pickupDraw,
					hasteStat: hasteDraw,
					regenStat: regenDraw,
					defenseStat: defenseDraw,
					fansStat: fansDraw,
					noWeaponsStat: noWeaponsDraw
				};
				
				resultTotal = total;
				distance = newDistance;
				console.log(distance);
			}
			
			if(distance <= difficulty/10)
				break;
		}
		$("#difficulty-result").html("Result: " + resultTotal + " difficulty");
		this.#applyRandomizedResult(result);
		}, 100*20)
		
	}
	
	#shuffleAnimation(){
		for(var i = 0; i < 20; i++){
			setTimeout(() => { 
			this.#randomizeStage();
			this.#randomizeStats(); }, 100*i);
		}
	}
	
	#sleep(milliseconds) {
	  const date = Date.now();
	  let currentDate = null;
	  do {
		currentDate = Date.now();
	  } while (currentDate - date < milliseconds);
	}
}