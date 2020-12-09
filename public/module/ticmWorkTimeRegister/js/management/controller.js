/**
 * controller
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

Date.prototype.yyyymmddhhmmss = function () {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();
	var HH = (this.getHours() < 10 ? '0' : '') + this.getHours();
	var MM = (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();
	var SS = (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();

	var date = [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
	return date + " " + HH + ":" + MM + ":" + SS;
};

var baseURL_ticmWorkTimeRegister = "/api/ticmWorkTimeRegister";

function ticmWorkTimeRegister_getRegisters(user = undefined) {

	var apiURL = `${baseURL_ticmWorkTimeRegister}/getAll`;

	if (user !== undefined) apiURL = `${apiURL}?id=${user}`;

	$.ajax({
		type: "GET",
		url: apiURL
	}).done(function (response) {

		if (response.status) {
			$("#selectUser").val(response.data[0].user.id).change();
			ticmWorkTimeRegister_printGetRegisters(response.data[0].checkpoint);
			ticmWorkTimeRegister_printGetHolidays(response.data[0].holidays);
			console.log(response.data);
		} else {
			// Message sended
			doNotify("error", response.status, response.message);
		}
	});
}

function ticmWorkTimeRegister_managementSetCheckpoint(data) {
	var apiURL = `${baseURL_ticmWorkTimeRegister}/setCheckpoint`;

	$.ajax({
		type: "POST",
		url: apiURL,
		data: data
	}).done(function (response) {

		if (response.status) {
			doNotify("success", response.status, response.message);
		} else {
			doNotify("error", response.status, response.message);
		}
	});
}

function ticmWorkTimeRegister_managementSetHoliday(data) {
	var apiURL = `${baseURL_ticmWorkTimeRegister}/setHolidays`;

	$.ajax({
		type: "POST",
		url: apiURL,
		data: data
	}).done(function (response) {

		if (response.status) {
			doNotify("success", response.status, response.message);
		} else {
			doNotify("error", response.status, response.message);
		}
	});
}