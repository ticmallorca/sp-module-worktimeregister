/**
 * management
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */




$(window).on('load', async function () {
	// Init table
	var table = $('#registerTable').DataTable({
		autoWidth: false,
		responsive: true,
		// stateSave: true,
		// Column definitions
		columnDefs: [{
			orderable: true
		}],
		buttons: {
			dom: {
				button: {
					className: 'btn btn-light'
				}
			},
			buttons: [
				'excelHtml5',
				'pdfHtml5',
				{
					extend: 'print',
					customize: function (win) {
						$(win.document.body)
							.css('font-size', '10pt')
							.prepend(
								`<div>Printed at ${new Date().toLocaleString()}</div>`
							);
					}
				}
			]
		},
		dom: '<"datatable-header"flB><"datatable-scroll"t><"datatable-footer"ip>',
		language: {
			search: '<span>Filter:</span> _INPUT_ ',
			lengthMenu: '<span>Show:</span> _MENU_',
			paginate: {
				'first': 'First',
				'last': 'Last',
				'next': '→',
				'previous': '←'
			}
		}
	});

	// Select with search
	$("#selectUser").select2({
		minimumResultsForSearch: Infinity,
		placeholder: 'Elige un usuario'
	});
	$("#selectUser").on("select2:select", function (e) {
		ticmWorkTimeRegister_getRegisters(e.params.data.id);
	});

	ticmWorkTimeRegister_getRegisters();


});

$("#checkpointButton").click(() => {

	var id = $("#checkpointId").val();
	var idUser = $("#selectUser").val();
	var date = $("#checkpointDate").val();
	var type = $("#checkpointType").val();

	const dataRequest = {
		id: id,
		user: idUser,
		date: new Date(date).getTime() / 1000,
		type: type
	}

	ticmWorkTimeRegister_managementSetCheckpoint(dataRequest);
});

$("#holidaysButton").click(() => {

	var id = $("#holidaysId").val();
	var idUser = $("#selectUser").val();
	var date = $("#holidaysDay").val();
	var hours = $("#holidaysHours").val();
	var type = $("#holidaysType").val();

	const dataRequest = {
		id: id,
		user: idUser,
		date: new Date(date).getTime() / 1000,
		hours: undoFormatedHours(hours),
		type: type
	}

	ticmWorkTimeRegister_managementSetHoliday(dataRequest);
});



function ticmWorkTimeRegister_editCheckpoint(id, checkpoint, type) {
	$("#checkpointId").val(id);
	$("#checkpointDate").val(formatDatetime(checkpoint * 1000));
	$("#checkpointType").val(type);
	$("#modalCheckpoint").modal('show');
}

function ticmWorkTimeRegister_editHolidays(id, day, hours, type) {

	$("#holidaysId").val(id);
	$("#holidaysDay").val(formatDate(day * 1000));
	$("#holidaysHours").val(formatHours(hours));
	$("#holidaysType").val(type);
	$("#modalHolidays").modal("show");
}



function formatDatetime(date) {
	var d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear(),
		hours = "" + d.getHours(),
		minutes = "" + d.getMinutes();

	if (month.length < 2)
		month = "0" + month;
	if (day.length < 2)
		day = "0" + day;
	if (hours.length < 2)
		hours = "0" + hours;
	if (minutes.length < 2)
		minutes = "0" + minutes;


	return [year, month, day].join('-') + "T" + [hours, minutes].join(":");
}

function formatDate(date) {
	var d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2)
		month = "0" + month;
	if (day.length < 2)
		day = "0" + day;

	return [year, month, day].join('-');
}

function formatHours(floatValue) {
	var hours = "" + parseInt(floatValue);
	var minutes = "" + (floatValue - parseInt(floatValue)) * 60;

	if (hours.length < 2) hours = "0" + hours;
	if (minutes.length < 2) minutes = "0" + minutes;

	return [hours, minutes].join(":");
}

function undoFormatedHours(stringValue) {
	var data = stringValue.split(":");
	return parseInt(data[0]) + parseInt(data[1]) / 60;
}
