sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/RatingIndicator",
    "sap/m/Label",
    "sap/m/Button"
], function(
	Control,
	RatingIndicator,
	Label,
	Button
) {
	"use strict";

	return Control.extend("ui5.basic.control.ProductRating", {
        metadata : {
            properties : {
                value: {type : "float", defaultValue: 0}
            },
            aggregations : {
                _rating : {type : "sap.m.RatingIndicator", multiple: false, visibility : false },
                _label  : {type : "sap.m.Label", multiple: false, visibility : false },
                _button : {type : "sap.m.Button", multiple: false, visibility : false },
            },
            events : {
                change : {
                    parameters :{
                        value : {type : "int"}
                    }
                }

            }
        },

        init() {
            this.setAggregation("_rating", new RatingIndicator({
                value : this.getValue(),
                iconSize: "2rem",
                visualMode : "Half",
                liveChange : this._onRate.bind(this)
            }));

            this.setAggregation("_label", new Label({
                text : "{i18n>initLabelRating}"
            }).addStyleClass("sapUiSmallMargin"));

            this.setAggregation("_button", new Button({
                text : "Rating",
                press : this._onSubmit.bind(this)
            }).addStyleClass("sapUiTinyMaarginTopBottom"));

        },
        /**
         라벨 변경하기
         값 property변경하기

        */
        _onRate(oEvent) {
            const fValue = oEvent.getParameter("value");
            const oResourceBundle = this.getModel("i18n").getResourceBundle();

            this.setProperty("value", fValue, true);
            this.getAggregation("_label").setText(oResourceBundle.getText("changeLabelRating",[fValue, oEvent.getSource().getMaxValue()]));

        },

        reset() {
            const oResourceBundle = this.getModel("i18n").getResourceBundle();
            this.getAggregation("_label").setText(oResourceBundle.getText("initLabelRating"));
            this.getAggregation("_rating").setEnabled(true);
            this.getAggregation("_button").setEnabled(true);
            this.setValue(0);

        },

        /**
         * label변경하기
           change event fire
           rating, button disable처리
         */
        _onSubmit(oEvent) {
            const oResourceBundle = this.getModel("i18n").getResourceBundle();

            this.getAggregation("_label").setText(oResourceBundle.getText("confirmLabelRating"));
            this.getAggregation("_rating").setEnabled(false);
            this.getAggregation("_button").setEnabled(false);
            this.fireEvent("change", {
                value : this.getValue()
            });
        },

        setValue (fValue) {
            this.setProperty("value", fValue, true);
            this.getAggregation("_rating").setValue(fValue);
        },
        renderer(oRM, oControl) {
            oRM.openStart("div", oControl);
            oRM.class("myAppDemoWTProductRating");
            oRM.openEnd();
            oRM.renderControl(oControl.getAggregation("_rating"));
            oRM.renderControl(oControl.getAggregation("_label"));
            oRM.renderControl(oControl.getAggregation("_button"));
            oRM.close("div");
        }
	});
});