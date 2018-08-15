
enyo.kind({
	name: "panelsExt",
	kind: "Panels",
	style: "height: 40%;",
	draggable: false,
	published: {
		active: false
	},
	create: function() {
		this.inherited(arguments);
		this.activeChanged();
	},
	activeChanged: function(){
		var style = this.active ? "2px solid #62b1bd" : "";
		this.addRemoveClass("border", this.active);
	}
});