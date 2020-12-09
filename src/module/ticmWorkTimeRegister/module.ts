/**
 * module ticmWorkTimeRegister
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */
import { ticWTRInstance } from "./controller/TicmWorkTimeRegister";
import settings from "./settings.json";
export class Module {

	private configuration: SettingsModuleDT;

	constructor() {
		console.log("* Module TicM Work Time Register Instantiated at " + new Date().toLocaleString() + " *");
	}
	async init(user: SettingsUserDT) {
		this.configuration = JSON.parse(JSON.stringify(settings));

		if (user.profile.id === ?) {
			const userList: ResponseDT = await ticWTRInstance.getUsers();
			this.configuration.settings.users = userList.data;
			this.configuration.settings.isAdmin = true;
		}

		for (const i in this.configuration.language) {
			const lang = await require("./language/" + i + ".json");
			this.configuration.language[i] = lang;
		}

	}
	public getSettings() {
		return this.configuration;
	}
}
