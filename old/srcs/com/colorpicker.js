/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "colorPicker",
	published: {
		color: "",
		disabled: false
	},
	events: {
		onColorChanged: ""
	},
	components: [
		{ name: "color", onclick: "changeColor", classes: "picker" },
		{ name: "chooseColor", kind: "onyx.Popup", layoutKind: "FittableRowsLayout", classes: "enyo-fit",
		style: " position: fixed; padding: 40px; height: " + window.innerHeight * .5 + "px; min-height: 350px; width:" + window.innerWidth * .8 + "px;", centered: true, modal: true, floating: true,
		autoDismiss: false, components: [
		   { kind: "ColorPicker", onColorPick: "choose", fit: true }
		   
		   /* { content: "Choose a colour..." },
			{ name: "white", style: "background-color: white", classes: "colorList", onclick: "choose" },
			{ name: "grey", style: "background-color: grey", classes: "colorList", onclick: "choose" },
			{ name: "black", style: "background-color: black", classes: "colorList", onclick: "choose" },
			{ name: "red", style: "background-color: red", classes: "colorList", onclick: "choose" },
			{ name: "blue", style: "background-color: blue", classes: "colorList", onclick: "choose" },
			{ name: "green", style: "background-color: green", classes: "colorList", onclick: "choose" },
			{ name: "yellow", style: "background-color: yellow", classes: "colorList", onclick: "choose" },
			{ name: "maroon", style: "background-color: maroon", classes: "colorList", onclick: "choose" },
			{ name: "teal", style: "background-color: teal", classes: "colorList", onclick: "choose" },
			{ name: "purple", style: "background-color: purple", classes: "colorList", onclick: "choose" },
			{ name: "orange", style: "background-color: orange", classes: "colorList", onclick: "choose" },
			{ name: "silver", style: "background-color: silver", classes: "colorList", onclick: "choose" },
			{ name: "gold", style: "background-color: gold", classes: "colorList", onclick: "choose" },*/
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.colorChanged();
	},
	colorChanged: function(oldColor){
		this.$.color.applyStyle("background-color", this.color);
		this.doColorChanged();
	},
	changeColor: function(inSender, inEvent){
		if(this.disabled){return}
		this.$.chooseColor.setShowing(true);
	},
	choose: function(inSender, inEvent){
		this.setColor(inSender.color);
		this.$.chooseColor.setShowing(false);
	}
});