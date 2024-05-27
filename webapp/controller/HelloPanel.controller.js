sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
    
], function( Controller, MessageToast ) {
	"use strict";
    return Controller.extend("ui5.basic.controller.HelloPanel", {
		/**
		 * @override
		 */
		onShowHello() {

			const oBundle = this.getView().getModel("i18n").getResourceBundle();
			const sRecipient = this.getView().getModel().getProperty("/recipient/name");
			const sMsg = oBundle.getText("helloMsg",[sRecipient]);
			MessageToast.show(sMsg, {
				duration : 3000
			});
		},
        onOpenDialog(oEvent) {

            this.pDialog ??= this.loadFragment({
                name: "ui5.basic.view.HelloDialog"
            });

            this.pDialog.then((oDialog)=> oDialog.open());
        },
        onCloseDialog(oEvent) {
            this.byId("helloDialog").close();
            // this.pDialog.then((oDialog)=>oDialog.close());
        }
    });
});