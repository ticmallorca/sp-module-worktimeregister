/**
 * controller
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

var baseURL_ticmWorkTimeRegister = "/api/ticmWorkTimeRegister";


function ticmWorkTimeRegister_setRegister(geoLocation, enterExit) {
	var apiURL = `${baseURL_ticmWorkTimeRegister}/set`;
	$.ajax({
		type: "POST",
		url: apiURL,
		data: {
			"geolocation": geoLocation.coords || {},
			"purpose": enterExit
		}
	}).done(function (response) {
		$("#modal_ticmWorkTimeRegister_addRegister").modal("hide");
		if (response.status) {
			ticmWorkTimeRegister_getRegisters();
			doNotify("success", response.status, "Registre horari inserit correctament");
		} else {
			// Message sended
			doNotify("error", response.status, response.message);
		}
		return;
	});

}

function ticmWorkTimeRegister_getRegisters() {
	var apiURL = `${baseURL_ticmWorkTimeRegister}/get`;
	$.ajax({
		type: "GET",
		url: apiURL
	}).done(function (response) {

		if (response.status) {
			ticmWorkTimeRegister_printGetRegisters(response.data[0].checkpoint);
		} else {
			// Message sended
			doNotify("error", response.status, response.message);
		}
	});
}