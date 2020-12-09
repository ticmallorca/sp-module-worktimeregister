/**
 * panel
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

function ticmWorkTimeRegister_formatData(data) {


	// data types
	/**
	 * types checkpoint, vacationCalendar, holidays, personal, training, offWork
	 */


	// Checkpoint build
	var touch2InOutData = ticmWorkTimeRegister_converterTypesTouch2InOut(data.checkpoint);
	var checkpointBuild = ticmWorkTimeRegister_buildCheckpointData(touch2InOutData);

	// Holidays build
	var holidaysBuild = ticmWorkTimeRegister_buildHolidaysData(data.holidays);

	// VacationCalendar build
	var vacationCalendarBuild = ticmWorkTimeRegister_buildVacationCalendarData(data.vacationCalendar, data.journal[0].hours);

	return _.merge({}, checkpointBuild, holidaysBuild, vacationCalendarBuild);

}


function ticmWorkTimeRegister_buildVacationCalendarData(data, journal) {
	if (data.length < 1) return [];

	var dataBuild = {};
	for (var ele in data) {
		var date = new Date(data[ele].date * 1000);
		var yy = date.getFullYear();
		var mm = ("0" + (date.getMonth() + 1)).slice(-2);
		var dd = ("0" + (date.getDate())).slice(-2);
		var HH = ("0" + (date.getHours())).slice(-2);
		var MM = ("0" + (date.getMinutes())).slice(-2);
		var SS = ("0" + (date.getSeconds())).slice(-2);

		const payload = {
			year: yy.toString(),
			month: mm.toString(),
			day: dd.toString(),
			hour: `${HH}:${MM}:${SS}`,
			date: date.getTime()
		}

		// Comprobamos la estructura de date
		if (isNaN(payload.date)) {
			// this.pushLog(1, "El formato de fecha no es apropiado. La fecha debe estar formateda como se indica a continuación. Valores numéricos");
			return;
		}

		// Comprobamos que el usuario tiene estructura AÑO en la lista de registros
		if (dataBuild[payload.year] === undefined) {
			dataBuild[payload.year] = {};
		}

		// Comprobamos que el usuario tiene estructura MES en la lista de registros
		if (dataBuild[payload.year][payload.month] === undefined) {
			dataBuild[payload.year][payload.month] = {};
		}

		// Comprobamos que el usuario tiene estructura DAY en la lista de registros
		if (dataBuild[payload.year][payload.month][payload.day] === undefined) {

			let holidayTime = new Date(null);
			let seconds = journal * 60 * 60;
			holidayTime.setSeconds(seconds);

			dataBuild[payload.year][payload.month][payload.day] = {
				vacationCalendar: {
					description: data[ele].description,
					date: data[ele].date,
					total: `${holidayTime.toISOString().substr(11, 8)}`,
					type: "vacationCalendar"
				}
			};
		}
	}

	return dataBuild;
}



function ticmWorkTimeRegister_buildHolidaysData(data) {
	// data types
	/**
	 * types checkpoint, vacationCalendar, holidays, personal, training, offWork
	 */


	if (data.length < 1) return [];

	var dataBuild = {};
	for (var ele in data) {
		var date = new Date(data[ele].day * 1000);
		var yy = date.getFullYear();
		var mm = ("0" + (date.getMonth() + 1)).slice(-2);
		var dd = ("0" + (date.getDate())).slice(-2);
		var HH = ("0" + (date.getHours())).slice(-2);
		var MM = ("0" + (date.getMinutes())).slice(-2);
		var SS = ("0" + (date.getSeconds())).slice(-2);

		const payload = {
			year: yy.toString(),
			month: mm.toString(),
			day: dd.toString(),
			hour: `${HH}:${MM}:${SS}`,
			date: date.getTime()
		}

		// Comprobamos la estructura de date
		if (isNaN(payload.date)) {
			// this.pushLog(1, "El formato de fecha no es apropiado. La fecha debe estar formateda como se indica a continuación. Valores numéricos");
			return;
		}

		// Comprobamos que el usuario tiene estructura AÑO en la lista de registros
		if (dataBuild[payload.year] === undefined) {
			dataBuild[payload.year] = {};
		}

		// Comprobamos que el usuario tiene estructura MES en la lista de registros
		if (dataBuild[payload.year][payload.month] === undefined) {
			dataBuild[payload.year][payload.month] = {};
		}

		// Comprobamos que el usuario tiene estructura DAY en la lista de registros
		if (dataBuild[payload.year][payload.month][payload.day] === undefined) {

			let holidayTime = new Date(null);
			let seconds = data[ele].hours * 60 * 60;
			holidayTime.setSeconds(seconds);

			dataBuild[payload.year][payload.month][payload.day] = {
				holidays: {
					hours: data[ele].hours,
					total: `${holidayTime.toISOString().substr(11, 8)}`,
					day: data[ele].day,
					status: data[ele].statusName,
					type: data[ele].typeName
				}
			};
		}

	}

	return dataBuild;
}


