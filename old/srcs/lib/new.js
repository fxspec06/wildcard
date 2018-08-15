/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "new",
	published: {
		
	},
	events: {
		
	},
	components: [
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				{ content: "new", classes: "header" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "message" },
					{ tag: "br" },
					{ name: "doload", classes: "bigger", content: "tap to create", ontap: "make" }
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
		if (game) {
			this.$.message.setContent("make a new game");
			this.$.doload.setShowing(true);
		} else {
			this.$.message.setContent("you do not have a game save");
			this.$.doload.setShowing(false);
		}
		
	},
	fetch: function(){
		return true;
		//return localStorage["cribbage-saved"];
	},
	make: function(){
		this.bubbleUp("onnew");
	}
});