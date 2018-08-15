
/*
 * 
 * Copyright 2011 fxspec06 (Bryan Leasot)
 * Not for distribution
 * Use of Villo appliccable to the appropriate licenses
 * 
 */

function WildngameAssistant() {
}
WildngameAssistant.prototype.hideElement = function(e){
	switch(deviceType){
		case "Android":
			e.style.visibility = "hidden"; //Android
			break;
		default:
			e.style.marginTop = "9999px"; //iOS, webOS
			break;
	}
};
WildngameAssistant.prototype.showElement = function(e){
	switch(deviceType){
		case "Android":
			e.style.visibility = "visible"; //Android
			break;
		default:
			e.style.marginTop = null; //iOS, webOS
			break;
	}
};
WildngameAssistant.prototype.isShowing = function(e){
	var isShowing;
	switch(deviceType){
		case "Android":
			isShowing = (e.style.visibility != "hidden"); //Android
			break;
		default:
			isShowing = (e.style.marginTop != "9999px"); //iOS, webOS
			break;
	}
	return isShowing;
};
WildngameAssistant.prototype.activate = function(event) {
	var holdButton;
	turnSpeed = 300;
	if(deviceType == "iOS"){
		turnSpeed = 210;
	}
	//if(DetectIOS){turnSpeed = 0}
	cardNumber = new Array(NUM_CARDS);
	cardSuit = new Array(NUM_CARDS);
	cardNumber2 = new Array(NUM_CARDS);
	cardSuit2 = new Array(NUM_CARDS);
	cardState = new Array(NUM_CARDS);
	checkStraight = new Array(NUM_CARDS);

    
    
    
    
    
    
	
	resume = firstRefresh = delayPayoutSound = dontFlipDown = false;
	t1 = t2 = t3 = t4 = t5 = t6 = t = dontAllow = numFlashes = tFS = tBET = 0;
	
	for (var x = 1; x <= NUM_CARDS; x++){
		var divString = "card" + x;
		var piece2 = '<img alt="" class="shadow rotateCard" id="' + divString + 'shadow" src="images/CARD-SHADOW.png" /><img alt="" class="back rotateCard" style="margin-top: ' + (-11 / scaleFactor) + 'px;"id="' + divString + 'down" src="images/card-backs/' + cardBack + '.png" />';
		//document.getElementById(divString + "backside").innerHTML = piece2;
		if (doScale) {
			//scale(["card" + x + "shadow", "card" + x + "down"], true, true, true, false);
		}
	}
	//document.getElementById("back2").style.visibility = "visible";
	//document.getElementById("back2").addEventListener(upEvent, this.back_.bind(this));
	//document.getElementById("deal-bar").style.visibility = "visible";
	//document.getElementById("divider").style.visibility = "visible";
	var suits = ["hearts", "diamonds", "clubs", "spades"];
	var i = 4;
	do{
		document.getElementById(suits[i-1]).style.visibility = "hidden";
	} while (--i);
	currentScene = "wildngame";
	markAppForeground();
	switch (playingWildnGame){
		case (true):
			money = wildnGameSettings.wgMoney;
			bet = wildnGameSettings.wgBet;
			//document.getElementById("wild").style.visibility = "visible";
			difficulty = 3;
			break;
		case (false):
			money = wildnGameSettings.bgMoney;
			bet = wildnGameSettings.bgBet;
			difficulty = 1;
			wild = 0;
			break;
	};
	if (wildnGameSettings.isTesting){
		var isTesting = true;
		wildnGameSettings.isTesting = false;
	}
	if (wildnGameSettings.resumePause && (!isFlashing || (typeof(isTesting)!="undefined" && isTesting == true))){
		resume = true;
		wildnGameSettings.resumePause = false;
    } else {
        resume = false;
    }
	switch (resume) {
		case (true):
			if (playingWildnGame){wild = wildnGameSettings.wild};
			cardSuit[0] = wildnGameSettings.cardSuit1;
			cardSuit[1] = wildnGameSettings.cardSuit2;
			cardSuit[2] = wildnGameSettings.cardSuit3;
			cardSuit[3] = wildnGameSettings.cardSuit4;
			cardSuit[4] = wildnGameSettings.cardSuit5;
            cardSuit[5] = wildnGameSettings.cardSuit6;
			cardNumber[0] = wildnGameSettings.cardNumber1;
			cardNumber[1] = wildnGameSettings.cardNumber2;
			cardNumber[2] = wildnGameSettings.cardNumber3;
			cardNumber[3] = wildnGameSettings.cardNumber4;
			cardNumber[4] = wildnGameSettings.cardNumber5;
            cardNumber[5] = wildnGameSettings.cardNumber6;
			break;
		case (false):
            wildnGameSettings.streak = 0;
			wildnGameSettings.resumePause = false;
			didFlipAll = false;
			secondDeal = false;
			flipState = new Array(NUM_CARDS);
			holdState = new Array(NUM_CARDS);
			canFlip = new Array(NUM_CARDS+1);
			toDeal = NUM_CARDS;
			this.dealSound5();
			break;
	};
	this.showUp();
	console.log("LALALA1");
	if (!isTesting) {
		this.showScore(this, 0, money);
		console.log("LALALA2");
		this.firstDeal();
	}
	this.refreshFlipState();
	var i = NUM_CARDS;
	do {
		holdState[i-1]==1 ? document.getElementById("card"+i).style.backgroundColor = "purple" : document.getElementById("card"+i).style.backgroundColor = "";
		if (autoDeal) {
			flipState[i - 1] = 1;
		};
	} while (--i);
	if (typeof(isTesting)!="undefined" && isTesting === true){
		prize = 0;
		this.showScore(this, prize, money);
		this.showWild();
		this.deal();
	}
};
WildngameAssistant.prototype.deactivate = function() {
	//this.showUp();
	//document.getElementById("wild").style.visibility = "hidden";
	/*document.getElementById("divider").style.visibility = "hidden";
	document.getElementById("deal-bar").style.visibility = "hidden";
	document.getElementById("deal").style.visibility = "hidden";
	document.getElementById("winnerBar").style.visibility = "hidden";
	*/
    if (document.getElementById("wildCardInfo")!=null){
        document.getElementById("wildCardInfo").style.visibility = "hidden";
	}
	/*document.getElementById("score").style.visibility = "hidden";
	document.getElementById("winnerZ").innerHTML = "";
	document.getElementById("back2").style.visibility = "hidden";*/
	var i = NUM_CARDS;
	do{
		/*document.getElementById("card" + i + "backside").style.webkitTransform = "";
		this.hideElement(document.getElementById("card" + i + "contents"));
		this.hideElement(document.getElementById("card" + i + "backside"));*/
		//document.getElementById("scoreDigit" + i + "div").style.visibility = "hidden";
		//document.getElementById("tapZone" + i + "").style.visibility = "hidden";
		//document.getElementById("card" + i + "").style.backgroundColor = "";
	} while (--i);
	var i = 4;
	var suits = ["hearts", "diamonds", "clubs", "spades"];
	do{
		document.getElementById(suits[i-1]).style.visibility = "visible";
	} while (--i);
	
	(money <= 0 && !makeNew) ? stage.createNewGame() : stage.saveGame();
	var fastBet;
	playingWildnGame === true ? fastBet = bet * 3 : fastBet = bet;
	if (money < fastBet && playingWildnGame && money < minBet * 3 && !makeNew){
		stage.createNewGame();
	};
	clearTimeout(t); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
	pWait = t = t1 = t2 = t3 = t4 = t5 = t6 = 0;
};
WildngameAssistant.prototype.back = function(event) {
	if(forceWait){
		setTimeout(this.back.bind(this), 1000);
		return;
	}
	if (!t3 && !t4 && !t5 && !t6 && ((!autoDeal && !secondDeal) || autoDeal && !secondDeal || isFlashing) && !dontAllow && !rankUp && !makeNew){
		//document.getElementById("deal-bar").style.visibility = "hidden";
		//document.getElementById("back2").style.opacity = ".5";
		timeout = pWait + 100;
		t4 = setTimeout(function(){
			swapScene("menu");
			//document.getElementById("back2").style.opacity = "1";
			//document.getElementById("back2").style.visibility = "hidden";
		}, timeout);
	};
};
WildngameAssistant.prototype.forward = function(event) {
	if (!t3 && !t4 && !t5 && !t6 && ((!autoDeal && !secondDeal) || autoDeal || isFlashing) && !dontAllow && !rankUp){
		//document.getElementById("deal-bar").style.visibility = "hidden";
		timeout = pWait + 100;
		t5 = setTimeout(function(){
			scene = "wildngame";
			betStatus = "bet";
			menuStatus = "bet";
			swapScene("menu");
		}, timeout);
	}
};
WildngameAssistant.prototype.tapZone1 = function(event){
	holdButton = 1;
	flipState[0]==1 ? this.holdCard() : this.flipCard(1);
};
WildngameAssistant.prototype.tapZone2 = function(event){
	holdButton = 2;
	flipState[1]==1 ? this.holdCard() : this.flipCard(2);
};
WildngameAssistant.prototype.tapZone3 = function(event){
	holdButton = 3;
	flipState[2]==1 ? this.holdCard() : this.flipCard(3);
};
WildngameAssistant.prototype.tapZone4 = function(event){
	holdButton = 4;
	flipState[3]==1 ? this.holdCard() : this.flipCard(4);
};
WildngameAssistant.prototype.tapZone5 = function(event){
	holdButton = 5;
	flipState[4]==1 ? this.holdCard() : this.flipCard(5);
};
WildngameAssistant.prototype.tapZone6 = function(event){
    holdButton = 6;
    flipState[5]==1 ? this.holdCard() : this.flipCard(6);
}
WildngameAssistant.prototype.refreshFlipState = function(){
	var flippedAll;
	var doFlip;
	switch (autoDeal) {
		case true:
			if (isFlashing) {
				timeout = pWait + 75;
				setTimeout(this.newHand.bind(this), timeout);
				return;
			};
			var iz = NUM_CARDS;
			do {
				flipState[iz - 1] = 1;
			} while (--iz);
			flippedAll = NUM_CARDS;
			didFlipAll = true;
			this.showUp();
			break;
		case false:
			var iz = NUM_CARDS;
			flippedAll = 0;
			do {
				if (flipState[iz - 1] == 1) {
					flippedAll++;
				}
			} while (--iz);
			didFlipAll = flippedAll == NUM_CARDS;// ? true : false;
			break;
	};
	doFlip = flippedAll == 0 || secondDeal;// ? true : false;
	iz = 0;
	var xi = 0;
	do {
		if(flipState[iz - 1] == 0 && doFlip){
			var thisCard = iz;
			timeout = secondDeal ? iz * 90 : xi * 125;
			setTimeout(this.flipDown.bind(this), timeout, thisCard);
			xi++;
		};
	} while (iz++ < NUM_CARDS);
	if (didFlipAll) {
		switch (secondDeal) {
			case (true):
				autoDeal === false ? t2 = setTimeout(this.flippedAll.bind(this), turnSpeed) : this.flippedAll();
				break;
			case (false):
				if(!autoDeal){document.getElementById("deal").style.visibility = "visible";}
				break;
		};
	}
};
WildngameAssistant.prototype.flipCard = function(cardToFlip){
	if (!canFlip[cardToFlip] || forceWait){
		setTimeout(this.flipCard.bind(this), 175, cardToFlip);
		return;
	}
	this.flipSound();
	clearTimeout(tFS);
	var it = cardToFlip;
	/*document.getElementById("card" + it + "backside").style.webkitTransform = webkitTransform;
	document.getElementById("card" + it + "contents").style.webkitTransform = "";*/
	flipState[it - 1] = 1;
	//if (secondDeal){document.getElementById("tapZone" + it).style.visibility = "hidden";}
	setTimeout(function(){
		/*WildngameAssistant.prototype.showElement(document.getElementById("card" + it + "contents"));
		WildngameAssistant.prototype.hideElement(document.getElementById("card" + it + "backside"));*/
		canFlip[it] = 0;
	}, turnSpeed);
	tFS = setTimeout(this.refreshFlipState.bind(this), turnSpeed);
};
WildngameAssistant.prototype.holdCard = function(){
	var i = holdButton;
	switch (document.getElementById("card"+i).style.backgroundColor) {
		case "purple":
			document.getElementById("card"+i).style.backgroundColor = "";
			holdState[i - 1] = 0;
			toDeal++;
			this.unholdSound();
			break;
        default:
			document.getElementById("card"+i).style.backgroundColor = "purple";
			holdState[i - 1] = 1;
			toDeal--;
			this.holdSound();
			break;
	};
};
WildngameAssistant.prototype.flipDown = function(thisCard){
	if(dontFlipDown){return;}
	var lastCard = thisCard;
	//document.getElementById("card" + lastCard + "backside").style.webkitTransform = "";
	//document.getElementById("card" + lastCard + "contents").style.webkitTransform = webkitTransform;
	t1 = setTimeout(this.showDown.bind(this), turnSpeed, lastCard);
};
WildngameAssistant.prototype.showDown = function(lastCard){
	var divString;
	if(didFlipAll && lastCard == NUM_CARDS){dontFlipDown = true};
	divString = "card" + lastCard;
	//this.hideElement(document.getElementById(divString + "contents"));
	//this.showElement(document.getElementById(divString + "backside"));
	//document.getElementById(divString + "backside").style.webkitTransform = "";
	var i = NUM_CARDS;
	var deal = 0;
	do{
		//if (this.isShowing(document.getElementById("card" + i + "backside"))) {
			//deal++;
		//}
	} while (--i);
	//console.log(deal);
	if(deal == NUM_CARDS && !secondDeal || deal + (NUM_CARDS - z) == NUM_CARDS && secondDeal){
		this.deal();
		z = 0;
	};
};
WildngameAssistant.prototype.showUp = function(){
	var i = NUM_CARDS;
	var divString;
	do{
		if (flipState[i - 1] == 1) {
			//this.hideElement(document.getElementById("card" + i + "backside"));
			//document.getElementById("card" + i + "backside").style.webkitTransform = webkitTransform;
		} else if (!autoDeal) {
			//this.hideElement(document.getElementById("card" + i + "contents"));
			//document.getElementById("card" + i + "contents").style.webkitTransform = webkitTransform;
			//this.showElement(document.getElementById("card" + i + "backside"));
		}
	} while (--i);
};
WildngameAssistant.prototype.flippedAll = function(event) {
	if (!isFlashing) {
		var _winner = this.checkAll(cardNumber, cardSuit);
        
        
        
        if (_winner != null) {
            this.UpdateWinners(_winner);
        }
        
        pWait = 2800;
		
		
        
        
        isFlashing = true;
		nextHand = true;
		//document.getElementById("deal-bar").style.visibility = "visible";
	}
};
WildngameAssistant.prototype.showWild = function(){
	var bgUrl;
	switch(wild) {
		case 2:	case 3:	case 4:	case 5:	case 6:	case 7:	case 8:	case 9: case 10:
			bgUrl = "images/menu/numbers/" + wild + ".png";
			break;
		case 11:
			bgUrl = "images/menu/numbers/J" + ".png";
			break;
		case 12:
			bgUrl = "images/menu/numbers/Q" + ".png";
			break;
		case 13:
			bgUrl = "images/menu/numbers/K" + ".png";
			break;
		case 14:
			bgUrl = "images/menu/numbers/A" + ".png";
			break;
	};
    
    if (playingWildnGame) {
        document.getElementById("wildCardInfo").style.visibility = "visible";
    } else {
        document.getElementById("wildCardInfo").style.visibility = "hidden";
    }
    document.getElementById("wildCardInfo").innerHTML = "Wild: " + wild;
	
	/*if (wild === 10){
		document.getElementById("wildCard1").style.width = "36px";
	} else if (wild > 10){
		document.getElementById("wildCard1").style.height = "30px";
		document.getElementById("wildCard1").style.width = "30px";
		document.getElementById("wildCard1").style.marginTop = verticalMargin - 1 + "px";
	}*/
	
	if(doScale){
		//scale(["wildCard1"]);
	}
};
WildngameAssistant.prototype.flipSound = function(){
	if (!sound){return};
	playSound(0);
};
WildngameAssistant.prototype.holdSound = function(){
	if (!sound){return};
	playSound(1);
};
WildngameAssistant.prototype.unholdSound = function(){
	if (!sound){return};
	playSound(2);
};
WildngameAssistant.prototype.dealSound1  = function(){
	if (!sound){return};
	playSound(3);
};
WildngameAssistant.prototype.dealSound2 = function(){
	if (!sound){return};
	playSound(4);
};
WildngameAssistant.prototype.dealSound3 = function(){
	if (!sound){return};
	playSound(5);
};
WildngameAssistant.prototype.dealSound4 = function(){
	if (!sound){return};
	playSound(6);
};
WildngameAssistant.prototype.dealSound5 = function(){
	if (!sound || makeNew || menuStatus === "fastBet"){return};
	playSound(7);
};
WildngameAssistant.prototype.payoutSound = function(){
	if (!sound){return};
	switch (true){
		case (prize<100):
			playSound(8);
			break;
		case (prize<500):
			playSound(9);
			break;
		case (prize>=500):
			playSound(10);
			break;
	};
	delayPayoutSound = false;
};
WildngameAssistant.prototype.lvlUpSound = function(){
	if (!sound){return};
	playSound(11);
};
WildngameAssistant.prototype.loseSound = function(){
	if (!sound){return};
	playSound(12);
};
WildngameAssistant.prototype.deal = function() {
//THIS IS THE LAST FUNCTION CALLED AFTER A NEW HAND.
	dontFlipDown = true;
	t = 0; t1 = 0; t2 = 0; t3 = 0; t4 = 0; t5 = 0; t6 = 0;
	var _c = NUM_CARDS;
	do
	{
		var left;
		var number;
		var suit;
		if (!cardState[_c - 1])
		{
			switch (resume)
			{
				case true:
					number = cardNumber[_c - 1];
					suit = cardSuit[_c - 1];
					break;
				case false:
					do
					{
						var loop = false;
						number = randomInt(2, 14);
						suit = randomInt(1, 4);
						var i = NUM_CARDS;
						do
						{
							var x = i - 1;
							if ((cardNumber[x] == number && cardSuit[x] == suit) || (cardNumber2[x] == number && cardSuit2[x] == suit))
							{
								loop = true;
							};
						} while (--i);
					} while (loop);
					cardNumber[_c - 1] = number;
					cardSuit[_c - 1] = suit;
					break;
			};
			var leftImg1 = 0;
			var leftImg2 = 0;
			var topImg1 = 6;
			var topImg2 = 99;
			switch (number)
			{
				case 10:
					leftImg1 = leftImg1 - 13;
					leftImg2 = leftImg2 + 2;
				case 4:
					leftImg1 = leftImg1 + 1;
				case 2:	case 3:	case 4:	case 5:	case 6:	case 7:	case 8:	case 9: case 10:
					bgUrl = "images/black/" + number + ".png";
					break;
				case 11:
					bgUrl = "images/black/J.png";
					break;
				case 12:
					bgUrl = "images/black/Q.png";
					leftImg1 = leftImg1 + 1;
					leftImg2 = leftImg2 - 1;
					//topImg1 = topImg1 - 1;
					//topImg2 = topImg2 - 1;
					break;
				case 13:
					bgUrl = "images/black/K.png";
					leftImg1 = leftImg1 + 1;
					leftImg2 = leftImg2 - 1;
					break;
				case 14:
					bgUrl = "images/black/A.png";
					//leftImg2 = leftImg2 - 2;
					break;
			};
			var digitWidth = 33;
			if (number == 10){digitWidth = 43};
			var divString = "card" + _c;
			/*document.getElementById(divString + "left").style.width = digitWidth + "px";
			document.getElementById(divString + "left").style.left = leftImg1 + "px";
			document.getElementById(divString + "left").style.top = topImg1 + "px";
			document.getElementById(divString + "left").style.backgroundImage = bgUrl;
			document.getElementById(divString + "right").style.width = digitWidth + "px";
			document.getElementById(divString + "right").style.left = leftImg2 + "px";
			document.getElementById(divString + "right").style.top = topImg2 + "px";
			document.getElementById(divString + "right").style.backgroundImage = bgUrl;*/
			
			var style1 = 'visibility:inherit;width:' + digitWidth + 'px;margin-left:' + leftImg1 / scaleFactor + 'px;" src="' + bgUrl;
			var style2 = 'visibility:inherit;width:' + digitWidth + 'px;margin-left:' + leftImg2 / scaleFactor + 'px;" src="' + bgUrl;
			
			switch (suit)
			{
				case 1:
					bgUrl = "images/suits/apple.png";
					break;
				case 2:
					bgUrl = "images/suits/orange.png";
					break;
				case 3:
					bgUrl = "images/suits/banana.png";
					break;
				case 4:
					bgUrl = "images/suits/cherry.png";
					break;
			};
			//document.getElementById(divString + "suits").style.left = 6 + "px";
            
            
            
            
            
            document.getElementById(divString + "suits").innerHTML = "<img class='cardImage' src='"+bgUrl+"' />";
                  //document.getElementById(divString + "suits").style.backgroundImage  = "url("+bgUrl+")";

            switch(number) {
                case 14:
                    number = "A";
                    break;
                case 11:
                    number = "J";
                    break;
                case 12:
                    number = "Q";
                    break;
                case 13:
                    number = "K";
                    break;
            }
            document.getElementById(divString + "number").innerHTML = number;
			
			var style3 = 'visibility:inherit;" src="' + bgUrl;
			
			var piece1 = '<img alt="" id="' + divString + 'right" class="cardRight" style="' + style1 + '" />';
			var piece2 = '<img alt="" id="' + divString + 'left" class="cardLeft" style="' + style2 + '" />';
			var piece3 = '<img alt="" id="' + divString + 'suit" class="cardSuit" style="' + style3 + '" />';
			var piece4 = '<img alt="" id="' + divString + 'up" class="cardFace" src="images/CARD-BACKGROUND.png" />'
			
			/*document.getElementById(divString + "contents").innerHTML = piece4 + piece2 + piece3 + piece1;
			
			if (horizontalMargin){
				document.getElementById(divString + "contents").style.marginLeft = horizontalMargin + "px";
			}
			if(verticalMargin){
				document.getElementById(divString + "contents").style.marginTop = verticalMargin + "px";
			}
			if (doScale) {
				scale([divString + "right", divString + "left", divString + "suits", divString + "up"], true, true, false, false);
			}
			document.getElementById(divString + "contents").className = "";*/
			if(!autoDeal && !resume){
				//document.getElementById(divString + "contents").style.webkitTransform = webkitTransform;
				canFlip[_c] = 1;
			} else {
				//document.getElementById(divString + "contents").style.webkitTransform = "";
			}
			//document.getElementById(divString + "contents").className += "fix front rotateCard";
		};
	} while (--_c);
	if (resume)
	{
		resume = false;
		wildnGameSettings.resume = false;
	};
	var didFlipAll = 0;
	var i = NUM_CARDS;
	do {
		if (flipState[i - 1] == 1){
			didFlipAll++;
			break;
		};
	} while (--i);
	if (autoDeal && (secondDeal || didFlipAll > 0)){this.refreshFlipState()};
};
WildngameAssistant.prototype.firstDeal = function(event) {
	
	console.log("Deal 1 Initialized..");
    wildnGameSettings.money = money;
	if(autoDeal){
		setTimeout(function(){
			//document.getElementById("deal").style.visibility = "visible";
			dontAllow = false;
		}, 1100);
	} else {
		//document.getElementById("deal").style.visibility = "hidden";
		dontAllow = false;
	}
	//document.getElementById("deal-bar").style.visibility = "hidden";
	var i = NUM_CARDS;
	do {
		//document.getElementById("tapZone" + i).style.visibility = "visible";
	} while (--i);
	if (playingWildnGame)
	{
		if (!resume){wild = randomInt(2, 14)};
		this.showWild();
	};
	if (!resume)
	{
		var i = NUM_CARDS;
		do {
			var x = i - 1;
			cardSuit[x] = cardNumber[x] = cardNumber2[x] = cardSuit2[x] = cardState[x] = 0;
			if(!autoDeal){flipState[x] = 0};
		} while (--i);
	};
	queDeal = true;
	if(autoDeal || resume || isFlashing){this.deal()};
	isFlashing = didFlipAll = false;
	numFlashes = 0;
	console.log("Cards dealt, waiting for response..")
};
WildngameAssistant.prototype.secondDeal = function(event) {
	if(secondDeal && !isFlashing){
		return;
	}
	//document.getElementById("deal").style.visibility = "hidden";
	//document.getElementById("deal-bar").style.visibility = "hidden";
	switch (secondDeal){
		case true:
			timeout = pWait + 75;
			if(makeNew && !rankUp){
				this.loseSound();
			};
			if (!dontAllow){t6 = setTimeout(this.newHand.bind(this), timeout)};
			document.getElementById("winnerInfo").style.opacity = ".5";
			break;
		case false:
			switch (toDeal){
				case 1:
					this.dealSound1();
					break;
				case 2:
					this.dealSound2();
					break;
				case 3:
					this.dealSound3();
					break;
				case 4:
					this.dealSound4();
					break;
				case 5:
					this.dealSound5();
					break;
			};
			secondDeal = true;
			console.log("Deal 2 Initiated..");
			didFlipAll = 0;
			z = 0;
			var ix = NUM_CARDS;
			do
			{
				var x = ix - 1;
				switch (document.getElementById("card" + ix).style.backgroundColor){
					case "purple":
						cardState[x] = 1;
						break;
                    default:
						cardNumber2[x] = cardNumber[x];
						cardSuit2[x] = cardSuit[x];
						flipState[x] = 0;
						z++;
						break;
				};
			} while (--ix);
			dontFlipDown = false;
			switch(autoDeal){
				case true:
					this.deal();
					break;
				case false:
					this.refreshFlipState();
					break;
			};
			ix = NUM_CARDS;
			do
			{
				switch (flipState[ix - 1])
				{
					case 0:
						//document.getElementById("tapZone" + ix).style.visibility = "visible";
						break;
					case 1:
						didFlipAll++;
						//document.getElementById("tapZone" + ix).style.visibility = "hidden";
						break;
				};
			} while (--ix);
			if (didFlipAll == NUM_CARDS){this.flippedAll();}
			break;
	};
};
WildngameAssistant.prototype.flashWinner = function () {
	document.getElementById("winnerInfo").style.visibility === "visible" ? document.getElementById("winnerInfo").style.visibility = "hidden" : document.getElementById("winnerInfo").style.visibility = "visible";
	t1 = setTimeout(this.flashWinner.bind(this), 700);
	numFlashes++;
};

