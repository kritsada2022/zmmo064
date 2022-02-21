sap.ui.define([
    'sap/ui/base/Object',
    'zmmo064/control/BarcodeScannerControl'
], function(Object, BarcodeScannerControl) {
    'use strict';
    
    return Object.extend("zmmo064.barcodeScanner.BarcodeScanner", {
        _sDialogTitle           :   "Enter Barcode Manually",
        SuccessStatus           :   "Success",
        ErrorStatus             :   "Error",
        CancelStatus            :   "Cancel",
        _StatusModelName        :   "barcode",

        constructor : function(){
            
        },

        setStatusModel : function(oView){
            oView.setModel(BarcodeScannerControl.getStatusModel(), this._StatusModelName);
        },
        
        scan : function(){
            var that  = this;

            return new Promise(function(resolve, reject){
                BarcodeScannerControl.scan(
                    //Scan Successfully
                    function(oResult) {
                        if (oResult.text){
                            resolve({
                                status  :   that.SuccessStatus,
                                details :   {
                                    ProductionOrder     :   oResult.text.substring(4,16),
                                    ComponentItemNo     :   oResult.text.substring(16,20),
                                    ComponentMaterial   :   oResult.text.substring(21,34)
                                }
                            });
                        } else {
                            resolve({
                                status  :   that.CancelStatus
                            })
                        }
                    }, 
                    //Scan Failure
                    function(sError) {
                        reject({
                            status  :   that.ErrorStatus,
                            details :   sError
                        });
                    }, 
                    //Live Update
                    function(oParams) {
                        //Do Nothing
                    },
                    that._sDialogTitle
                );
            });
        }
    });
});