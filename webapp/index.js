sap.ui.define([
    "sap/ui/core/ComponentContainer"
], (ComponentContainer) => {
    'use strict';

    new ComponentContainer({
        name : "ui5.basic",
        settings : {
            id : "basic"
        },
        async: true
    }).placeAt("content");
});