WildngameAssistant.prototype.showScore = function(event, prize, money){
	updateScore = function(i){
		if (i >= 0){ //only update the score if you need to..
			pWait = Math.abs((i - money) * ( a / prize));
			scoreDigit1 = (i + "").charAt(0);
			
            document.getElementById("scoreInfo").innerHTML = "Score: " + i;
            
            //document.getElementById("scoreDigit1div").innerHTML = '<img alt="" id="scoreDigit1" class="scoreDigit" src="images/menu/numbers/' + scoreDigit1 + shortcut1 + scoreDigitLeft1 + 'px;">';
			var scoreDigitArray = ["scoreDigit1"];
			var toIndex = i + "";
			switch (true){
				case(i>99999):
					scoreDigitArray[5] = "scoreDigit6";
					scoreDigit6 = (toIndex).charAt(5);
					//document.getElementById("scoreDigit6div").innerHTML = '<img alt="" id="scoreDigit6" class="scoreDigit" src="images/menu/numbers/' + scoreDigit6 + shortcut1 + scoreDigitLeft6 + 'px;">';
				case (i>9999):
					scoreDigitArray[4] = "scoreDigit5";
					scoreDigit5 = (toIndex).charAt(4);
					//document.getElementById("scoreDigit5div").innerHTML = '<img alt="" id="scoreDigit5" class="scoreDigit" src="images/menu/numbers/' + scoreDigit5 + shortcut1 + scoreDigitLeft5 + 'px;">';
				case (i>999):
					scoreDigitArray[3] = "scoreDigit4";
					scoreDigit4 = (toIndex).charAt(3);
					//document.getElementById("scoreDigit4div").innerHTML = '<img alt="" id="scoreDigit4" class="scoreDigit" src="images/menu/numbers/' + scoreDigit4 + shortcut1 + scoreDigitLeft4 + 'px;">';
				case (i>99):
					scoreDigitArray[2] = "scoreDigit3";
					scoreDigit3 = (toIndex).charAt(2);
					//document.getElementById("scoreDigit3div").innerHTML = '<img alt="" id="scoreDigit3" class="scoreDigit" src="images/menu/numbers/' + scoreDigit3 + shortcut1 + scoreDigitLeft3 + 'px;">';
				case (i>9):
					scoreDigitArray[1] = "scoreDigit2";
					scoreDigit2 = (toIndex).charAt(1);
					//document.getElementById("scoreDigit2div").innerHTML = '<img alt="" id="scoreDigit2" class="scoreDigit" src="images/menu/numbers/' + scoreDigit2 + shortcut1 + scoreDigitLeft2 + 'px;">';
					break;
			};
			if (doScale){
				var x = scoreDigitArray.length - 1;
				do {
					/*document.getElementById(scoreDigitArray[x]).style.left = parseInt(document.getElementById(scoreDigitArray[x]).style.left) / scaleFactor + horizontalMargin + "px";
					document.getElementById(scoreDigitArray[x]).style.width = 26 / scaleFactor + "px";
					document.getElementById(scoreDigitArray[x]).style.height = 26 / scaleFactor + "px";
					document.getElementById(scoreDigitArray[x]).style.top = (69 + verticalMargin) / scaleFactor + "px";*/
				} while (x--);
			}
		};
	};
	moveScore = function(i){
		var x = 6;
		do{
			//document.getElementById("scoreDigit" + x + "div").style.visibility = "hidden";
		} while (--x);
		x = (i + "").length;
		do{
			//document.getElementById("scoreDigit" + (x) + "div").style.visibility = "visible";
		} while (--x);
		
		var tmp = i + "";
		var pushOver = tmp.length; //pushOver contains the number of digits in the new score..
		
		scoreDigitLeft1 = (430 + 17 * 1 - 17 * pushOver) + horizontalMargin;
		scoreDigitLeft2 = (430 + 17 * 2 - 17 * pushOver) + horizontalMargin;
		scoreDigitLeft3 = (430 + 17 * 3 - 17 * pushOver) + horizontalMargin;
		scoreDigitLeft4 = (430 + 17 * 4 - 17 * pushOver) + horizontalMargin;
		scoreDigitLeft5 = (430 + 17 * 5 - 17 * pushOver) + horizontalMargin;
		scoreDigitLeft6 = (430 + 17 * 6 - 17 * pushOver) + horizontalMargin;
		
		//document.getElementById("score").style.left = (333 - 17 * pushOver) + horizontalMargin + "px";
		//document.getElementById("score").style.marginLeft = "";
		if (doScale && !verticalMargin){
			//scale(["score"], false, false, true, false);
		}
		//document.getElementById("score").style.marginLeft = horizontalMargin + "px";
		
		//document.getElementById("score").style.visibility = "visible";
		if(verticalMargin){
			//document.getElementById("score").style.top = 69 + verticalMargin*2 + "px";
			//scale(["score"], false, false);
			//document.getElementById("score").style.top = parseInt(document.getElementById("score").style.top) + 1 + "px";
		}
	};
	var oldScore = money - prize;
	var a = 2800;
	var timeout;
	var i;
	console.log("Old Score: " + oldScore);
	console.log("Prize: " + prize);
	console.log("New Score: " + money);
	switch (true)
	{
		case (prize > 999):
			x = Math.round(prize / 1000);
			a = 14000 + 700 * x;
			setTimeout(function()
			{
				dontAllow = setTimeout(function()
				{
					dontAllow = false;
					//document.getElementById("deal-bar").style.visibility = "visible";
				}, pWait);
			}, 10);
			break;
		case (prize > 499 && prize < 1000):
			x = Math.round(prize / 100);
			a = 5600 + 700 * x;
		case (prize > 99 && prize < 500):
			x = Math.round(prize / 100);
			a = 4200 + 700 * x;
			break;
	};
	switch (prize)
	{
		case (64000): case (40000):
			a = 180000;
			break;
		case (0):
			moveScore(money);
			p = (money+"").length;
			do{
				updateScore(money);
				moveScore(money);
			} while (--p);
			break;
	};
	switch (true)
	{
		case (prize<0):
			prize = Math.abs(prize);
			var p = prize;
			console.log("decreasing score...");
			do{
				i = money + p - 1;
				timeout = ( a / prize) * (oldScore - i);
				if((i + 1 + "").length != (i + "").length){
					setTimeout(moveScore.bind(this, i), timeout, i);
				};
				setTimeout(updateScore.bind(this, i), timeout, i);
			} while (--p);
			break;
		case (prize>0):
			setTimeout(this.payoutSound.bind(this), 100*z);
			if(prize>=500){
				setTimeout(this.payoutSound.bind(this), 100*z + 3000);
				if(prize>=1000){
					setTimeout(this.payoutSound.bind(this), 100*z + 6000);
					setTimeout(this.payoutSound.bind(this), 100*z + 9500);
				}
			}
			var p = prize;
			console.log("increasing score...");
			do{
				i = money - p + 1;
				timeout = (a / prize) * (i - oldScore);
				if((i - 1 + "").length != (i + "").length){
					setTimeout(moveScore.bind(this, i), timeout, i);
				};
				setTimeout(updateScore.bind(this, i), timeout, i);
			} while (--p);
			break;
	};
	playingWildnGame === true ? fastBet = bet * 3 : fastBet = bet;
	var thisRank;
		playingWildnGame ? thisRank = wgRankLevel : thisRank = bgRankLevel;
	var nextRank = rankList[thisRank];
	if(money >= nextRank){rankUp = true};
	if ((money <= 0 || (money < fastBet && playingWildnGame && money < minBet * 3)) || rankUp) {
		makeNew = true;
	};
	z = 0;
};
WildngameAssistant.prototype.newHand = function(event) {
	document.getElementById("winnerBar").style.visibility = "hidden";
	document.getElementById("winnerInfo").style.visibility = "hidden";
    
    
    document.getElementById("streakInfo").style.visibility = "hidden";
    document.getElementById("streakInfo").style.visibility = "visible";
    var bonusMultiplier = streak == 0 ? 0 : (streak+1);
    document.getElementById("streakInfo").innerHTML = "Streak: " + streak + "\t|\tBonus multiplier: x" + bonusMultiplier;
    
    var i = NUM_CARDS;
	do
	{
		document.getElementById("card" + i).style.backgroundColor = "";
		cardSuit[i - 1] = cardNumber[i - 1] = cardNumber2[i - 1] = cardSuit2[i - 1] = flipState[i - 1] = holdState[i - 1] = 0;
	} while (--i);
	isFlashing = didFlipAll = dontFlipDown = secondDeal = false;
	clearTimeout(t1);
	if (typeof(document.getElementById("winnerInfo").style.visibility) != "undefined") {
		document.getElementById("winnerInfo").style.visibility = "hidden";
	};
	playingWildnGame === true ? fastBet = bet * 3 : fastBet = bet;
	///YOU RAN OUT OF MONEY
	if (makeNew) {
		switch(rankUp){
			case true:
				this.lvlUpSound();
				setTimeout(function(){
					swapScene("stats");
				}, 700);
				break;
			case false:
				swapScene("stats");
				break;
		};
		return;
	};
	///MAKE A NEW GAME
	if (money < fastBet && money > 0)
	{
		betStatus = "fastBet";
		menuStatus = "bet";
		tBET = swapScene("menu");
		return;
	};
	this.refreshFlipState();
	if(autoDeal){dontAllow = true;}
	this.firstDeal();
	this.dealSound5();
	toDeal = 5;
//    playQueue.length > 5 ? loadSounds() : null;
};
