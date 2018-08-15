/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "make",
	published: {
		
	},
	events: {
		
	},
	components: [
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				{ content: "create", classes: "header" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "message" },
					
					{ tag: "hr" },
					
					{ name: "previous", classes: "bigger", content: "back", ontap: "previous" },
					{ tag: "br" },
					{ name: "move", kind: "Panels", draggable: false, onTransitionFinish: "buttons", arrangerKind: "enyo.CardSlideInArranger", components: [
						{ name: "p1", kind: "entry", player: 1 },
						{ name: "p2", kind: "entry", player: 2 },
						{ name: "p3", kind: "entry", player: 3, optional: true },
						{ kind: "summary" },
						{ kind: "confirm" },
						{ name: "err", kind: "err" }
					]},
					{ name: "justmade", showing: false, content: "if you see this after you just made a game, hit the layout button" },
					{ tag: "br" },
					{ name: "next", classes: "bigger", content: "continue", ontap: "next" },
					{ name: "finish", classes: "bigger", content: "finish", ontap: "finish" },
					{ name: "make", classes: "bigger", content: "begin", ontap: "make" }
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
			this.$.message.setContent("follow the steps");
			this.$.move.setShowing(true);
			this.$.move.setIndex(0);
		} else {
			this.$.message.setContent("you do not have a game save");
			this.$.doload.setShowing(false);
		}
		
	},
	fetch: function(){
		return true;
	},
	next: function(inSender, inEvent){
		var a = this.$.move.getActive();
		
		if(a.chkerr){
			var p = a.chkerr()[1];
			if (a.chkerr()[0] || (
					p == this.$.p1.chkerr()[1] && a.name != "p1" ||
					p == this.$.p2.chkerr()[1] && a.name != "p2" ||
					p == this.$.p3.chkerr()[1] && a.name != "p3"
			)) {
				this.$.err.last = this.$.move.index;
				this.$.move.setIndex(this.$.move.controls.length - 1);
				this.$.err.errormsg = a.errormsg ? a.errormsg : this.$.err.defaultmsg;
				if(!a.chkerr()[0]){
					this.$.err.errormsg = a.dupemsg;
				}
				this.$.err.set();
				return;
			}
		}
		
		
		this.$.move.next();
		if(this.$.move.getActive().kind == "summary"){
			this.summarize();
		}
		
	},
	previous: function(inSender, inEvent){
		if (this.$.move.getActive().kind == "err"){
			this.$.move.setIndex(this.$.err.last);
			return;
		}
		this.$.move.previous();
	},
	buttons: function(inEvent){
		this.$.next.setShowing(this.$.move.index < this.$.move.controls.length - 3);
		
		this.$.previous.setShowing(this.$.move.index > 0);
		
		this.$.finish.setShowing(this.$.move.getActive().kind == "summary");
		
		this.$.make.setShowing(this.$.move.getActive().kind == "confirm");
	},
	summarize: function(){
		var s = this.$.summary;
		
		s.p1 = this.$.p1.fetch();
		s.p2 = this.$.p2.fetch();
		s.p3 = this.$.p3.fetch();
		
		s.summarize();
	},
	reset: function(){
		for(var x in this.$.move.children){
			try{
				this.$.move.children[x].reset();
			} catch (e){
				if(e.type != "undefined_method")
					console.error(e.message);
			}
			this.previous();
		}
		this.$.justmade.setShowing(false);
	},
	finish: function(inSender, inEvent){
		this.$.move.next();
	},
	make: function(inSender, inEvent){
		console.log("finishing..");
		var s = this.$.summary;
		var ps = [s.p1, s.p2, s.p3];
		this.bubbleUp("onplay", ps);
		
		this.addPlayers([s.p1, s.p2, s.p3]);
		this.$.justmade.setShowing(true);
	},
	addPlayers: function(players){
		var all = localStorage["cribbage-players"];
		
		try {
			all = JSON.parse(all);
		} catch (e) {
			all = [];
		}
		
		/*for (var a in all){
			for(var b in all.shift()){
				console.log(all[a], all[b])
				if(all[a]==all[b]) all.splice(b, 1);
			}
		}*/
		
		for( var x in players ){
			var p = players[x];
			if ( typeof p != "string" ) continue;
			
			var found = false;
			for ( var y in all ){
				var op = all[y];
				if ( p == op ) {
					found = true;
					break;
				}	
			}
			if ( !found ) {
				all.push(p);
			}
		}
		
		localStorage["cribbage-players"] = JSON.stringify(all);
	}
});

enyo.kind({
	name: "confirm",
	kind: "FittableRows",
	style: "color: red",
	components: [
		{ content: "warning", classes: "bigger" },
		{ tag: "br" },
		{ content: "this action will overwrite your save slot" }
	],
	create: function(){
		this.inherited(arguments);
	}
});

enyo.kind({
	name: "summary",
	kind: "FittableRows",
	published: {
		p1: "",
		p2: "",
		p3: ""
	},
	components: [
		{ content: "summary", classes: "bigger" },
		{ tag: "br" },
		{ name: "p1" },
		{ name: "p2" },
		{ name: "p3" }
	],
	create: function(){
		this.inherited(arguments);
	},
	summarize: function(){
		this.$.p1.setContent("player 1: " + this.p1);
		this.$.p2.setContent("player 2: " + this.p2);
		this.$.p3.setContent("player 3: " + this.p3);
		this.$.p3.setShowing(this.p3 != true);
	}
});


