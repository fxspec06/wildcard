/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "board",
	published: {
		
	},
	events: {
		
	},
	components: [
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				{ content: "new", classes: "header" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "tournaments", kind: "List", rows: 15, rowsPerPage: 100, classes: "enyo-fit list",  onSetupRow: "load", components: [
						{ name: "item", classes: "item loader ", ontap: "select", components: [
							{ name: "name" },
							{ name: "lock", kind: "onyx.Icon", src: "img/icons/secure-lock.png" },
							{ name: "tools", style: "float:right;", components: [
								{ name: "delete", kind: "onyx.IconButton", src: "img/icons/toolbar-icon-multi-delete.png", ontap: "remove", style: "margin-right: 16px;" },
								{ name: "info", kind: "onyx.IconButton", src: "img/icons/menu-icon-info.png", ontap: "infobox", style: "margin-right: 16px;" },
								//menu-icon-info
								//{ name: "down", kind: "onyx.IconButton", src: "img/icons/menu-icon-down.png", ontap: "movedown" },
								//{ name: "up", kind: "onyx.IconButton", src: "img/icons/menu-icon-up.png", ontap: "moveup" },
								{ name: "load", kind: "onyx.IconButton", src: "img/icons/toaster-icon-downloads.png", ontap: "tapped" },
							]}
						]},
						
					]}
				]}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
	}
});