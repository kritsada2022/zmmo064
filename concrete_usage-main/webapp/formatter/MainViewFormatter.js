sap.ui.define(function() {
    'use strict';
    
    return ({
        formatProductionOrder : function(sProductionOrder, sComponentItemNo) {
            if (!sComponentItemNo){
                return sProductionOrder;
            } else {
                return sProductionOrder + " / " + sComponentItemNo; 
            }
        }
    });
});