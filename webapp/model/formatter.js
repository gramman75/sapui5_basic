sap.ui.define([
], function(
) {
	"use strict";

    return {
        dateFormat (sShippedDate) {
           return sShippedDate.substring(0, sShippedDate.indexOf("T"));


        },
        statusText(sStatus) {
            switch (sStatus) {
                case "A":
                    return "New" 
                case "B":
                    return "In Progress"
                case "C":
                    return "Done"
                default:
                    return "Unknow"
            }

        }
    }
});