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

	var apiURL = `${baseURL_ticmWorkTimeRegister}/get`;

	if (user !== undefined) apiURL = `${apiURL}?id=${user}`;

	$.ajax({
		type: "GET",
		url: apiURL
	}).done(function (response) {

		if (response.status) {
			$("#selectUser").val(response.data[0].user.id).change();
			var data = ticmWorkTimeRegister_formatData(response.data[0]);
			ticmWorkTimeRegister_printGetRegisters(data);
			ticmWorkTimeRegister_printGetRegistersChart(data, response.data[0].journal[0].hours);
		} else {
			// Message sended
			doNotify("error", response.status, response.message);
		}
	});
}
