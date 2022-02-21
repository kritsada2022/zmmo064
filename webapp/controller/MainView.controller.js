sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/BusyIndicator",
	"zmmo064/screenManager/ScreenManager",
	"zmmo064/model/InputModel",
	"zmmo064/model/ComponentData",
	"zmmo064/barcodeScanner/BarcodeScanner",
	"zmmo064/messagePopover/MessagePopover",
	"zmmo064/helper/MainViewHelper",
	"zmmo064/formatter/MainViewFormatter",
	"zmmo064/type/Quantity",
	"zmmo064/messageStrip/MessageStrip"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	/**
	 * @param {typeof sap.ui.core.BusyIndicator} BusyIndicator
	 */
	/**
	 * @param {typeof zmmo064.screenManager.ScreenManager} ScreenManager
	 */
	/**
	 * @param {typeof zmmo064.model.InputModel} InputModel
	 */
	/**
	 * @param {typeof zmmo064.model.ComponentData} ComponentData
	 */
	/**
	 * @param {typeof zmmo064.barcodeScanner.BarcodeScanner} BarcodeScanner
	 */
	/**
	 * @param {typeof zmmo064.messagePopover.MessagePopover} MessagePopover
	 */
	/**
	 * @param {typeof zmmo064.helper.MainViewHelper} MainViewHelper
	 */
	/**
	 * @param {typeof zmmo064.formatter.MainViewFormatter} MainViewFormatter
	 */
	/**
	 * @param {typeof zmmo064.type.Quantity} Quantity
	 */
	/**
	 * @param {typeof zmmo064.messageStrip.MessageStrip} MessageStrip
	 */
	function 	(Controller, BusyIndicator, ScreenManager, InputModel, 
				ComponentData, BarcodeScanner, MessagePopover,
				MainViewHelper, MainViewFormatter, Quantity,
				MessageStrip) {
		"use strict";

		return Controller.extend("zmmo064.controller.MainView", {
			formatter: 			MainViewFormatter,
			quantityType: 		Quantity,

			onInit: async function () {
				//Instantiate Input Model
				this.InputModel = new InputModel();
				this.InputModel.setModel(this.getView(), "input");

				//Instantiate Component Data
				this.ComponentData = new ComponentData(this.getView().getModel());

				//Instantiate Fragment
				this.ScreenManager = new ScreenManager(this.getView(), this.getView().byId("contentVBox"), "fragment", this);
				await this.ScreenManager.loadFragment("Init");

				//Instantiate Barcode Scanner
				this.BarcodeScanner = new BarcodeScanner();
				this.BarcodeScanner.setStatusModel(this.getView())

				//Instantiate Message Popover
				this.MessagePopover = new MessagePopover(this.getView());
				this.MessagePopover.setMessageModel(this.getView());

				//Instantiate Message Strip
				this.MessageStrip	= new MessageStrip(this.getView().byId("messageStripArea"));
			},

			onGetData: async function(oEvent) {
				this.MessagePopover.removeAllMessages();
				this.MessageStrip.clearMessageStrip();

				BusyIndicator.show(0);
				MainViewHelper.getData(this.ComponentData, this.InputModel, this.ScreenManager);
				BusyIndicator.hide();
			},

			onRescan: async function(oEvent) {
				//Set screen to initial state
				this.InputModel.clearData();
				this.ScreenManager.loadFragment("Init");
				this.MessagePopover.removeAllMessages();

				try {
					var oResult = await this.BarcodeScanner.scan();
					this.InputModel.setResultFromBarcode(oResult.details);
					MainViewHelper.getData(this.ComponentData, this.InputModel, this.ScreenManager);
				} catch (oError) {
					
				}
				
			},

			onConfirm: async function(oEvent) {
				var oInputData = this.InputModel.getData();

				this.MessagePopover.removeAllMessages();
				this.MessageStrip.clearMessageStrip();

				try {
					BusyIndicator.show(0);
					var oResult = await this.ComponentData.confirmComponentData(oInputData);
					this.MessageStrip.showMessageStrip(oResult.message, this.ComponentData.SuccessStatus);
				} catch (oError){
					this.MessageStrip.showMessageStrip(oError.message, this.ComponentData.ErrorStatus);
				}
				
				this.InputModel.clearData();
				this.ScreenManager.loadFragment("Init");
				BusyIndicator.hide();

			},

			onScan: async function(oEvent){
				this.MessagePopover.removeAllMessages();
				this.MessageStrip.clearMessageStrip();
				this.InputModel.clearData();

				try{
					var oResult 	= 	await this.BarcodeScanner.scan();
					this.InputModel.setResultFromBarcode(oResult.details);
					MainViewHelper.getData(this.ComponentData, this.InputModel, this.ScreenManager);
				} catch (oError) {
					
				}
			},

			onMessagePopover: function(oEvent){
				var oButtonPopover = this.getView().byId("messagePopOverButton");

				this.MessagePopover.openMessagePopover(oButtonPopover, oEvent);
			}
		});
	});
