sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/Device",
    "sap/ui/model/BindingMode"
], function(
	UIComponent,
	JSONModel,
	ResourceModel,
	Device,
	BindingMode
) {
	"use strict";
	return UIComponent.extend("ui5.basic.Component", {
        metadata: {
            "interfaces": ["sap.ui.core.IAsyncContentCreation"]
        },
        /**
         * @override
         */
        init: function() {
            UIComponent.prototype.init.apply(this, arguments);

            const oData = {
				recipient: {
					name: "World"
				}
			};

			this.setModel(new JSONModel(oData));
            this.getRouter().initialize();

            const oDevice = new JSONModel(Device);
            oDevice.setDefaultBindingMode(BindingMode.OneWay);
            this.setModel(oDevice, "device");

        }

	});
});