/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "game",
	published: {
		players: [],
		scores: [0, 0, 0],
		pegs: [
			[ 0, 0 ],
			[ 0, 0 ],
			[ 0, 0 ]
		],
		pegStatus: ["_", "_", "_"],
		third: false,
		holding: false,
		history: [],
		winner: false,
		queue: [],
		animating: false,
		undos: 0,
		shift: [ -20, -10 ]
	},
	style: "padding: 0px !important;",
	events: {
		
	},
	components: [
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				//{ content: "game", classes: "header" },
				{ kind: "FittableColumns", fit: true, components: [
					
					/*
					 * 
					 */
					
					{ kind: "Scroller", thumb: false, strategyKind: "TouchScrollStrategy", fit: true, components: [
						{ name: "message" },
						{ name: "game", style: "text-align: center;", components: [
							{ name: "doload", classes: "bigger", content: "cribbage game", showing: false },
							
							
							
							{ name: "players", kind: "onyx.RadioGroup", classes: "plyrs" },
							
							
							/*
							 * 
							 */
							
							//{ style: "width: 1000px; margin-left: auto; margin-right: auto; overflow: visible;", components: [
								/*{ style: "background-color: red; width: 400px;" },
								{ style: "background-color: blue;", fit: true, components: [*/
								{ kind: "Scroller", strategyKind: "TranslateScrollStrategy", thumb: false, vertical: "hidden", fit: true, components: [
									{ style: "width: 1000px; margin-left: auto; margin-right: auto; overflow: visible;", components: [
									{ name: "board", classes: "board", components: [
										
										{ name: "bronze_", kind: "Image", src: "img/peg_bronze.png", classes: "peg" },
										{ name: "bronze", kind: "Image", src: "img/peg_bronze.png", classes: "peg" },
										
										{ name: "silver_", kind: "Image", src: "img/peg_silver.png", classes: "peg" },
										{ name: "silver", kind: "Image", src: "img/peg_silver.png", classes: "peg" },
										
										{ name: "gold_", kind: "Image", src: "img/peg_gold.png", classes: "peg" },
										{ name: "gold", kind: "Image", src: "img/peg_gold.png", classes: "peg" },
										
										{ kind: "Image", classes: "boardimg", src: "img/board.png" },
										
									]},
									]},
								]},
								/*]},
								{ style: "background-color: red; width: 200px;" },*/
							//]},
							
							/*
							 * 
							 */
							
							{ tag: "table", classes: "bigger", style: "margin-left: auto; margin-right: auto;", components: [
								
								{ tag: "tr", ontap: "add", onmousedown: "press", onmouseover: "hover", onmouseup: "unhold", onmouseout: "unhold", style: "color: forestgreen;", components: [
									{ name: "bank", tag: "td", content: 0, attributes: { rowspan : 3 }, style: "color: white; width: 68px;" },
									{ tag: "td", content: "1" },
									{ tag: "td", content: "2" },
									{ tag: "td", content: "3" },
									{ tag: "td", content: "5" },
									{ tag: "td", content: "7" },
									{ tag: "td", content: "MOVE", attributes: { rowspan : 2 }, style: "color: black; width: 136px;" }
								]},
								{ tag: "tr", ontap: "subtract", onmousedown: "press", onmouseover: "hover", onmouseup: "unhold", onmouseout: "unhold", style: "color: red;", components: [
									{ tag: "td", content: "1" },
									{ tag: "td", content: "2" },
									{ tag: "td", content: "3" },
									{ tag: "td", content: "5" },
									{ tag: "td", content: "7" }
								]}
							]},
							
							/*{ tag: "table", classes: "bigger", style: "margin-left: auto; margin-right: auto;", components: [
								{ tag: "tr", components: [
									{ tag: "td", content: "CURRENT MOVE", attributes: { rowspan : 2 }, style: "color: black;" }
								]},
								{ tag: "tr", components: [
									{ tag: "td", content: "JC +8", attributes: { rowspan : 2 }, style: "color: black;" }
								]}
							]},*/
							
							
							
						]}
						
					]},
					{ kind: "FittableRows", style: "width: 160px;", components: [
						{ kind: "FittableColumns", components: [
							{ fit: true, content: "history", classes: "bigger" },
							{ style: "height: 32px; width: 32px; margin-top: 7px !important;", name: "undo", kind: "onyx.IconButton", src: "img/icons/menu-icon-undo.png", ontap: "undo" },
							
						]},
						//history
						{ name: "history", kind: "List", fit: true, classes: "border", onSetupItem: "loadhist", count: 0, components: [
							{ name: "histitem" }
						]}
					]}
					
					/*
					 * 
					 */
					
				]}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.set();
		this.fixPegs();
	},
	set: function(){
		var game = this.fetch();
		if (game) {
			this.$.message.setShowing(false);
			this.$.doload.setContent(
				this.players[0] + " vs " + 
				this.players[1] + (this.players[2] != true ? (" vs " + this.players[2]) : "")
			);
			this.$.game.setShowing(true);
		} else {
			this.$.message.setShowing(true);
			this.$.message.setContent("there is no game");
			this.$.game.setShowing(false);
		}
		
		this.$.history.setCount(this.history.length);
		this.$.history.refresh();
	},
	fetch: function(){
		return this.players.length > 0;
	},
	save: function(){
		if(!this.players.length || this.animating || this.winner){
			console.log("initiating advanced dynamic save protection...");
			console.error("overriding save");
			return;
		}
		
		var game = clone({
			players: this.players,
			scores: this.scores,
			history: this.history
		});
		console.log("saving..", game);
		localStorage["cribbage-game"] = JSON.stringify(game);
		
		console.log(localStorage["cribbage-game"])
	},
	refresh: function(){
		this.set();
	},
	reset: function(){
		this.scores = [0, 0, 0];
		this.players = [];
		this.history = [];
		this.pegs = [
			[ 0, 0 ],
			[ 0, 0 ],
			[ 0, 0 ]
		];
		this.$.players.destroyComponents();
		for(var x in this.$.players.children){
			this.$.players.children[0].destroy();
		}
		try{this.$.players.children[0].destroy();}catch(e){}
		this.refresh();
		this.winner = false;
	},
	load: function(){
		this.third = (this.players[2] != true);
		
		var p1 = { content: this.players[0], active: true, classes: "plyr", owner: this, components: [
			{ kind: "Image", src: "img/peg_silver.png", classes: "" },
			{ content: this.players[0] }
		]}
		var p2 = { content: this.players[1], classes: "plyr", owner: this, components: [
			{ kind: "Image", src: "img/peg_gold.png", classes: "" },
			{ content: this.players[1] }
		]}
		var p3 = this.third ? { content: this.players[2], classes: "plyr", owner: this, components: [
			{ kind: "Image", src: "img/peg_bronze.png", classes: "" },
			{ content: this.players[2] }
		]} : null;
		
		var components = [p1, p2];
		
		if (p3 != null) components.push(p3);
		
		this.$.players.createComponents(components);
		
		this.refresh();
		this.render();
	},
	add: function(inSender, inEvent){
		if (this.winner) return;
		//if(!this.holding) return;
		
		this.unhold(inSender, inEvent);
		
		var val = parseInt(inEvent.target.innerText);
		console.log("adding", val);
		
		if( !(val <= 0) && !(val > 0) ){
			this.move();
			return;
		}
		
		this.$.bank.content += val;
		
		if (this.$.bank.content > 29){
			this.$.bank.content = 29;
		}
		
		switch (this.$.bank.content){
			case 27:
			case 26:
			case 25:
				this.$.bank.content = 28;
				break;
			case 19:
				this.$.bank.content = 20;
				break;
		}
		
		this.render();
	},
	subtract: function(inSender, inEvent){
		if (this.winner) return;
		//if (!this.holding) return;
		
		this.unhold(inSender, inEvent);
		
		var val = parseInt(inEvent.target.innerText);
		console.log("subtracting", val);
		
		if ( this.$.bank.content - val < 0 ) return;
		
		this.$.bank.content -= val;
		
		if (this.$.bank.content < -29){
			this.$.bank.content = -29;
		}
		
		switch (this.$.bank.content){
			case 27:
			case 26:
			case 25:
				this.$.bank.content = 24;
				break;
			case 19:
				this.$.bank.content = 18;
				break;
		}
		
		this.render();
	},
	
	move: function(){
		if (this.winner) return;
		
		if (this.$.bank.content == 0) return;
		this.addHistItem({
			player: this.$.players.getActive().content,
			value: this.$.bank.content
		});
		this.$.bank.content = 0;
		this.render();
	},
	crawl: function(history){
		for( var x = history.length - 1; x >= 0; x-- ) {
			
			this.addHistItem(history[x]);
			
		}
	},
	undo: function(inSender, inEvent){
		
		if (this.winner) return;
		
		if ( this.history.length == 0 ) return;
		
		if ( this.animating ) {
			this.undos++;
			return;
		}
		
		var historyItem = clone(this.history[0]);
		
		this.history.splice(0, 1);
		this.$.history.setCount(this.history.length);
		this.$.history.refresh();
		
		var playerIndex = this.getPlayerIndex(historyItem.player);
		
		
		
		/*
		 * this is tricky, we gotta move it to the LAST history item for this player only
		 * if a history item doesn't exist, we put it back on the original peg
		 * 
		 */
		
		var prevmove = false;
		
		for ( var x in this.history ){
			if ( this.history[x].player == historyItem.player ) {
				prevmove = this.history[x];
				break;
			}
		}
		
		console.log("BEFORE UNDO: ", clone(this.pegs[playerIndex]))
		
		this.pegs[playerIndex].reverse();
		
		console.log("last move", historyItem, "move before that", prevmove)
		
		
		
		if ( prevmove ) {
			
			this.movePeg(playerIndex, -historyItem.value);
			
			this.pegs[playerIndex][0] -= historyItem.value;
			
			var that = this;
			
			setTimeout(function(){
				that.pegStatus[playerIndex] = that.pegStatus[playerIndex] == "_" ? "" : "_";
			
				that.movePeg(playerIndex, -prevmove.value);
				
				that.pegs[playerIndex][0] -= prevmove.value;
				
				console.log("AFTER UNDO: ", clone(that.pegs[playerIndex]))
				
			}, 100, that, prevmove, playerIndex);
			
		} else {
			// move it to start
			this.pegStatus[playerIndex] = this.pegStatus[playerIndex] == "_" ? "" : "_";
			this.movePeg(playerIndex, -historyItem.value - 1);
			this.pegs[playerIndex][0] -= (historyItem.value + 1);
			
			this.pegs[playerIndex].reverse();
			
			console.log("AFTER UNDO: ", clone(this.pegs[playerIndex]))
		}
		
		this.scores[playerIndex] = this.scores[playerIndex] - historyItem.value;
		
		this.$.board.render();
	},
	addHistItem: function(historyItem, force){
		
		if ( force == null ) force = false;
		
		if ( this.animating && !force ) {
			this.queue.push(historyItem);
			return;
		}
		
		this.history.splice(0, 0, historyItem);
		this.$.history.setCount(this.history.length);
		this.$.history.refresh();
		
		var playerIndex = this.getPlayerIndex(historyItem.player);
		
		/*
		 * animation
		 * 
		 */
		
		var that = this;
		
		var min = this.pegs[playerIndex][0];
		var max = this.scores[playerIndex] + historyItem.value;
		
		console.log("moving from", min, "to", max)
		
		var t = 0;
		
		for( var x = min; x < max; x++ ) {
			console.log(x + "", this.pegs[playerIndex][0], clone(this.pegs))
			setTimeout(function(that, x, playerIndex){
				that.movePeg(playerIndex, 1);
				that.pegs[playerIndex][0] += 1;
				
				if ( that.pegs[playerIndex][0] >= 121 ){
					that.pegs[playerIndex][0] = 121
				}
				
			}, 50 * t, that, x, playerIndex);
			t++;
		}
		
		setTimeout(function(that){
			that.pegStatus[playerIndex] = that.pegStatus[playerIndex] == "_" ? "" : "_";
			
			that.scores[playerIndex] = that.pegs[playerIndex][0];
			
			if ( that.pegs[playerIndex][0] == 121 ){
				console.log("winner!")
				that.wegotawinner(playerIndex);
			}
			
			console.log("updated...", that.pegs[playerIndex][0])
			
			// take the back peg and move it to the front of the array
			that.pegs[playerIndex].reverse();
			
			if (that.queue.length > 0 ){
				that.addHistItem(that.queue.shift(), true);
			} else {
				
				that.animating = false;
				
				that.save();
				
				if (that.undos > 0 ){
					for( var x = 0; x < that.undos; x++ ) {
						that.undo();
						that.undos--;
					}
				}
			}
			
		}, 50 * ( max - min ), that);
		
		this.animating = true;
		
		/*
		 * end animation
		 */
		
		/*this.movePeg(playerIndex, historyItem.value);
		
		this.pegStatus[playerIndex] = this.pegStatus[playerIndex] == "_" ? "" : "_";
		
		this.scores[playerIndex] = this.scores[playerIndex] + historyItem.value;
		
		// take the back peg and move it to the front of the array
		this.pegs[playerIndex].reverse();*/
		
	},
	getPlayerIndex: function(playerString){
		for(var x in this.players){
			console.log(playerString, x, this.players, this.players[x])
			if(playerString == this.players[x]){
				
				var order = [1, 2, 0];
				
				return order[x];
			}
		}
		return 0;
	},
	loadhist: function(inSender, inEvent){
		var index = inEvent.index;
		
		var h = this.history[index];
		
		this.$.histitem.setContent(h.player + ": " + h.value);
		
	},
	
	release: function(inSender, inEvent){
		if (inEvent.originator.name == "bank") return;
		
		inEvent.originator.addClass("holding");
		inEvent.originator.removeClass("hovering");
		this.holding = false;
	},
	press: function(inSender, inEvent){
		if (inEvent.originator.name == "bank") return;
		
		inEvent.originator.removeClass("holding");
		inEvent.originator.addClass("hovering");
		this.holding = true;
	},
	hover: function(inSender, inEvent){
		if (inEvent.originator.name == "bank") return;
		
		inEvent.originator.addClass("holding");
		inEvent.originator.removeClass("hovering");
		this.holding = true;
	},
	unhold: function(inSender, inEvent){
		if (inEvent.originator.name == "bank") return;
		
		inEvent.originator.removeClass("holding");
		inEvent.originator.removeClass("hovering");
		this.holding = false;
	},
	
	fixPegs: function(){
		/*
		 * left: 929px;
		 * top: 288px;
		 * 
		 * bottom-right most peg
		 * 
		 * 914
		 * 288
		 * 
		 */
		
		this.$.silver.applyStyle("margin-left", 900 + this.shift[0] + "px");
		this.$.silver.applyStyle("margin-top", 274 + this.shift[1] + "px");
		
		this.$.silver_.applyStyle("margin-left", 915 + this.shift[0] + "px");
		this.$.silver_.applyStyle("margin-top", 274 + this.shift[1] + "px");
		
		/*
		 * next one up: 
		 * 267px
		 * 
		 */
		
		this.$.gold.applyStyle("margin-left", 900 + this.shift[0] + "px");
		this.$.gold.applyStyle("margin-top", 252 + this.shift[1] + "px");
		
		this.$.gold_.applyStyle("margin-left", 915 + this.shift[0] + "px");
		this.$.gold_.applyStyle("margin-top", 252 + this.shift[1] + "px");
		
		/*
		 * according to math
		 * next one up:
		 * 246px
		 * 
		 */
		
		this.$.bronze.applyStyle("margin-left", 900 + this.shift[0] + "px");
		this.$.bronze.applyStyle("margin-top", 231 + this.shift[1] + "px");
		
		this.$.bronze_.applyStyle("margin-left", 915 + this.shift[0] + "px");
		this.$.bronze_.applyStyle("margin-top", 231 + this.shift[1] + "px");
	},
	movePeg: function(peg, moves){
		
		var cp = this.pegs[peg][0];
		var fp = cp + moves;
		
		var turning = this.isInStraight(cp);
		var straight = this.isInStraight(fp);
		
		// 15 in between individual spaces, top and bottom
		// 41 for a gap
		
		// hole 1 straight 1 is 859px, 231px
		// hole 1 reversed straight 2 is ( 7 gaps * 41 + ( 35 moves - 7 gaps ) spaces * 15 ), 231px + 41 straight + 15 * 2 + 41 straight + 15 * 2
		// hole 1 straight 3 is 859px, 231px + 41 straight
		
		var s1 = [859, 231];
		var s2 = [859 + this.gapit(-1, 6, 28), 231 - 41 - 15 * 2 - 41 - 15 * 2 - 15 * 2];
		var s3 = [859, 231 - 41];
		
		if ( fp >= 121 ) {
			/*
			 * WINNER
			 */
			
			fp = 121;
			s1[1] = s2[1] = s3[1];
		}
		
		var newCoords;
		
		var move = fp;
		
		newCoords = [0, 0];
		
		
		
		if ( straight ) {
			// easy. not turning, and won't turn!
			
			var direction = 1;
			
			var whichpeg = 0;
			
			switch (straight) {
				case 1:
					direction = -1;
					newCoords[0] = s1[0];
					var mody = 0;
					if (peg == 2) {
						mody = 21;
					} else if (peg == 1) {
						mody = 42;
					}
					newCoords[1] = s1[1] + mody;
					whichpeg = fp - 1;
					break;
				case 2:
					direction = 1;
					newCoords[0] = s2[0];
					var mody = 0;
					if (peg == 0) {
						mody = 42;
					} else if (peg == 2) {
						mody = 21;
					}
					newCoords[1] = s2[1] + mody;
					whichpeg = fp - 46;
					break;
				case 3:
					direction = -1;
					newCoords[0] = s3[0];
					var mody = -2;
					if (peg == 2) {
						mody = -22;
					} else if (peg == 0) {
						mody = -44;
					}
					newCoords[1] = s3[1] + mody;
					if ( fp == 121 ) {
						newCoords[1] = s3[1] - 23;
					}
					whichpeg = fp - 86;
					break;
			}
			
			var x = newCoords[0];
			
			var gaps = Math.floor(whichpeg / 5);
			var spaces = whichpeg - gaps;
			
			x = x + this.gapit(direction, gaps, spaces);
			
			newCoords[0] = x;
			
			//var y = newCoords[y];
			
		} else {
			// gotta turn this shit around the circle. FAAAAAAAACK.
			
			/*
			 * need three to four things:
			 * 1. origin of the circle
			 * 2. diameter of the circle
			 * 3. angle of position required
			 * 
			 */
			var origin, diameter, radius, angle;
			
			var turn = this.findTurn(fp);
			
			var whichpeg = 0;
			
			var angShift = 270;
			
			var angMult = 1;
			
			var angMod = 0;
			
			switch (turn) {
				case 1:
					whichpeg = fp - 36;
					
					if ( whichpeg >= 5 ) {
						angShift = 180;
					} else {
						angShift = 90;
					}
					origin = [162, 167];
					
					switch (whichpeg) {
						case 0:
							angMod = 5;
							break;
						case 1:
							angMod = -1;
							origin[0] += 3;
							break;
						case 2:
							angMod = 5;
							origin[0] += 3;
							break;
						case 3:
							angMod = 12;
							origin[0] += 5;
							origin[1] += 10;
							break;
						case 4:
							angMod = 10;
							origin[1] += 7;
							break;
						///////////////////////////////////////////////////////
						case 5:
							angMod = 8;
							origin[1] -= 16;
							origin[0] += 4;
							break;
						case 6:
							angMod = -7;
							origin[1] -= 2;
							break;
						case 7:
							angMod = 10;
							origin[1] += 2;
							break;
						case 8:
							angMod = 12;
							origin[1] += 2;
							break;
						case 9:
							angMod = 15;
							origin[0] -= 4;
							break;
					}
					
					diameter = [129, 215, 172];
					break;
				case 2:
					whichpeg = fp - 81;
					console.log("whichpeg", whichpeg);
					origin = [895, 123];
					switch (whichpeg) {
						case 0:
							angMod = 7.5;
							origin[1] -= 5;
							break;
						case 1:
							angMod = 2;
							break;
						case 2:
							angMod = 5;
							origin[0] -= 2;
							break;
						case 3:
							angMod = 11;
							break;
						case 4:
							angMod = 16.5;
							origin[1] += 5;
							break;
					}
					angMult = 2;
					
					diameter = [36, 118, 75];
					break;
			}
			
			radius = diameter[peg] / 2;
			
			switch (whichpeg) {
				case 0:
				case 5:
					angle = (10 - angMod/1.1) * angMult + angShift;
					break;
				case 1:
				case 6:
					angle = (25 - angMod/1.1) * angMult + angShift;
					break;
				case 2:
				case 7:
					angle = (40 + angMod) * angMult + angShift;
					break;
				case 3:
				case 8:
					angle = (55 + angMod) * angMult + angShift;
					break;
				case 4:
				case 9:
					angle = (70 + angMod*1.1) * angMult + angShift;
					break;
			}
			
			angle = angle * (Math.PI / 180);
			
			X = radius * Math.cos(angle);
			Y = radius * Math.sin(angle);
			
			console.log("CIRCLE TEST: ", X, Y, radius, angle);
			
			newCoords[0] = origin[0] + X;
			newCoords[1] = origin[1] + Y;
			
			//newCoords = clone(origin);
			
		}
		
		var color = this.getColor(peg);
		
		var pegg = this.$[color + this.pegStatus[peg]];
		
		console.log("moving", peg, color, "this many", moves, "spaces to coord", newCoords);
		
		pegg.applyStyle("margin-left", newCoords[0] + this.shift[0] + "px");
		pegg.applyStyle("margin-top", newCoords[1] + this.shift[1] + "px");
		
	},
	gapit: function(d, g, s){
		return ( d * ( 41 * g + 15 * s ) );
	},
	findTurn: function(score){
		if (score <=45) return 1;
		
		return 2;
	},
	isInStraight: function(score){
		if (score <= 35) return 1;
		
		if ( score > 45 && score <= 80) return 2;
		
		if ( score > 85 ) return 3;
		
		return false;
	},
	getColor: function(peg){
		switch (parseInt(peg)) {
			case 0:
				return "bronze";
				break;
			case 1:
				return "silver";
				break;
			case 2:
				return "gold";
				break;
		}
	},
	wegotawinner: function(who){
		if (this.winner) return;
		/*
		 * game is over
		 * somebody won the freakn game
		 * 
		 */
		
		this.winner = winnername = this.players[who - 1];
		
		// since we can't load a won game, we've got to delete the game
		localStorage["cribbage-game"] = null;
		
		alert("winner!!!! " + winnername + " won.", this);
		
		var ps = this.$.players;
		
		var w = ps.children[who - 1];
		
		w.applyStyle("background-color", this.getColor(who));
		w.applyStyle("border-color", this.getColor(who) + "!important");
		
		var stats = {
			players: this.players,
			scores: [this.scores[1], this.scores[2], this.scores[0]]
		}
		
		this.bubble("updatestats", clone(stats));
	}
});

function clone (obj){
	obj = JSON.stringify(obj);
	return JSON.parse(obj);
}
