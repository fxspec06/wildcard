/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */

document.onselectstart = function(e){return false}

appvers = "1.0.0";
plus = true;
if(enyo.fetchAppInfo){
	appvers = enyo.fetchAppInfo.version;
	appid = enyo.fetchAppInfo.id;
	if ( appid.search("plus") >= 0 ) plus = true;
		else plus = false;
}

enyo.kind({
	name: "CribbageBoard",
	kind: "FittableRows",
	flex: 1,
	fit: true,
	style: "",
	published: {
		menu: ["new", "load", "stats", "tips", "about"],
		layt: 0,
		numLayts: 3,
		boxes: ["topBox", "bottomBox"],
		activeBox: "topBox",
		inGame: false
	},
	components: [
		{ name: "toolbar", kind: "onyx.Toolbar", components: [
			{ content: "cribbage board+" },
			
			
			//{ name: "save", kind: "onyx.IconButton", src: "img/icons/menu-icon-save.png", ontap: "initiateSave", style: "float:right", showing: false },
			//{ name: "create", kind: "onyx.IconButton", src: "img/icons/menu-icon-new.png", ontap: "createTournament", style: "float:right" },
			//{ name: "load", kind: "onyx.IconButton", src: "img/icons/menu-icon-search.png", ontap: "loadTournament", style: "float:right" },
			//{ name: "helpIcon", kind: "onyx.IconButton", src: "img/icons/menu-icon-help.png", ontap: "displayHelp", style: "float:right" },
			
			
		]},
		{ kind: "FittableColumns", onnew: "donew", load: "doload", onplay: "doplay", updatestats: "updatestats", fit: true, components: [
			{ name: "menu", style:"width:70px;", kind: "List", onSetupItem: "loadMenu", count: 5, components: [
				{ name: "menuItem", ontap: "choose" }
			]},
			{ layoutKind: "FittableRowsLayout", fit: true, components: [
				
				{ name: "topBox", kind: "panelsExt", ontap: "setActive", active: true, components: [
					
					{ kind: "new" },
			        { kind: "load" },
			        { kind: "stats" },
			        { kind: "tips" },
			        { kind: "about" },
			        { kind: "make" },
			        { kind: "game" }
			        
				]},
				{ name: "bottomBox", kind: "panelsExt", ontap: "setActive", index: 1, showing: false, components: [
					
					{ kind: "new" },
			        { kind: "load" },
			        { kind: "stats" },
			        { kind: "tips" },
			        { kind: "about" },
			        { kind: "make" },
			        { kind: "game" }
			        
				]}
				
			]}
		]},
		{ kind: "onyx.Toolbar", components: [
			
			
			{ name: "layout", kind: "onyx.IconButton", src: "img/layout_icon.png", ontap: "changeLayout", onhold: "hidehistory", style: "float:left" },
			
			//{ name: "right", kind: "onyx.IconButton", src: "img/icons/menu-icon-forward.png", onmousedown: "right", onmouseup: "stop", style: "float:right" },
			//{ name: "left", kind: "onyx.IconButton", src: "img/icons/menu-icon-back.png", onmousedown: "left", onmouseup: "stop", style: "float:left" },
			
			
			
			
			
			//{ name: "clear", kind: "onyx.Button", content: "Clear All Tournaments", onclick: "clear" }
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.changeLayout();
	},
	loadMenu: function(inSender, inEvent) {
		
		var index = inEvent.index;
		
		this.$.menuItem.setContent(this.menu[index]);
	},
	choose: function(inSender, inEvent){
		var swap = false;
		
		for(var x in this.boxes){
			
			this.$[this.boxes[x]].children[2].refresh();
			
			var chkindx = this.$[this.boxes[x]].index;
			if (inEvent.index == chkindx && this.$[this.activeBox].index != 6){
				this.$[this.boxes[x]].setIndex(this.$[this.activeBox].index);
				break;
			} else if (this.activeBox != this.boxes[x] && this.$[this.activeBox].index == 6){
				this.$[this.boxes[x]].setIndex(this.$[this.activeBox].index);
				this.$[this.activeBox].children[6].save();
				var la = this.activeBox;
				this.activeBox = this.boxes[x];
				this.doload();
				this.setActive(this.$[la]);
				break;
			}
		}
		this.$[this.activeBox].setIndex(inEvent.index);
	},
	changeLayout: function(inSender, inEvent){
		if (!this.inGame && inSender != null) return;
		this.layt++;
		
		if (this.layt > this.numLayts) this.layt = 1;
		
		for(var x in this.boxes){
			this.$[this.boxes[x]].setShowing(false);
		}
		this.$.topBox.applyStyle("height", "50%");
		this.$.bottomBox.applyStyle("height", "50%");
		
		switch(this.layt){
			case 1:
				this.$[this.boxes[0]].setShowing(true);
				this.$[this.boxes[0]].applyStyle("height", "100%");
				this.$[this.boxes[0]].setActive(true);
				this.activeBox = this.boxes[0];
				break;
			case 2:
				this.$[this.boxes[1]].setShowing(true);
				this.$[this.boxes[1]].applyStyle("height", "100%");
				this.$[this.boxes[0]].setActive(false);
				this.$[this.boxes[1]].setActive(true);
				this.activeBox = this.boxes[1];
				break;
			case 3:
				this.$.topBox.setShowing(true);
				this.$.bottomBox.setShowing(true);
				break;
		}
		this.render();
	},
	setActive: function(inSender, inEvent){
		for(var x in this.boxes){
			this.$[this.boxes[x]].setActive(false);
		}
		inSender.setActive(true);
		this.activeBox = inSender.name;
		
	},
	doload: function(inSender, inMessage){
		console.log("loading..");
		var game = JSON.parse(localStorage["cribbage-game"]);
		
		if(!game) return;
		
		console.log(game);
		
		for(var x in this.boxes){
			if(this.$[this.boxes[x]].index == 6 && (this.boxes[x] == this.activeBox || inSender != null) ){
				this.setActive(this.$[this.boxes[x]]);
			}
		}
		
		this.doplay(null, game.players);
		
		//this.$[this.activeBox].children[5].setScores(game.scores);
		
		//this.$[this.activeBox].children[5].setHistory(game.history);
		
		this.$[this.activeBox].children[6].refresh();
		
		//this.$[this.activeBox].children[5].save();
		
		this.$[this.activeBox].children[6].crawl(game.history);
		
	},
	donew: function(inSender, inMessage){
		console.log("new");
		this.$[this.activeBox].setIndex(5);
		this.$[this.activeBox].children[5].reset();
		
	},
	doplay: function(inSender, inMessage){
		console.log(inMessage);
		this.inGame = true;
		
		for(var x in this.boxes){
			if(this.$[this.boxes[x]].index == 6 && (this.boxes[x] == this.activeBox || inSender != null) ){
				this.setActive(this.$[this.boxes[x]]);
			}
		}
		
		//this.layt = 2;
		//this.changeLayout();
		
		this.$.make.reset();
		
		var ab = this.$[this.activeBox];
		
		var abc = ab.children[6];
		
		ab.setIndex(6);
		
		abc.reset();
		
		abc.setPlayers(inMessage);
		
		abc.set();
		
		abc.load();
		
		abc.save();
		
		//this.choose(null, {index: 3})
	},
	hidehistory: function(inSender, inEvent){
		var h = this.$[this.activeBox].children[6].$.history.parent;
		
		h.setShowing(!h.showing);
		
		var s = this.$.menu;
		
		s.setShowing(!s.showing);
		
		this.render();
		
		return false;
	},
	updatestats: function(inSender, update){
		console.log("updating....", update);
		
		var stats = localStorage["cribbage-stats"];
		
		try {
			stats = JSON.parse(stats);
		} catch(e){stats = []}
		
		/*
		 * reset stats..
		 */
						//stats = [];
		/////////////////////////////////////////////
		
		var u = [];
		
		for ( var x in update.players ) {
			if ( typeof update.players[x] != "string" ) continue;
			u.push({
				player: update.players[x],
				score: update.scores[x]
			});
		}
		
		update = clone(u);
		
		console.log(clone(update))
		
		for ( var x in update ){
			var up = update[x];
			
			console.log(up)
			
			var found = -1;
			
			for ( var y in stats ){
				
				var ep = stats[y];
				if ( up.player == ep.player ) {
					/*
					 * player exists
					 */
					found = y;
					
					break;
				}
			}
			
			if ( found < 0 ) {
				/*
				 * add a new player to the stats
				 */
				
				stats.push({
					player: up.player,
					played: 0,
					wins: 0,
					losses: 0,
					skunks: 0,
					skunked: 0,
					doubleskunks: 0,
					doubleskunked: 0,
					totalpegs: 0,
					opppegs: 0
				});
				
				found = stats.length - 1;
				
			}
			
			/*
			 * now update the player with new stats info
			 */
			
			var player = stats[found];
			
			/*
			 * begin math
			 */
			
			player.played++;
			player.totalpegs += up.score;
			
			var opppegs = 0;
			for ( var i in update ) {
				if ( update[i].player == player.player ) continue;
				opppegs += update[i].score; //if ( update[i].score <= 90 ) player.skunks++;
			}
			player.opppegs += (opppegs / (update.length - 1));
			
			if ( up.score >= 121 ) {
				player.wins++;
				for ( var i in update ) {
					if ( update[i].score <= 90 ) player.skunks++;
					if ( update[i].score <= 60 ) player.doubleskunks++;
				}
			} else {
				player.losses++;
				if ( up.score <= 90 ) player.skunked++;
				if ( up.score <= 60 ) player.doubleskunked++;
			}
			
			/*
			 * end math
			 */
			
			stats[found] = clone(player);
			
			console.log("updating player...", clone(player))
			
		}
		
		localStorage["cribbage-stats"] = JSON.stringify(stats);
		
		console.log("updating stats...", clone(stats))
		
	}
});