/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zmm_concrt_use/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
