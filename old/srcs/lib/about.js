/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "about",
	published: {
		
	},
	events: {
		
	},
	components: [
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				{ content: "about", classes: "header" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "message" },
					{ tag: "br" },
					{ tag: "ul", components: [
						{ tag: "li", allowHtml: true, content: "created in under 50hrs using <a href='http://enyojs.com/'>enyojs</a>" },
						{ tag: "li", content: "replacement for physical cribbage board" },
						{ tag: "li", content: "thanks to derek for great idea" },
						{ tag: "li", content: "special thanks to anyone who's ever helped me in any way shape or form" },
						{ tag: "li", content: "shout out to the irc channels #webos #enyojs and #webos-ports" },
						{ name: "plus", tag: "li", content: "if you use this app, please purchase cribbage board+. it's $1. that's a bag of skittles." },
					]},
					{ name: "doload", classes: "bigger", content: "created by fxspec06" },
					{ allowHtml: true, content: "<b><i>support webos developers</b></i>", style: "bottom: 0px; right: 0px; position: absolute;" },
				]}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.$.plus.setShowing(!plus);
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