sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/GroupHeaderListItem",
    '../model/formatter'
], function(Controller,
	JSONModel,
	Filter,
	FilterOperator,
	GroupHeaderListItem,
	formatter) {
    "use strict";

    return Controller.extend("ui5.basic.controller.InvoiceList", {
  
        formatter : formatter,
        /**
         * @override
         */
        onInit: function() {
            const oModel = new JSONModel({
                currency : "EUR"
            });

            this.getView().setModel(oModel, "view");
        
        },

		onFilterInvoice: function(oEvent) {
            const sSearch = oEvent.getParameter("query");
            const aFilter = []

            if (sSearch){
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sSearch))
            };

            const oList = this.byId("invoiceList");
            const oBind = oList.getBinding("items");
            oBind.filter(aFilter);
		},
        groupHeader(oGroup) {
            return new GroupHeaderListItem({
                title : 'LG ' + oGroup.key       
            }) 
        },
        onPressDetail(oEvent) {
            const oItems = oEvent.getSource();
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail",{
                invoicePath : window.encodeURIComponent(oItems.getBindingContext("invoice").getPath().substr(1))
            });
        }
    });
    
});