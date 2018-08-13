initCareerMode = function() {
    GAME = JSON.stringify(localStorage["game"]);
    if (typeof GAME.careerMode == "undefined")
        initCareerModeStorage();
}
initCareerModeStorage = function() {
    var _game = {
        
        careerMode: {
            rank: 0,
            unlockFiveCardMode: false,
            unlockSixCardMode: false,
            unlockWildCardMode: false,
            completedInitiation: false
        },
        missions: [],
        timeAttack:{
            highScores: {
                fiveCard: [0,0,0,0,0],
                sixCard: [0,0,0,0,0]
            }
        }
    };
    
    var _missionTemplate = {
        title: "",
        objective: "",
        timeRestraint: 0, //unlimited
        wildCards: false,
        numCards: 5,
        streakReq: 0
    };
    
    /*
    var _m = _missionTemplate;
    _m.title = "";
    _m.objective = "";
    _m.timeRestraint = 0;
    _m.wildCards = false;
    _m.numCards = 5;
    _m.streakReq = 0;
     */
    
    var _m = _missionTemplate;
    _m.title = "Welcome! Thank you for buying Streaks!";
    _m.objective = "In order to unlock your first game mode, you must first complete your very first mission! Gain 500 points AND earn a streak of 3 wins in a row to advance!!!";
    _m.timeRestraint = 0;
    _m.wildCards = false;
    _m.numCards = 5;
    _m.streakReq = 3;
}

returnToGame = function() {
    swapScene("streaks");
}
