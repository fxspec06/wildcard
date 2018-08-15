/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "load",
	published: {
		
	},
	events: {
		
	},
	components: [
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				{ content: "load", classes: "header" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "message" },
					{ tag: "br" },
					{ name: "doload", classes: "bigger", content: "tap to load", ontap: "load" }
				]}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.set();
	},
	set: function(){
		var game = this.fetch();
		var test = false;
		try {
			JSON.parse(game).players;
			test = true;
		} catch(e){}
		if (game && test && JSON.parse(game).players && JSON.parse(game).scores) {
			this.$.message.setContent("game exists");
			this.$.doload.setShowing(true);
		} else if (game == false) {
			this.$.message.setContent("this feature available in cribbage board+");
			this.$.doload.setShowing(false);
		} else {
			this.$.message.setContent("you do not have a game save");
			this.$.doload.setShowing(false);
		}
		
	},
	fetch: function(){
		if (!plus) return false;
		
		return localStorage["cribbage-game"];
	},
	load: function(){
		this.bubbleUp("load");
	}
});