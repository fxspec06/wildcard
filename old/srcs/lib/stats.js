/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "stats",
	published: {
		
	},
	events: {
		
	},
	components: [
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				{ content: "stats", classes: "header" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "message" },
					{ tag: "br" },
					{ name: "stats" },
					{ name: "nostats", classes: "bigger", content: "there are no stats" }
				]}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.set();
	},
	refresh: function(){
		this.set();
	},
	set: function(){
		this.$.message.setContent("view detailed stats information here");
		
		var stats = this.fetch();
		if ( stats.length ) {
			this.loadthese(stats);
			this.$.nostats.setShowing(false);
		} else if (stats == false && !plus) {
			this.$.message.setContent("this feature available in cribbage board+");
			this.$.nostats.setShowing(false);
		} else {
			//this.$.message.setContent("you do not have a game save");
			this.$.nostats.setShowing(true);
			this.$.stats.setShowing(false);
		}
		
	},
	fetch: function(){
		
		if (!plus) return false;
		
		var stats = localStorage["cribbage-stats"];
		
		try {
			stats = JSON.parse(stats);
		} catch(e){stats = []}
		
		return stats;
	},
	loadthese: function(stats){
		
		var s = this.$.stats;
		
		s.setShowing(true);
		//s.setContent(JSON.stringify(stats));
		
		var madefirst = false;
		
		var c = [];
		for ( var p in stats ) {
			var player = stats[p];
			
			var ic = [];
			
			var played = 0;
			
			for ( var i in player ){
				
				if ( i == "played" ) played = player[i];
				
				var content = this.format(i, player[i], played);
				
				if ( !madefirst ) {
					ic.push(
						{ tag: "tr", components: [
							{ tag: "td", content: content[0], style: "height: 25px; text-align: right; font-weight: bold;" },
							{ tag: "td", content: content[1], style: "height: 25px; border-color: #927c49;" }
						]}
					);
				} else {
					ic.push(
						{ tag: "tr", components: [
							//{ tag: "td", content: content[0], style: "text-align: right; font-weight: bold;" },
							{ tag: "td", content: content[1], style: "height: 25px; border-color: #927c49;" }
						]}
					);
				}
				
				
			}
			
			c.push({ tag: "table", components: ic });
					madefirst = true;
			
		}
		
		//console.log(c)
		
		s.destroyComponents();
		
		s.createComponents([
			{ layoutKind: "FittableColumnsLayout", components: c }
		]);
		
		s.render();
		
	},
	format: function(category, info, played){
		switch (category){
			case "doubleskunks":
				category = "double skunks";
				break;
			case "doubleskunked":
				category = "double skunked";
				break;
			case "totalpegs":
				category = "total / avg pegs";
				info = info + " / " + Math.round(info/played);
				break;
			case "opppegs":
				category = "opp total / avg pegs";
				info = info + " / " + Math.round(info/played);
				break;
		}
		
		return [category, info];
	}
});