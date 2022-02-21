sap.ui.define([
    'sap/ui/base/Object',
    'sap/ui/model/resource/ResourceModel'
], function(Object, ResourceModel) {
    'use strict';
    
    return Object.extend("zmmo064.model.ComponentData", {
        _ComponentModel         :   {},
        _ComponentPrefixPath    :   "/ProductionComponentSet",
        SuccessStatus          :   "Success",
        ErrorStatus            :   "Error",
        _ResourceBundle:	new ResourceModel({
            bundleName:			"zmmo064.i18n.i18n",
            supportedLocales:	[""],
            fallbackLocales:	""
        }).getResourceBundle(),

        constructor : function(oModel){
            this._ComponentModel = oModel;
        },

        getComponentData: function(sComponentMaterial, sProductionOrder, sComponentItemNo){
            var that = this;
            var sPath = this.getPath(sComponentMaterial, sProductionOrder, sComponentItemNo);

            return new Promise(function(resolve, reject){
                that._ComponentModel.read(sPath,{
                    success : function(oData){
                        resolve({
                            status  :   that.SuccessStatus,
                            details :   oData
                        })
                    },
                    error : function(oError){
                        reject({
                            status  :   that.ErrorStatus,
                            details :   oError 
                        })
                    }
                });
            });
        },

        getPath: function(sComponentMaterial, sProductionOrder, sComponentItemNo){
            
            return this._ComponentPrefixPath + 
                        "(ComponentMaterial='"+ sComponentMaterial + 
                        "',ProductionOrder='"+  sProductionOrder + 
                        "',ComponentItemNo='"+  sComponentItemNo +"')";
        },

        confirmComponentData: function(oInputData){
            var that = this;
            var sPath = this.getPath(oInputData.ComponentMaterial, oInputData.ProductionOrder, oInputData.ComponentItemNo);

            return new Promise(function(resolve, reject){
                that._ComponentModel.update(sPath, oInputData, {
                    success :   function(oData){
                        resolve({
                            status  :   that.SuccessStatus,
                            details :   oData,
                            message :   that.getConfirmSuccessMessage(oInputData)
                        })
                    },
                    error   :   function(oError){
                        reject({
                            status  :   that.ErrorStatus,
                            details :   oError,
                            message :   that.getConfirmErrorMessage(oInputData)
                        })
                    }
                });
            });
        },

        getConfirmSuccessMessage: function(oInputData) {
            if (!oInputData.ComponentItemNo || oInputData.ComponentItemNo === "0000"){
                return this._ResourceBundle.getText("confirm.SuccessWithoutItem", 
                                                    [oInputData.ComponentMaterial,
                                                     oInputData.ProductionOrder]);
            } else {
                return this._ResourceBundle.getText("confirm.SuccessWithItem", 
                                                    [oInputData.ComponentMaterial,
                                                     oInputData.ProductionOrder,
                                                     oInputData.ComponentItemNo]);
            }
        },

        getConfirmErrorMessage: function(oInputData) {
            if (!oInputData.ComponentItemNo || oInputData.ComponentItemNo === "0000"){
                return this._ResourceBundle.getText("confirm.ErrorWithoutItem", 
                                                    [oInputData.ComponentMaterial,
                                                     oInputData.ProductionOrder]);
            } else {
                return this._ResourceBundle.getText("confirm.ErrorWithItem", 
                                                    [oInputData.ComponentMaterial,
                                                     oInputData.ProductionOrder,
                                                     oInputData.ComponentItemNo]);
            }
        }
    });
});