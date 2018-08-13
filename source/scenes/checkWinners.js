
WildngameAssistant.prototype.checkAll = function(longArrayCards, longArraySuits) {
    
    if (NUM_CARDS == 5)
        return WildngameAssistant.prototype.checkWinners(longArrayCards, longArraySuits);
    else {
        var _winner = {
        winner: "",
        prize: 0,
        isNatural: true,
        isWinner: false
        }
        var ignore = 0;
        var ignoreLimit = NUM_CARDS;
        
        var _numbers = [], _suits = [];
        
        function copyArray(orig, dest) {
            dest = new Array(orig.length);
            
            for (var x = 0; x < orig.length; x++) {
                dest[x] = orig[x];
            }
            
            return dest;
        }
        var bestWinner = WildngameAssistant.prototype.checkWinners(_numbers, _suits);
        
        for (var i = -1; i < ignoreLimit; i++) {
            
            _numbers = copyArray(longArrayCards, _numbers);
            _suits = copyArray(longArraySuits, _suits);
            
            var _ignore = ignore;
            
            if (i < 0) _ignore = _numbers.length-1;
            
                _numbers.splice(_ignore, 1);
                _suits.splice(_ignore, 1);
            
            
            console.log(JSON.stringify(_numbers) + " ---- " + JSON.stringify(_suits));
            
            var bestWinner = WildngameAssistant.prototype.checkWinners(_numbers, _suits);
            
            if (bestWinner.prize > _winner.prize) {
                _winner = bestWinner;
            } else if (bestWinner.prize == _winner.prize) {
                if (bestWinner.isWinner == true && _winner.isWinner == false)
                    _winner = bestWinner;
            }
            
            ignore++;
        }
        
        console.log(JSON.stringify(_winner));
        return _winner;
    }
    return null;
}



