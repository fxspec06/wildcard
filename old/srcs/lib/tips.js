/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "tips",
	published: {
		
	},
	events: {
		
	},
	components: [
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				{ content: "tips", classes: "header" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "message" },
					{ tag: "br" },
					{ tag: "ul", components: [
						{ tag: "li", content: "tap layout button to change views" },
						{ tag: "li", content: "hold layout button to hide the sidebars" },
						{ tag: "li", content: "to hide only one sidebar, move into split view, then hold layout button" },
						{ name: "plus", tag: "li", content: "there is only one save game slot. be careful not to overwrite it!" },
						{ tag: "li", content: "do not attempt to change views while pegs are moving. consequences will be dire!" },
						{ tag: "li", allowHtml: true, content: "for information on how to play cribbage, <a target='_blank' href='http://www.wikihow.com/Play-Cribbage'>visit the wikihow cribbage wiki</a>" },
					]},
					{ name: "doload", classes: "bigger", content: "" }
				]}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
		if (!plus) this.$.plus.content += " *(requires cribbage board+)"
		this.set();
	},
	set: function(){
		var game = this.fetch();
		if (game) {
			this.$.message.setContent("cribbage board " + appvers);
			this.$.doload.setShowing(true);
		} else {
			this.$.message.setContent("you do not have a game save");
			this.$.doload.setShowing(false);
		}
		
	},
	fetch: function(){
		return true;
	}
});