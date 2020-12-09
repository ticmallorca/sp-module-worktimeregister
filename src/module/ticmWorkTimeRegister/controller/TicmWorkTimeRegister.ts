/**
 * TicmWorkTimeRegister
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

import { daoTicmWorkTimeRegisterInstance } from "./dao/TicmWorkTimeRegister";

class TicmWorkTimeRegister {

	constructor () { }


	/**
	 * getUsers
	 * @description
	 * @returns {ResponseDT}
	 */
	async getUsers() {
		return await daoTicmWorkTimeRegisterInstance.getUsers();
	}

	/**
	 * getCheckpoints
	 * @description
	 * @param {SettingsUserDT} user
	 * @returns {ResponseDT}
	 */
	async getCheckpoints(user: SettingsUserDT) {
		const userId = user.profile.id || 0;
		return await daoTicmWorkTimeRegisterInstance.getCheckpoints(userId);
	}

	/**
	 * getLastCheckpoint
	 * @description
	 * @param {SettingsUserDT} user
	 * @returns {ResponseDT}
	 */
	async getLastCheckpoint(user: number) {
		const userId = user || 0;
		return await daoTicmWorkTimeRegisterInstance.getLastCheckpoint(userId);
	}

	/**
	 * getJournal
	 * @description
	 * @param {SettingsUserDT} user
	 * @returns {ResponseDT}
	 */
	async getJournal(user: SettingsUserDT) {
		const userId = user.profile.id || 0;
		return await daoTicmWorkTimeRegisterInstance.getJournal(userId);
	}

	/**
	 * getVacationCalendar
	 * @description
	 * @returns {ResponseDT}
	 */
	async getVacationCalendar() {
		return await daoTicmWorkTimeRegisterInstance.getVacationCalendar();
	}


	/**
	 * setCheckpoint
	 * @description
	 * @param {TicmWorkTimeRegisterDT} touch
	 * @returns
	 */
	async setCheckpoint(touch: TicmWorkTimeRegisterDT) {

		const retReport = await daoTicmWorkTimeRegisterInstance.setCheckpoint(touch);
		return retReport;
	}

	/**
	 * setHoliday
	 * @description
	 * @param {TicmWorkTimeHolidayDT} holiday
	 * @returns
	 */
	async setHoliday(holiday: TicmWorkTimeHolidayDT) {

		const retReport = await daoTicmWorkTimeRegisterInstance.setHoliday(holiday);
		return retReport;
	}


	/**
	 * getHolidays
	 * @description
	 * @param [SettingsUserDT] user
	 * @returns [ResponseDT]
	 */
	async getHolidays(user: SettingsUserDT): Promise<ResponseDT> {
		const userId = user.profile.id || 0;
		return await daoTicmWorkTimeRegisterInstance.getHolidays(userId);
	}


	/**
	 * getCheckpointsDetail
	 * @description
	 * @param {SettingsUserDT} user
	 * @returns {ResponseDT}
	 */
	async getCheckpointsDetail(user: SettingsUserDT) {
		const userId = user.profile.id || 0;
		return await daoTicmWorkTimeRegisterInstance.getCheckpointsDetail(userId);
	}

	/**
	 * getHolidaysDetail
	 * @description
	 * @param {SettingsUserDT} user
	 * @returns {ResponseDT}
	 */
	async getHolidaysDetail(user: SettingsUserDT) {
		const userId = user.profile.id || 0;
		return await daoTicmWorkTimeRegisterInstance.getHolidaysDetail(userId);
	}


}

export let ticWTRInstance = new TicmWorkTimeRegister();
