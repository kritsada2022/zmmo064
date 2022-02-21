sap.ui.define([
    'sap/ui/base/Object',
    'sap/ui/model/json/JSONModel'
], function(Object, JSONModel) {
    'use strict';
    return Object.extend("zmmo064.model.InputModel",{
        _oData : {
            ComponentMaterial       :   "",
            ProductionOrder         :   "",
            ComponentItemNo         :   "",
            ProductionOrderType     :   "",
            WBS                     :   "",
            ComponentMaterialName   :   "",
            Quantity                :   "0.000",
            Unit                    :   "" ,
            Plant                   :   ""  
        },

        _oModel : {},

        constructor :   function(){

            this._oModel = new JSONModel({});
            this._oModel.setDefaultBindingMode("TwoWay");
        },
        
        setModel    :   function(oView, sModelName){
            oView.setModel(this._oModel, sModelName);
        },

        getData     :   function(){
            return this._oModel.getData();
        },
        
        setData     :   function(oInputdata){
            var oData = {};

            oData.ComponentMaterial     =   oInputdata.ComponentMaterial;
            oData.ProductionOrder       =   oInputdata.ProductionOrder;
            oData.ComponentItemNo       =   oInputdata.ComponentItemNo;
            oData.ProductionOrderType   =   oInputdata.ProductionOrderType;
            oData.WBS                   =   oInputdata.WBS;
            oData.ComponentMaterialName =   oInputdata.ComponentMaterialName;
            oData.Quantity              =   oInputdata.Quantity;
            oData.Unit                  =   oInputdata.Unit;
            oData.Plant                 =   oInputdata.Plant;

            this._oModel.setData(oData);
        },

        clearData : function(){
            this._oData = {};

            this._oModel.setData(this._oData);
        },

        setResultFromBarcode : function(oResult) {
            var oInputData	=	{};

            oInputData.ComponentMaterial 	=   oResult.ComponentMaterial;
            oInputData.ProductionOrder		=   oResult.ProductionOrder;
            oInputData.ComponentItemNo      =   oResult.ComponentItemNo;
            this.setData(oInputData);
        }
        
    });
});