Matchup = function(team1, team2, max) {
	if(team1 == null)
		team1 = ["-", " ", "user1"];
	if(team2 == null)
		team2 = ["-", " ", "user1"];
	var matchup = {
		games : [],
		max : max,
		limit : Math.round(max / 2),
		status : "In Progress",
		winner : null,
		current : 0,
		home : {
			seed : team1[0],
			team : team1[1],
			user : team1[2],
			wins : 0
		},
		away : {
			seed : team2[0],
			team : team2[1],
			user : team2[2],
			wins : 0
		}
	}
	for(var i = 0; i < max; i++) {
		matchup.games.push(new Game(team1, team2));
	}
	return matchup;
}
Game = function(team1, team2) {
	if(team1 == null)
		team1 = ["-", " ", "user1"];
	if(team2 == null)
		team2 = ["-", " ", "user1"];
	var game = {
		home : {
			seed : team1[0],
			team : team1[1],
			user : team1[2],
			score : 0
		},
		away : {
			seed : team2[0],
			team : team2[1],
			user : team2[2],
			score : 0
		},
		played : false,
		overtime : false,
		emptynet : false,
		winner : null
	}
	return game;
}
shuffle = function(o) {//v1.0
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};
calculateWins = function(user, matchups){
	var wins = 0;
	for ( var round in matchups ){
		for ( var conference in matchups[round] ) {
			for ( var game in matchups[round][conference] ){
				
				var g = matchups[round][conference][game];
				
				if ( g.status != "Complete" ) continue;
				
				if ( g[g.winner].user == user ) wins++;
				
			}
		}
	}
	return wins;
}
function rs(string){
	string = string.replace(/\s/g, "");
	return string;
}
