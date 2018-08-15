/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "addons",
	published: {
		
	},
	events: {
		
	},
	components: [
		{ name: "HPPaymentService", kind: "PalmService", service: "palm://com.palm.service.payment/", onSuccess: "paymentServiceResponse", onFailure: "paymentServiceFailure" },
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				{ content: "addons", classes: "header" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "message" },
					{ tag: "br" },
					{ name: "previous", classes: "bigger", content: "back", ontap: "previous" },
					{ name: "move", kind: "Panels", draggable: false, onTransitionFinish: "buttons", arrangerKind: "enyo.CardSlideInArranger", components: [
						{ name: "start", classes: "bigger", content: "tap to start", ontap: "next" },
						{ name: "getit", kind: "getit" },
					]},
					{ name: "next", classes: "bigger", content: "continue", ontap: "next" },
					{ name: "purchase", classes: "bigger", content: "purchase", ontap: "purchase" },
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
			this.$.message.setContent("get the game save and stats addon today");
			///this.$.button.setShowing(true);
		} else {
			this.$.message.setContent("you do not have a game save");
			//this.$.button.setShowing(false);
		}
		
	},
	fetch: function(){
		return true;
	},
	next: function(inSender, inEvent){
		
		this.$.move.next();
		
		switch (this.$.move.getActive().kind) {
			case "getit":
				this.$.HPPaymentService.getAvailableItems();
				break;
			default:
				break;
		}
		
	},
	previous: function(inSender, inEvent){
		this.$.move.previous();
	},
	buttons: function(inEvent){
		this.$.next.setShowing(this.$.move.index < this.$.move.controls.length - 3);
		
		this.$.previous.setShowing(this.$.move.index > 0);
		
		this.$.next.setShowing(this.$.move.getActive().name == "start");
		
		this.$.purchase.setShowing(this.$.move.getActive().kind == "getit");
	},
	/*
	 * /////////////
	 * 
	 */
	purchase: function(inSender, inEvent){
		
		alert( "Purchase?", this, {
  			cancelText: "No",
  			confirmText: "Yes",
  			onConfirm: function ( context ) {
  				context.$.HPPaymentService.purchaseItem({ 
				   "itemId"     : "1",
				   "quantity"   : 1,
				   "vendorData" : "1"
				})
  			}
  		});
  		
	},
	paymentServiceResponse: function(inSender, inResponse, inRequest) {
		enyo.log("response=", JSON.stringify(inResponse));
		enyo.log("request method=", inRequest.method);

		switch(inRequest.method) {
			
			case "getAvailableItems":
				if (inResponse.itemInfos[0].itemId == "1" && inResponse.itemInfos[0].itemStatus.timesPurchased === 0) {
					//this.$.PurchaseSynergyPopup.open();
				}
				break;

			case "purchaseItem":
				var popupMessage = "";

				switch(inResponse.receiptStatus) {
					case "Charged":
						this.$.PurchasedPopup.open();
						break;
					case "Pending":
						popupMessage = "Your purchase is pending. If you do not receive a confirmation notification within 24 hours, please tap on the App Menu in the upper left hand corner, select 'Receipt' and send the Order Number to 9519993267 via GVoice.";
						this.pendingOrderNumber = inResponse.orderNo;
						this.pendingOrderInterval = setInterval(this.checkPendingPurchase, 5 * 60 * 1000);
						break;
					case "PaymentNotSetup":
						popupMessage = "Payment Information Setup was cancelled.";
						break;
					case "ItemAlreadyPurchased":
						popupMessage = "You have already purchased this, and I thank you for your support!";
						break;
					case "PurchaseInProgress":
						popupMessage = "Purchase is currently pending.";
						break;
					case "PurchaseFailed":
						popupMessage = "Purchase failed, server tells us: " + inResponse.errorCode + " " + inResponse.errorText;
						break;
					case "Cancelled":
						popupMessage = "Purchase failed, user cancelled purchase.";
						break;
				}

				if (popupMessage != "") {
					this.$.purchaseError.open();
					this.$.purchaseError.setMessage(popupMessage);
				}

				break;
			case "getItemInfo":
				this.$.purchaseError.open();
				if (inResponse.returnValue === false)
					alert("Error getting receipt info, errorCode=" + inResponse.errorCode, this);
				else if (inResponse.itemInfo.itemStatus.timesPurchased === 0)
					alert("No purchases found.", this);
				else
					alert("Order Number: " + inResponse.itemInfo.itemStatus.receipts[0].receiptInfo.orderNo, this);
				break;
			case "getPendingPurchaseInfo":
				if (inResponse.receiptStatus == "Charged") {
					this.$.PurchasedPopup.open();
					clearInterval(this.pendingOrderInterval);
				} else if (inResponse.receiptStatus != "Pending") {
					alert("Pending purchase failed: " + inResponse.errorCode + " " + inResponse.errorText, this);
				}
				break;
			default:
				break;
		}

	}
});

enyo.kind({
	name: "getit",
	kind: "FittableRows",
	style: "color: red",
	components: [
		{ content: "warning", classes: "bigger" },
		{ tag: "br" },
		{ content: "this action will charge your credit card" }
	],
	create: function(){
		this.inherited(arguments);
	}
});