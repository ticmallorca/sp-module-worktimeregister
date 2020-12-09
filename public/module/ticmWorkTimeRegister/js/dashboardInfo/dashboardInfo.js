/**
 * dashboardInfo
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

var ticmWorkTimeRegister_addRegister_purpose;

function toogleButton() {
	$("#ticmWorkTimeRegister_addRegister").disabled();
}


function ticmWorkTimeRegister_success(pos) {
	ticmWorkTimeRegister_setRegister(pos,ticmWorkTimeRegister_addRegister_purpose);

};

function ticmWorkTimeRegister_error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);

	ticmWorkTimeRegister_setRegister({coords:{latitude:0,longitude:0}},ticmWorkTimeRegister_addRegister_purpose);
};



$("#ticmWorkTimeRegister_addRegister_enter").click(() => {
	ticmWorkTimeRegister_addRegister_purpose="enter";
	navigator.geolocation.getCurrentPosition((ticmWorkTimeRegister_success), ticmWorkTimeRegister_error, {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	});
});

$("#ticmWorkTimeRegister_addRegister_exit").click(() => {
	ticmWorkTimeRegister_addRegister_purpose="exit";
	navigator.geolocation.getCurrentPosition(ticmWorkTimeRegister_success, ticmWorkTimeRegister_error, {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	});
});

$(window).on('load', async function () {

	ticmWorkTimeRegister_getRegisters();

});