WildngameAssistant.prototype.checkWinners = function(cardsToCheck, suitsToCheck) {
    prize = 0;
    var pairs = 0;
    var wildRoyalFlush = 0;
    var winner = "LOSER";
    var isWinner = false;
    var isNatural = false;
    var straight = 0;
    var numWildCards = 0;
    var wildCheck = [0,0,0,0,0];
    checkStraight = [0,0,0,0,0];
    var wildFlush = 0;
    var a, i, x, c;
    
    i = 5;
    c = 0;
    do{
        c = cardsToCheck[i - 1] + c;
    } while (--i);
    
    /* THE FOLLOWING LINES OF CODE ARE FOR THE WILDN GAME MODE */
    switch (playingWildnGame)
    {
        case true:
            i = 5;
            do{
                if (cardsToCheck[i - 1] == wild)
                {
                    wildCheck[i - 1] = 1;
                    numWildCards++;
                };
            } while (--i);
            console.log("numWildCards");
            console.log(numWildCards);
            if (numWildCards > 0)
            {
                for(a = 0; a < 5; a++)
                {
                    for(i = a + 1; i < 5; i++)
                    {
                        if (cardsToCheck[a] == cardsToCheck[i] && cardsToCheck[a] != wild){pairs++};
                    };
                };
                console.log("pairs");
                console.log(pairs);
                if (( (pairs == 2 && numWildCards == 1) )&&!(prize > 15))
                {
                    winner = "FULL-HOUSE";
                    prize = 20;
                    isNatural = false;
                    isWinner = true;
                };
                if (numWildCards == 4 && !(prize > 1000))
                {
                    winner = "FOUR-WILD";
                    prize = 1000;
                    isNatural = false;
                    isWinner = true;
                };
                if (!(prize>50)&&((pairs == 3 && numWildCards == 2) || (pairs == 1 && numWildCards == 3) || (pairs == 6 && numWildCards == 1)))
                {
                    winner = "FIVE-OF-A-KIND";
                    prize = 50;
                    isNatural = false;
                    isWinner = true;
                };
                for (a = 0; a < 4; a++)
                {
                    for (i = a + 1; i < 5; i++)
                    {
                        if (suitsToCheck[i] == suitsToCheck[a] && cardsToCheck[i] != cardsToCheck[a] && ((cardsToCheck[a] > 9 && cardsToCheck[a] != wild) && (cardsToCheck[i] > 9 && cardsToCheck[i] != wild)))
                        {
                            wildRoyalFlush++;
                        };
                    };
                };
                if (!(prize > 100) && (wildRoyalFlush == 6 && numWildCards == 1 || wildRoyalFlush == 3 && numWildCards == 2))
                {
                    winner = "WILD-ROYAL-FLUSH";
                    prize = 100;
                    isNatural = false;
                    isWinner = true;
                };
                
                if (!(prize>15) && ( (pairs == 3 && numWildCards == 1) || (pairs == 1 && numWildCards == 2) || (pairs == 0 && numWildCards == 3) ) )
                {
                    winner = "FOUR-OF-A-KIND";
                    prize = 15;
                    isNatural = false;
                    isWinner = true;
                };
                if (!(prize > 5) && ((pairs == 1 && numWildCards == 1) || numWildCards == 2))
                {
                    winner = "THREE-OF-A-KIND";
                    prize = 5;
                    isNatural = false;
                    isWinner = true;
                };
                var wildStraight;
                wild == 14 ? wildStraight = 0 : wildStraight = 39;
                if (numWildCards == 2 && !wild == 14){wildStraight = 49};
                if (c <= wildStraight)
                {
                    for(x = 0; x < 5; x++){
                        if (cardsToCheck[x] == 14){cardsToCheck[x] = 1};
                    };
                };
                for(x = 0; x < 5; x++){
                    checkStraight[x] = cardsToCheck[x];
                };
                checkStraight.sort(sortNumber);
                var straight = 0;
                a = 5;
                do
                {
                    x = 5;
                    do
                    {
                        if (checkStraight[a - 1] - checkStraight[x - 1] <= 4 && checkStraight[a - 1] - checkStraight[x - 1] >= 1
                            && checkStraight[a - 1] != wild && checkStraight[x - 1] != wild){straight++};
                    } while (--x);
                } while (--a);
                
                if (c <= wildStraight)
                {
                    for(x = 0; x < 5; x++){
                        if(cardsToCheck[x] == 1){cardsToCheck[x] = 14};
                    };
                };
                var wildFlush = 0;
                for(a = 0; a < 4; a++)
                {
                    for(i = a + 1; i < 5; i++)
                    {
                        if(suitsToCheck[a] == suitsToCheck[i] && cardsToCheck[a] != wild && cardsToCheck[i] != wild){wildFlush++};
                    };
                };
                console.log("wildflush");
                console.log(wildFlush);
                console.log("cardsToCheck");
                console.log(cardsToCheck);
                console.log("suitsToCheck");
                console.log(suitsToCheck);
                if ((straight >= 6 && numWildCards == 1) || (straight == 3 && numWildCards == 2 ))
                {
                    if (!(prize>40)&&((wildFlush == 6 && numWildCards == 1) || (wildFlush == 3 && numWildCards == 2)))
                    {
                        winner = "STRAIGHT-FLUSH";
                        prize = 40;
                        isNatural = false;
                        isWinner = true;
                    };
                    if (!(prize>10))
                    {
                        winner = "STRAIGHT";
                        prize = 10;
                        isNatural = false;
                        isWinner = true;
                    };
                };
                if (!(prize>15)&&((wildFlush == 6 && numWildCards == 1) || (wildFlush == 3 && numWildCards == 2)))
                {
                    winner = "WILD-FLUSH";
                    prize = 15;
                    isNatural = false;
                    isWinner = true;
                };
                i = 5;
                var wildPair = 0;
                do
                {
                    if (cardsToCheck[i - 1] > 10 && cardsToCheck[i - 1] != wild && numWildCards == 1) {wildPair++};
                } while (--i);
                if (!(prize>0) && wildPair)
                {
                    winner = "WILD-PAIR";
                    prize = 0;
                    isNatural = false;
                    isWinner = true;
                };
            };
            
            //non wild checkers
            if (c <= 28) {
                for(i = 0; i < 5; i++){
                    if (cardsToCheck[i] == 14){cardsToCheck[i] = 1};
                };
            };
            for(i = 0; i < 5; i++){
                checkStraight[i] = cardsToCheck[i];
            };
            for(i = 0; i < 5; i++){
                if (cardsToCheck[i] == 1){cardsToCheck[i] = 14};
            };
            checkStraight.sort(sortNumber);
            if (checkStraight[0] - 4 == checkStraight[4] && checkStraight[1] - 3 == checkStraight[4] && checkStraight[2] - 2 == checkStraight[4] && checkStraight[3] - 1 == checkStraight[4])
            {
                if ((suitsToCheck[0]==suitsToCheck[1])&&(suitsToCheck[1]==suitsToCheck[2])&&(suitsToCheck[2]==suitsToCheck[3])&&(suitsToCheck[3]==suitsToCheck[4]))
                {
                    if (checkStraight[4] > 9 && bet == 25)
                    {
                        winner = "ROYAL-FLUSH";
                        prize = 10000;
                        isNatural = true;
                        isWinner = true;
                        //DO SOMETHING SPECIAL FOR ROYAL FLUSH.......
                        /////////////////////////////////////////////
                        /////////SOMETHING SPECIAL
                    };
                    if (!(prize > 2500) && checkStraight[4] > 9)
                    {
                        winner = "ROYAL-FLUSH";
                        prize = 2500;
                        isNatural = true;
                        isWinner = true;
                        //DO SOMETHING SPECIAL FOR ROYAL FLUSH.......
                        /////////////////////////////////////////////
                        /////////SOMETHING SPECIAL
                    };
                    if (!(prize>500))
                    {
                        winner = "STRAIGHT-FLUSH";
                        prize = 500;
                        isNatural = true;
                        isWinner = true;
                    };
                };
                if (!(prize>20))
                {
                    winner = "STRAIGHT";
                    prize = 20;
                    isNatural = true;
                    isWinner = true;
                };
            };
            if (!(prize>30) && (suitsToCheck[0] == suitsToCheck[1] && suitsToCheck[1] == suitsToCheck[2] && suitsToCheck[2] == suitsToCheck[3] && suitsToCheck[3] == suitsToCheck[4]))
            {
                winner = "FLUSH";
                prize = 30;
                isNatural = true;
                isWinner = true;
            };
            x = 0;
            var pairChecker = 0;
            pairs = 0;
            for(a = 0; a < 4; a++)
            {
                for(i = a + 1; i < 5; i++)
                {
                    cardsToCheck[a] == cardsToCheck[i] && cardsToCheck[a] != wild ? x = 1 : x = 0;
                    if (x == 1 && cardsToCheck[a] > 10){pairChecker++};
                    pairs = pairs + x;
                };
            };
            if (pairs)
            {
                if (!(prize > 150) && pairs == 6)
                {
                    winner = "FOUR-OF-A-KIND";
                    prize = 150;
                    isNatural = true;
                    isWinner = true;
                };
                if (!(prize > 45) && pairs == 4)
                {
                    winner = "FULL-HOUSE";
                    prize = 45;
                    isNatural = true;
                    isWinner = true;
                };
                if (!(prize > 10) && pairs == 3)
                {
                    winner = "THREE-OF-A-KIND";
                    prize = 10;
                    isNatural = true;
                    isWinner = true;
                };
                if (!(prize > 10) && pairs == 2)
                {
                    winner = "TWO-PAIR";
                    prize = 10;
                    isNatural = true;
                    isWinner = true;
                };
                if (!(prize>5) && !(winner === "THREE-OF-A-KIND") && pairChecker > 0)
                {
                    winner = "PAIR";
                    prize = 5;
                    isNatural = true;
                    isWinner = true;
                };
            };
            break;
            
            
        case false: //basic game check
            if (c <= 28) {
                for(i = 0; i < 5; i++){
                    if (cardsToCheck[i] == 14){cardsToCheck[i] = 1};
                };
            };
            for(i = 0; i < 5; i++){
                checkStraight[i] = cardsToCheck[i];
            };
            checkStraight.sort(sortNumber);
            for(i = 0; i < 5; i++){
                if (cardsToCheck[i] == 1){cardsToCheck[i] = 14};
            };
            if (checkStraight[0] - 4 == checkStraight[4] && checkStraight[1] - 3 == checkStraight[4] && checkStraight[2] - 2 == checkStraight[4] && checkStraight[3] - 1 == checkStraight[4])
            {
                if ((suitsToCheck[0]==suitsToCheck[1])&&(suitsToCheck[1]==suitsToCheck[2])&&(suitsToCheck[2]==suitsToCheck[3])&&(suitsToCheck[3]==suitsToCheck[4]))
                {
                    if (checkStraight[4] > 9 && bet == 25)
                    {
                        winner = "ROYAL-FLUSH";
                        prize = 16000;
                        isNatural = true;
                        isWinner = true;
                        //DO SOMETHING SPECIAL FOR ROYAL FLUSH.......
                        /////////////////////////////////////////////
                        /////////SOMETHING SPECIAL
                    };
                    if (!(prize > 4000) && checkStraight[4] > 9)
                    {
                        winner = "ROYAL-FLUSH";
                        prize = 4000;
                        isNatural = true;
                        isWinner = true;
                        //DO SOMETHING SPECIAL FOR ROYAL FLUSH.......
                        /////////////////////////////////////////////
                        /////////SOMETHING SPECIAL
                    };
                    if (!(prize > 450))
                    {
                        winner = "STRAIGHT-FLUSH";
                        prize = 450;
                        isNatural = true;
                        isWinner = true;
                    };
                };
                if (!(prize > 20))
                {
                    winner = "STRAIGHT";
                    prize = 20;
                    isNatural = true;
                    isWinner = true;
                };
            };
            if (!(prize>30) && (suitsToCheck[0] == suitsToCheck[1] && suitsToCheck[1] == suitsToCheck[2] && suitsToCheck[2] == suitsToCheck[3] && suitsToCheck[3] == suitsToCheck[4]))
            {
                winner = "FLUSH";
                prize = 30;
                isNatural = true;
                isWinner = true;
            };
            var pairChecker = 0;
            pairs = 0;
            for(a = 0; a < 5; a++)
            {
                for(i = a + 1; i < 5; i++)
                {
                    cardsToCheck[a] == cardsToCheck[i] && cardsToCheck[a] != wild ? x = 1 : x = 0;
                    if (x == 1 && cardsToCheck[a] > 10){pairChecker++};
                    pairs = pairs + x;
                };
            };
            console.log(cardsToCheck + "cn : cs" + suitsToCheck + "cs : pairs" + pairs);
            if (pairs){
                if (!(prize > 125) && pairs == 6)
                {
                    winner = "FOUR-OF-A-KIND";
                    prize = 125;
                    isNatural = true;
                    isWinner = true;
                };
                if (!(prize > 45) && pairs == 4)
                {
                    winner = "FULL-HOUSE";
                    prize = 45;
                    isNatural = true;
                    isWinner = true;
                };
                if (!(prize > 15) && pairs == 3)
                {
                    winner = "THREE-OF-A-KIND";
                    prize = 15;
                    isNatural = true;
                    isWinner = true;
                };
                if (!(prize > 10) && pairs == 2)
                {
                    winner = "TWO-PAIR";
                    prize = 10;
                    isNatural = true;
                    isWinner = true;
                };
                if (!(prize>5) && !(winner === "THREE-OF-A-KIND") && pairChecker > 0)
                {
                    winner = "PAIR";
                    prize = 5;
                    isNatural = true;
                    isWinner = true;
                };
            };
            break;
    };
    
    
    var _winner = {
    winner: winner,
    prize: prize,
    isNatural: isNatural,
    isWinner: isWinner
    }
    return _winner;
};


















