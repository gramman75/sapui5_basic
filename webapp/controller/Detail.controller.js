sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(

	Controller,
	History,
	MessageToast,
	JSONModel
) {
	"use strict";

	return Controller.extend("ui5.basic.controller.Detail", {
        /**
         * @override
         */
        onInit: function() {
            const oViewModel = new JSONModel({
                currency: "EUR"
            });

            this.getView().setModel(oViewModel, "view");
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched(oEvent) {
            this.byId("rating").reset();
            this.getView().bindElement({
                path : "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model : "invoice"
            })

        },

		onNavBack: function(oEvent) {
            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined){
                window.history.go(-1);      
            } else {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
            }
			
		},

		onRatingChange: function(oEvent) {
            const fValue = oEvent.getParameter("value");
            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            MessageToast.show(oResourceBundle.getText("confirmMessage",[fValue]));




			
		}
	});
});