enyo.kind({
	name: "entry",
	kind: "FittableRows",
	published: {
		player: 1,
		optional: false,
		skipped: false,
		errormsg: "go back and pick a player",
		dupemsg: "player already picked",
		plyrlist: [],
		plyr: 0
	},
	components: [
		{ name: "message" },
		
		
		{ tag: "br" },
		
		
		{ name: "radio", kind: "onyx.RadioGroup", ontap: "change", components: [
		    { content: "new", active: true },
		    { content: "old" }
		]},
		
		
		{ name: "new", kind: "onyx.InputDecorator", classes: "border", components: [
		    { name: "input", kind: "onyx.Input", style: "width: 100%;background-color:teal;", onkeyup: "keyup" }
		]},
		
		{ name: "old", showing: false, components: [
			
			{ name: "noplyrs", content: "no old players" },
			
			{ name: "plyrs", kind: "List", style: "height: 100px;", classes: "border", onSetupItem: "loadplyrs", count: 0, components: [
				{ name: "plyr", ontap: "highlight" }
			]}
			
		]},
		
		
		{ name: "skip", showing: false, components: [
			{ content: "skip" },
			{ name: "check", kind: "onyx.Checkbox", onchange: "skip" }
		]},
		
		{ tag: "br" }
	],
	create: function(){
		this.inherited(arguments);
		this.$.message.setContent(
			"enter name for player " + this.player
			+ " or select old"
			+ (this.optional ? " or skip" : "")
		);
		if (this.optional){
			this.$.skip.setShowing(true);
		}
	},
	keyup: function(inSender, inEvent){
		var v = this.$.input.getValue();
		var i = this.$.input;
		if (v.length > 7) {
			i.setValue(v.substring(0, 7));
			
			var oldcolor = i.parent.domStyles.borderColor;
			
			i.parent.applyStyle("border-color", "red");
			
			setTimeout(function(i, oldcolor){
				i.parent.applyStyle("border-color", oldcolor);
			}, 1000, i, oldcolor);
			
		}
		
	},
	loadplyrlist: function(){
		
		this.plyrlist = localStorage["cribbage-players"];
		
		try {
			 this.plyrlist = JSON.parse(this.plyrlist);
		} catch (e) {
			this.plyrlist = null;
		}
		
		if(!this.plyrlist){
			this.plyrlist = [];
		}
		
		//this.plyrlist = ["test", "ing", "one", "two", "three"];
		
		
		this.$.plyrs.setCount(this.plyrlist.length);
		this.$.plyrs.setShowing(true);
		this.$.noplyrs.setShowing(false);
		
		this.$.plyrs.refresh();
		
		if(this.plyrlist.length <= 0) {
			this.$.plyrs.setShowing(false);
			this.$.noplyrs.setShowing(true);
		}
	},
	loadplyrs: function(inSender, inEvent){
		this.$.plyr.setContent(this.plyrlist[inEvent.index]);
		this.$.plyr.addRemoveClass("highlight", this.plyr == inEvent.index);
	},
	highlight: function(inSender, inEvent){
		this.plyr = inEvent.index;
		this.$.plyrs.refresh();
	},
	change: function(inSender, inEvent){
		var a = this.$.radio.active.content;
		
		this.$["new"].setShowing(false);
		this.$["old"].setShowing(false);
		
		this.$[a].setShowing(true);
		
		if(a == "old"){
			this.loadplyrlist();
		}
	},
	skip: function(inSender) {
	    this.skipped = inSender.getValue();
	    if(this.skipped){
	    	this.$.radio.setShowing(false);
	    	this.$["new"].setShowing(false);
			this.$["old"].setShowing(false);
	    } else {
	    	this.$.radio.setShowing(true);
	    	this.change();
	    }
	},
	fetch: function(){
		if(this.skipped){
			return true;
		}
		
		var a = this.$.radio.active.content;
		switch(a){
			case "new":
				return this.$.input.getValue().toLowerCase();
				break;
			case "old":
				if(this.plyrlist.length <= 0)
					return false;
				else
					return this.plyrlist[this.plyr].toLowerCase();
				break;
		}
		
	},
	chkerr: function(){
		return [!this.fetch(), this.fetch()];
	},
	reset: function(){
		this.$.input.setValue("");
		this.$.radio.setValue(0);
		this.$.check.setValue(false);
		this.skipped = false;
	}
});

enyo.kind({
	name: "err",
	style: "color: red;",
	kind: "FittableRows",
	published: {
		defaultmsg: "an error occurred",
		errormsg: "an error occurred"
	},
	events: {
		
	},
	components: [
		{ content: "error", classes: "bigger" },
		
		{ tag: "br" },
		
		{ kind: "Scroller", components: [
			{ name: "message" },
			{ tag: "br" },
			{ name: "doload", classes: "bigger", showing: false, content: "there are no stats" }
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.set();
	},
	set: function(){
		var game = this.fetch();
		if (game) {
			this.$.message.setContent(this.errormsg);
			//this.$.doload.setShowing(true);
		} else {
			this.$.message.setContent("you do not have a game save");
			this.$.doload.setShowing(false);
		}
		
	},
	fetch: function(){
		return true;
	}
});