WildngameAssistant.prototype.UpdateWinners = function(bestWinner) {
    var winner = bestWinner.winner,
    isNatural = bestWinner.isNatural,
    isWinner = bestWinner.isWinner;
    
    
    prize = bestWinner.prize;
    
    if (!isWinner){prize = -5 * difficulty; streak = 0;} else if (prize > 0) streak++;
    prize = prize * (bet/5);
    
    if (streak > 1) {
        var streakPrize = (prize * streak);
        prize += streakPrize;
        
        document.getElementById("streakInfo").style.visibility = "visible";
        document.getElementById("streakInfo").innerHTML = "Streak: " + streak + "\t|\tBase Prize: " + (prize-streakPrize) + "\t|\tBonus: +" + streakPrize + "\t|\tTotal Prize: +" + prize;
        
        
    }
    money = money + prize;
    
    
    document.getElementById("winnerInfo").innerHTML = winner + "\n+" + prize;
    if(doScale){
        //        scale(["winnerInfo"]);
    }
    
    //document.getElementById("winnerBar").style.visibility = "visible";
    this.showScore(this, prize, money);
    this.flashWinner();
    console.log(winner);
    //UPDATE STATS
    switch (playingWildnGame)
    {
        case false:
            switch(winner)
        {
            case "ROYAL-FLUSH":
                wildnGameStats.bgRYF++;
                wgStats[3]++;
                wgStats[17]++;
                break;
            case "STRAIGHT-FLUSH":
                wildnGameStats.bgSTF++;
                wgStats[4]++;
                wgStats[18]++;
                break;
            case "STRAIGHT":
                wildnGameStats.bgST++;
                wgStats[8]++;
                wgStats[22]++;
                break;
            case "FLUSH":
                wildnGameStats.bgFL++;
                wgStats[7]++;
                wgStats[21]++;
                break;
            case "FOUR-OF-A-KIND":
                wildnGameStats.bgFOAK++;
                wgStats[5]++;
                wgStats[19]++;
                break;
            case "FULL-HOUSE":
                wildnGameStats.bgFH++;
                wgStats[6]++;
                wgStats[20]++;
                break;
            case "THREE-OF-A-KIND":
                wildnGameStats.bgTOAK++;
                wgStats[9]++;
                wgStats[23]++;
                break;
            case "TWO-PAIR":
                wildnGameStats.bgTP++;
                wgStats[10]++;
                wgStats[24]++;
                break;
            case "PAIR":
                wildnGameStats.bgJOB++;
                wgStats[11]++;
                wgStats[25]++;
                break;
        };
            if (prize > 0)
            {
                wildnGameStats.bgTotalEarnings = wildnGameStats.bgTotalEarnings + prize;
                wgStats[1] = wgStats[1] + prize;
                wgStats[15] = wgStats[15] + prize;
                wildnGameStats.bgHandsWon++;
                wgStats[2]++;
                wgStats[16]++;
            } else {
                wildnGameStats.bgTotalLosses = wildnGameStats.bgTotalLosses - prize;
                wgStats[12] = wgStats[12] - prize;
                wgStats[26] = wgStats[26] - prize;
                wildnGameStats.bgHandsLost++;
                wgStats[13]++;
                wgStats[27]++;
            };
            wildnGameStats.bgHandsPlayed++;
            wgStats[0]++;
            wgStats[14]++;
            break;
        case true:
            switch(winner){
                case "ROYAL-FLUSH":
                    wildnGameStats.wgRYF++;
                    wgStats[31]++;
                    wgStats[55]++;
                    break;
                case "STRAIGHT-FLUSH":
                    if (isNatural) {
                        wildnGameStats.wgSTF++;
                        wgStats[32]++;
                        wgStats[56]++;
                    } else {
                        wildnGameStats.wgWSTF++;
                        wgStats[45]++;
                        wgStats[69]++;
                    };
                    break;
                case "STRAIGHT":
                    if (isNatural) {
                        wildnGameStats.wgST++;
                        wgStats[36]++;
                        wgStats[60]++;
                    } else {
                        wildnGameStats.wgWST++;
                        wgStats[49]++;
                        wgStats[73]++;
                    };
                    break;
                case "FLUSH":
                    if (isNatural) {
                        wildnGameStats.wgFL++;
                        wgStats[35]++;
                        wgStats[59]++;
                    } else {
                        wildnGameStats.wgWFL++;
                        wgStats[43]++;
                        wgStats[67]++;
                    };
                    break;
                case "FOUR-OF-A-KIND":
                    if (isNatural) {
                        wildnGameStats.wgFOAK++;
                        wgStats[33]++;
                        wgStats[57]++;
                    } else {
                        wildnGameStats.wgWFOAK++;
                        wgStats[46]++;
                        wgStats[70]++;
                    };
                    break;
                case "FULL-HOUSE":
                    if (isNatural) {
                        wildnGameStats.wgFH++;
                        wgStats[34]++;
                        wgStats[58]++;
                    } else {
                        wildnGameStats.wgWFH++;
                        wgStats[47]++;
                        wgStats[71]++;
                    };
                    break;
                case "THREE-OF-A-KIND":
                    if (isNatural) {
                        wildnGameStats.wgTOAK++;
                        wgStats[37]++;
                        wgStats[61]++;
                    } else {
                        wildnGameStats.wgWTOAK++;
                        wgStats[50]++;
                        wgStats[74]++;
                    };
                    break;
                case "TWO-PAIR":
                    wildnGameStats.wgTP++;
                    wgStats[38]++;
                    wgStats[62]++;
                    break;
                case "PAIR":
                    wildnGameStats.wgJOB++;
                    wgStats[39]++;
                    wgStats[63]++;
                    break;
                case "WILD-ROYAL-FLUSH":
                    wildnGameStats.wgWFL++;
                    wgStats[43]++;
                    wgStats[67]++;
                    break;
                case "WILD-FLUSH":
                    wildnGameStats.wgWF++;
                    wgStats[48]++;
                    wgStats[72]++;
                    break;
                case "WILD-PAIR":
                    wildnGameStats.wgWP++;
                    wgStats[51]++;
                    wgStats[75]++;
                    break;
                case "FOUR-WILD":
                    wildnGameStats.wgFWC++;
                    wgStats[42]++;
                    wgStats[66]++;
                    break;
                case "FIVE-OF-A-KIND":
                    wildnGameStats.wgFVAK++;
                    wgStats[44]++;
                    wgStats[68]++;
                    break;
            };
            if (prize>=0){
                wildnGameStats.wgTotalEarnings = wildnGameStats.wgTotalEarnings + prize;
                wgStats[29] = wgStats[29] + prize;
                wgStats[53] = wgStats[53] + prize;
                wildnGameStats.wgHandsWon++;
                wgStats[30]++;
                wgStats[54]++;
            } else if (prize<0){
                wildnGameStats.wgTotalLosses = wildnGameStats.wgTotalLosses - prize;
                wgStats[40] = wgStats[40] - prize;
                wgStats[64] = wgStats[64] - prize;
                wildnGameStats.wgHandsLost++;
                wgStats[41]++;
                wgStats[65]++;
            };
            wildnGameStats.wgHandsPlayed++;
            wgStats[28]++;
            wgStats[52]++;
            break;
    };
    localStorage["wildnGameStats"] = JSON.stringify(wildnGameStats);
    stage.saveGame();
    //cupcake.updateCupcake('wildnGameStats', wildnGameStats);
    if(!canSubmit){
        nextSubmission--;
        if(nextSubmission === 0){
            canSubmit = true;
            //Mojo.Controller.errorDialog("You may now submit your score to the leaderboards!", this.controller.window);
        }
    }
}
