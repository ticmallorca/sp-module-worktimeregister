/**
 * view
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

function ticmWorkTimeRegister_printGetRegisters(data) {
	$("#checkpointListTable").DataTable().clear().draw();

	// Check if object is not empty
	if (Object.keys(data).length >= 1) {
		var fullArray = [];
		var dataCollection = {};

		// Checkpoints data
		dataCollection = JSON.parse(JSON.stringify(data));
		for (var year in dataCollection) {
			for (const month in dataCollection[year]) {
				for (const day in dataCollection[year][month]) {

					for (const register in dataCollection[year][month][day]) {

						switch (register) {
							case "checkpoint":
								fullArray.push({
									date: `${year}/${month}/${day}`,
									registers: parseInt(dataCollection[year][month][day][register].in.length) + parseInt(dataCollection[year][month][day][register].out.length),
									total: dataCollection[year][month][day][register].total,
									in: dataCollection[year][month][day][register].in,
									out: dataCollection[year][month][day][register].out
								});
								break;
							// case "vacationCalendar":
							// 	fullArray.push({
							// 		date: `${year}/${month}/${day}`,
							// 		registers: 1,
							// 		total: dataCollection[year][month][day][register].total,
							// 		in: [],
							// 		out: []
							// 	});
							// 	break;
							// case "holidays":
							// 	fullArray.push({
							// 		date: `${year}/${month}/${day}`,
							// 		registers: 1,
							// 		total: dataCollection[year][month][day][register].total,
							// 		type: dataCollection[year][month][day][register].type,
							// 		in: [],
							// 		out: []
							// 	});
							// 	break;
						}
					}
				}
			}
		}

		$('#checkpointListTable').DataTable().rows.add(fullArray);
		$('#checkpointListTable').DataTable().columns.adjust().draw();
	}
}


function ticmWorkTimeRegister_printGetRegistersChart(data, journal) {

	var monthHoursCount = ticmWorkTimeRegister_getMonthHoursCount(data, journal);

	var gridData = {
		labelAxisMonths: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
		labelLegend: ["Hores fetes", "Vacances", "Lliure disposició", "Formació", "Baixa", "Hores per fer"],
		data: {
			"01": monthHoursCount.work,
			"02": monthHoursCount.holidays,
			"03": monthHoursCount.personal,
			"04": monthHoursCount.training,
			"05": monthHoursCount.offWork,
			"06": monthHoursCount.left
		}
	}


	EchartsColumnsWaterfalls.init(gridData);
}

function ticmWorkTimeRegister_printRegistersFilter(filter) {
	var year = new Date().getFullYear();
	var month = ("0" + (filter + 1)).slice(-2);
	$('#checkpointListTable').DataTable().search(`${year}/${month}`).draw();
}
