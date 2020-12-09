/**
 * view
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



function ticmWorkTimeRegister_printGetRegisters(dataArray) {
	if (dataArray <= 0) return;

	$("#ticmWorkTimeRegister_dashboardInfoTable").html("");
	var elements2Show = 5;
	var data = dataArray.reverse();
	for (var ele in data) {
		if (elements2Show > 0) {

			var date = new Date(data[ele].checkpoint * 1000);
			var typeIcon;
			switch (data[ele].type) {
				case 1:
					typeIcon = "icon-enter3";
					break;
				case 2:
					typeIcon = "icon-exit3";
					break;
				default:
					typeIcon = "mi-touch-app";
					break;
			}


			$("#ticmWorkTimeRegister_dashboardInfoTable").append(`
				<tr>
					<td>
						<div class="d-flex align-items-center">
							<div class="mr-3">
								<span class="${typeIcon}"></span>

							</div>
							<div>
								<span class="text-muted font-size-sm">${date.yyyymmddhhmmss()}</span>
							</div>
						</div>
					</td>
				</tr>`);
		}
		elements2Show--;
	}

}


