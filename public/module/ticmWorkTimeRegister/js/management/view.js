/**
 * view
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

function ticmWorkTimeRegister_printGetRegisters(data) {
	$("#checkpointTable").DataTable().clear().draw();

	// Check if object is not empty
	var fullArray = [];
	if (Object.keys(data).length >= 1) {
		var dataArray = [];
		for (const key in data) {
			var registerType = "Indefinida";
			if (data[key].type === 1) registerType = "Entrada";
			if (data[key].type === 2) registerType = "Salida";
			dataArray.push(`<td class="text-center">
                                <div class="list-icons">
                                    <div class="dropdown">
                                        <a href="#" class="list-icons-item" data-toggle="dropdown">
                                            <i class="icon-menu9"></i>
                                        </a>

                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a href="#" onClick="ticmWorkTimeRegister_editCheckpoint(${data[key].id},${data[key].checkpoint},${data[key].type})" class="dropdown-item"><i class="icon-pencil3"></i> Edit</a>
                                        </div>
                                    </div>
                                </div>
                            </td>`);

			dataArray.push(new Date(data[key].checkpoint * 1000).toLocaleString());
			dataArray.push(registerType);
			fullArray.push(dataArray);
			dataArray = [];
		}

		$('#checkpointTable').DataTable().rows.add(fullArray);
		$('#checkpointTable').DataTable().columns.adjust().draw();
	}
}

function ticmWorkTimeRegister_printGetHolidays(data) {
	$("#holidaysTable").DataTable().clear().draw();

	// Check if object is not empty
	var fullArray = [];
	if (Object.keys(data).length >= 1) {
		var dataArray = [];
		for (const key in data) {
			var registerType = "Indefinida";
			if (data[key].type === 1) registerType = "Vacaciones";
			if (data[key].type === 2) registerType = "Libre Disposición";
			if (data[key].type === 3) registerType = "Formación";
			if (data[key].type === 4) registerType = "Baja laboral";
			dataArray.push(`<td class="text-center">
                                <div class="list-icons">
                                    <div class="dropdown">
                                        <a href="#" class="list-icons-item" data-toggle="dropdown">
                                            <i class="icon-menu9"></i>
                                        </a>

                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a href="#" onClick="ticmWorkTimeRegister_editHolidays(${data[key].id},${data[key].day},${data[key].hours},${data[key].type})" class="dropdown-item"><i class="icon-pencil3"></i> Edit</a>
                                        </div>
                                    </div>
                                </div>
                            </td>`);
			dataArray.push(new Date(data[key].day * 1000).toLocaleString());
			dataArray.push(registerType);
			dataArray.push(data[key].hours);
			fullArray.push(dataArray);
			dataArray = [];
		}

		$('#holidaysTable').DataTable().rows.add(fullArray);
		$('#holidaysTable').DataTable().columns.adjust().draw();
	}
}