/**
 * ticmWorkTimeRegister_buildCheckpointData
 * @param {*} data
 */

function ticmWorkTimeRegister_buildCheckpointData(data) {
	if (data.length < 1) return [];

	var dataBuild = {};
	for (var ele in data) {
		var date = new Date(data[ele].checkpoint * 1000);
		var yy = date.getFullYear();
		var mm = ("0" + (date.getMonth() + 1)).slice(-2);
		var dd = ("0" + (date.getDate())).slice(-2);
		var HH = ("0" + (date.getHours())).slice(-2);
		var MM = ("0" + (date.getMinutes())).slice(-2);
		var SS = ("0" + (date.getSeconds())).slice(-2);

		const payload = {
			year: yy.toString(),
			month: mm.toString(),
			day: dd.toString(),
			hour: `${HH}:${MM}:${SS}`,
			date: date.getTime()
		}

		// Comprobamos la estructura de date
		if (isNaN(payload.date)) {
			// this.pushLog(1, "El formato de fecha no es apropiado. La fecha debe estar formateda como se indica a continuación. Valores numéricos");
			return;
		}

		// Comprobamos que el usuario tiene estructura AÑO en la lista de registros
		if (dataBuild[payload.year] === undefined) {
			dataBuild[payload.year] = {};
		}

		// Comprobamos que el usuario tiene estructura MES en la lista de registros
		if (dataBuild[payload.year][payload.month] === undefined) {
			dataBuild[payload.year][payload.month] = {};
		}

		// Comprobamos que el usuario tiene estructura DAY en la lista de registros
		if (dataBuild[payload.year][payload.month][payload.day] === undefined) {
			dataBuild[payload.year][payload.month][payload.day] = {
				checkpoint: {
					in: [],
					out: [],
					type: "checkpoint",
					status: "in",
					total: "00:00:00",
					touch: {}
				}
			};
		}

		if (data[ele].type === 1) {

			if (dataBuild[payload.year][payload.month][payload.day].checkpoint.status === "in") dataBuild[payload.year][payload.month][payload.day].checkpoint.in.push(data[ele].checkpoint);
			dataBuild[payload.year][payload.month][payload.day].checkpoint.status = "out";
		}

		if (data[ele].type === 2) {

			if (dataBuild[payload.year][payload.month][payload.day].status === "in") dataBuild[payload.year][payload.month][payload.day].checkpoint.out.pop();
			dataBuild[payload.year][payload.month][payload.day].checkpoint.out.push(data[ele].checkpoint);
			dataBuild[payload.year][payload.month][payload.day].checkpoint.status = "in";

		}


	}

	for (var y in dataBuild) {
		var year = dataBuild[y];
		for (var m in year) {
			var month = year[m];
			for (var d in month) {

				if (dataBuild[y][m][d].checkpoint.in.length >= dataBuild[y][m][d].checkpoint.out.length) {
					var totalWorkedTime = 0;
					for (var i = 0; i < dataBuild[y][m][d].checkpoint.out.length; i++) {
						totalWorkedTime += (dataBuild[y][m][d].checkpoint.out[i] - dataBuild[y][m][d].checkpoint.in[i]);
					}
					let workingTime = new Date(null);
					workingTime.setSeconds(totalWorkedTime);
					dataBuild[y][m][d].checkpoint.total = workingTime.toISOString().substr(11, 8);

				}
			}
		}
	}


	return dataBuild;
}

/**
 * ticmWorkTimeRegister_converterTypesTouch2InOut
 * @param {*} data
 */
