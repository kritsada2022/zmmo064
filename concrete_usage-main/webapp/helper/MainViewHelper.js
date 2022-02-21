sap.ui.define(function() {
    'use strict';
    
    return ({
        getData : async function(oComponentData, oInputModel, oScreenManager) {
            var oInputData = oInputModel.getData();

            var oResult = await oComponentData.getComponentData(oInputData.ComponentMaterial, 
                                                                oInputData.ProductionOrder, 
                                                                oInputData.ComponentItemNo);

            if (oResult.status === oComponentData.SuccessStatus) {
                oInputModel.setData(oResult.details);
                oScreenManager.loadFragment("DisplayData");
            }
        }
    });
});