function ticmWorkTimeRegister_converterTypesTouch2InOut(data) {
	var dataResponse = [];
	if (data.length < 1) return dataResponse;

	var dataBuild = {};
	for (var ele in data) {
		if (data[ele].type !== 3) {
			dataResponse.push(data[ele]);
			continue;
		};

		var date = new Date(data[ele].checkpoint * 1000);
		var yy = date.getFullYear();
		var mm = ("0" + (date.getMonth() + 1)).slice(-2);
		var dd = ("0" + (date.getDate())).slice(-2);
		var HH = ("0" + (date.getHours())).slice(-2);
		var MM = ("0" + (date.getMinutes())).slice(-2);
		var SS = ("0" + (date.getSeconds())).slice(-2);

		const payload = {
			year: yy.toString(),
			month: mm.toString(),
			day: dd.toString(),
			hour: `${HH}:${MM}:${SS}`,
			date: date.getTime()
		}

		// Comprobamos la estructura de date
		if (isNaN(payload.date)) {
			// this.pushLog(1, "El formato de fecha no es apropiado. La fecha debe estar formateda como se indica a continuación. Valores numéricos");
			return;
		}

		// Comprobamos que el usuario tiene estructura AÑO en la lista de registros
		if (dataBuild[payload.year] === undefined) {
			dataBuild[payload.year] = {};
		}

		// Comprobamos que el usuario tiene estructura MES en la lista de registros
		if (dataBuild[payload.year][payload.month] === undefined) {
			dataBuild[payload.year][payload.month] = {};
		}

		// Comprobamos que el usuario tiene estructura DAY en la lista de registros
		if (dataBuild[payload.year][payload.month][payload.day] === undefined) {
			dataBuild[payload.year][payload.month][payload.day] = {};
		}

		dataBuild[payload.year][payload.month][payload.day][payload.date] = payload;

	}
	for (var y in dataBuild) {
		var year = dataBuild[y];
		for (var m in year) {
			var month = year[m];
			for (var d in month) {
				var day = month[d];

				dataResponse.push({
					checkpoint: Math.floor(day[Object.keys(day)[0]].date / 1000),
					type: 1
				});
				dataResponse.push({
					checkpoint: Math.floor(day[Object.keys(day)[Object.keys(day).length - 1]].date / 1000),
					type: 2
				});
			}
		}
	}
	return dataResponse;
}

/**
 * ticmWorkTimeRegister_getMonthHoursCount
 * @param {*} data
 * @returns []
 */
function ticmWorkTimeRegister_getMonthHoursCount(data, journal) {

	var monthHoursCount = {
		work: {},
		left: {},
		holidays: {},
		personal: {},
		training: {},
		offWork: {},
		vacationCalendar: {}
	};

	for (const year in data) {

		monthHoursCount.work[year] = {};
		monthHoursCount.left[year] = {};
		monthHoursCount.holidays[year] = {};
		monthHoursCount.personal[year] = {};
		monthHoursCount.training[year] = {};
		monthHoursCount.offWork[year] = {};
		monthHoursCount.vacationCalendar[year] = {};

		for (let index = 1; index <= 12; index++) {

			var month = ("0" + index.toString()).slice(-2);
			console.log(year + "/" + month + "---------------------------");
			var totalHolidays = 0;
			var totalPersonal = 0;
			var totalTraining = 0;
			var totalOffWork = 0;
			var totalWorked = 0;
			var totalVacationCalendar = 0;


			for (const day in data[year][month]) {
				for (const obj in data[year][month][day]) {
					var total = (data[year][month][day][obj].total).split(":");
					var hours = parseInt(total[0]) + (parseInt(total[1]) / 60) + (parseInt(total[2]) / 3600);
					console.log(`${year}/${month}/${day} - ${obj}`);
					switch (obj) {
						case "checkpoint":
							totalWorked += hours;
							break;
						case "holidays":
							if (data[year][month][day][obj].type === "holidays") totalHolidays += hours;
							if (data[year][month][day][obj].type === "personal") totalPersonal += hours;
							if (data[year][month][day][obj].type === "training") totalTraining += hours;
							if (data[year][month][day][obj].type === "offWork") totalOffWork += hours;
							break;
						case "vacationCalendar":
							totalVacationCalendar += hours;
							break;
					}

				}
			}

			monthHoursCount.work[year][month] = totalWorked.toFixed(2);
			monthHoursCount.holidays[year][month] = totalHolidays.toFixed(2);
			monthHoursCount.personal[year][month] = totalPersonal.toFixed(2);
			monthHoursCount.training[year][month] = totalTraining.toFixed(2);
			monthHoursCount.offWork[year][month] = totalOffWork.toFixed(2);
			monthHoursCount.vacationCalendar[year][month] = totalVacationCalendar.toFixed(2);

			var hoursTotalToWork = ticmWorkTimeRegister_getBusinessHoursCount(year, month, journal);
			var hoursLeft = (hoursTotalToWork
				- parseFloat(monthHoursCount.work[year][month])
				- parseFloat(monthHoursCount.holidays[year][month])
				- parseFloat(monthHoursCount.personal[year][month])
				- parseFloat(monthHoursCount.training[year][month])
				- parseFloat(monthHoursCount.offWork[year][month])
				- parseFloat(monthHoursCount.vacationCalendar[year][month])).toFixed(2);
			monthHoursCount.left[year][month] = hoursLeft;

		}
	}

	return monthHoursCount;

}


/**
 * ticmWorkTimeRegister_getBusinessHoursCount
 * @param {*} in_year
 * @param {*} in_month
 * @param {*} in_journal
 */
function ticmWorkTimeRegister_getBusinessHoursCount(in_year, in_month, in_journal) {
	var year = parseInt(in_year);
	var month = parseInt(in_month);
	var journal = in_journal;
	var startDate = new Date(`${month}/01/${year}`);
	var endDate = new Date(`${month + 1}/01/${year}`);
	if (month + 1 > 12) {
		endDate = new Date(`01/01/${year + 1}`);
	}
	var count = 0;
	var curDate = startDate;
	while (curDate < endDate) {
		var dayOfWeek = curDate.getDay();
		if (!((dayOfWeek == 6) || (dayOfWeek == 0)))
			count++;
		curDate.setDate(curDate.getDate() + 1);
	}
	console.log(`Month ${month} count ${count} return ${count * journal}`);
	return count * journal;
}

/**
 * ticmWorkTimeRegister_getMonthVacationCalendarCount
 * @param {number} in_year
 * @param {number} in_month
 * @param {*} in_vacationCalendar
 * @returns [] vacations of month
 */
function ticmWorkTimeRegister_getMonthVacationCalendarCount(in_year, in_month, in_vacationCalendar) {

	var monthVacations = [];
	for (const d in in_vacationCalendar) {
		var vacation = new Date(in_vacationCalendar[d].date * 1000);
		if (vacation.getFullYear() === in_year && vacation.getMonth() + 1 === in_month) {
			monthVacations.push(in_vacationCalendar[d]);
		}
	}
	return monthVacations;
}



function format(data) {

	var biggestIndex = data.in.length;
	if (data.in.length < data.out.length) biggestIndex = data.out.length;

	var rows = "";
	for (let index = 0; index < biggestIndex; index++) {

		var begin = 0;
		if (data.in[index] !== undefined) begin = new Date(data.in[index] * 1000).toLocaleString();
		var end = 0;
		if (data.out[index] !== undefined) end = new Date(data.out[index] * 1000).toLocaleString();
		var subtotal = "00:00:00";
		if (data.out[index] !== undefined && data.in[index] !== undefined) {
			let workingTime = new Date(null);
			workingTime.setSeconds(data.out[index] - data.in[index]);
			subtotal = workingTime.toISOString().substr(11, 8);
		}

		rows = rows + `
			<tr>
				<td>${begin}</td>
				<td>${end}</td>
				<td>${subtotal}</td>
			</tr>`;

	}



	return `
	<div class="details-container">
		<table class="table table-responsive ">
			<thead class="bg-slate-400">
				<tr>
				<th>Entrada</th>
				<th>Salida</th>
				<th>Subtotal</th>
				</tr>
			</thead>
			<tbody>
				${rows}
			</tbody>
		</table>
	</div>`;
};


$(window).on('load', async function () {
	// Init table
	var table = $('#checkpointListTable').DataTable({
		autoWidth: false,
		responsive: true,
		// stateSave: true,
		// Column definitions
		columns: [
			{
				className: 'details-control',
				defaultContent: '<i class="icon-zoomin3"></i>',
				data: null,
				orderable: false
			},
			{ data: 'date' },
			{ data: 'registers' },
			{ data: 'total' }
		],
		order: [[1, "desc"]],
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
	$('#checkpointListTable tbody').on('click', 'td.details-control', function () {
		var tr = $(this).closest('tr'),
			row = table.row(tr);

		if (row.child.isShown()) {
			tr.next('tr').removeClass('details-row');
			row.child.hide();
			tr.children(0).children(0).removeClass("icon-zoomout3");
		}
		else {
			row.child(format(row.data())).show();
			tr.next('tr').addClass('details-row');
			tr.children(0).children(0).addClass("icon-zoomout3");
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




