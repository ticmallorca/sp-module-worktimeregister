/**
 * TicmWorkTimeRegister
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */


import { MySQL } from "../../../../core/entity/database/MySQL";

class TicmWorkTimeRegister {

	private ddbb: any;

	constructor () {
		this.ddbb = new MySQL();
	}

	/**
	 * getUsers
	 * @description
	 * @returns
	 */
	async getUsers() {
		const query: string = `SELECT u.id, u.name, u.surname, u.email FROM user as u, user_module_entity as ume, entity as e WHERE u.id = ume.id_user AND e.id = ume.id_entity AND e.id = 48 AND ume.id_module = 10`;
		const args: any = [];
		const responseQuery = await this.ddbb.doQuery(query, args);
		return responseQuery;
	}

	/**
	 * getCheckpoints
	 * @description
	 * @param [number] userId
	 * @returns
	 */
	async getCheckpoints(userId: number) {
		const query: string = `SELECT checkpoint, type FROM worktimeregister_checkpoint AS wtrC WHERE wtrC.id_user = ? ORDER BY wtrC.created ASC`;
		const args = [
			userId
		];
		const responseQuery = await this.ddbb.doQuery(query, args);
		return responseQuery;
	}

	/**
	 * getCheckpointsDetail
	 * @description
	 * @param [number] userId
	 * @returns
	 */
	async getCheckpointsDetail(userId: number) {
		const query: string = `SELECT * FROM worktimeregister_checkpoint AS wtrC WHERE wtrC.id_user = ? ORDER BY wtrC.created desc`;
		const args = [
			userId
		];
		const responseQuery = await this.ddbb.doQuery(query, args);
		return responseQuery;
	}

	/**
	 * getLastCheckpoint
	 * @description
	 * @param [number] userId
	 * @returns
	 */
	async getLastCheckpoint(userId: number) {
		const query: string = `SELECT * FROM worktimeregister_checkpoint AS wtrC WHERE wtrC.id_user = ? ORDER BY wtrC.created DESC LIMIT 1`;
		const args = [
			userId
		];
		const responseQuery = await this.ddbb.doQuery(query, args);
		return responseQuery;
	}

	/**
	 * getJournal
	 * @description
	 * @param [number] userId
	 * @returns
	 */
	async getJournal(userId: number) {
		const query: string = `SELECT hours,created FROM worktimeregister_journal AS wtrJ WHERE wtrJ.id_user = ? ORDER BY wtrJ.created DESC`;
		const args = [
			userId
		];
		const responseQuery = await this.ddbb.doQuery(query, args);
		return responseQuery;
	}

	/**
	 * getHolidays
	 * @description
	 * @param [number] userId
	 * @returns
	 */
	async getHolidays(userId: number) {
		const query: string = `SELECT
									H.id AS id,
									H.id_user AS userID,
									H.id_user AS typeID,
									H_TYPE.name AS typeName,
									H.status AS statusID,
									H_STATUS.name AS statusName,
									H.day AS day,
									H.hours AS hours,
									H.created AS created
								FROM
									worktimeregister_holiday_type AS H_TYPE,
									worktimeregister_holiday_status AS H_STATUS,
									worktimeregister_holiday AS H
								WHERE
									H.id_user = ? AND
									H.status = H_STATUS.id AND
									H.type = H_TYPE.id`;
		const args = [
			userId
		];
		const responseQuery = await this.ddbb.doQuery(query, args);
		return responseQuery;
	}

	/**
	 * getHolidaysDetail
	 * @description
	 * @param [number] userId
	 * @returns
	 */
	async getHolidaysDetail(userId: number) {
		const query: string = `SELECT
									*
								FROM
									worktimeregister_holiday AS H
								WHERE
									H.id_user = ?`;
		const args = [
			userId
		];
		const responseQuery = await this.ddbb.doQuery(query, args);
		return responseQuery;
	}

	/**
	 * getVacationCalendar
	 * @description
	 * @returns
	 */
	async getVacationCalendar() {
		const query: string = `SELECT date, description FROM worktimeregister_vacation_calendar ORDER BY id`;
		const responseQuery = await this.ddbb.doQuery(query, []);
		return responseQuery;
	}

	/**
	 * setCheckpoint
	 * @description
	 * @param [TicmWorkTimeRegisterDT] data
	 * @returns
	 */
	async setCheckpoint(data: TicmWorkTimeRegisterDT) {
		const checkpoint: TicmWorkTimeRegisterDT = data;

		let query: string;
		let args: any;
		if (data.id !== undefined) {

			query = `UPDATE worktimeregister_checkpoint SET checkpoint=?, type=?, updated=UNIX_TIMESTAMP()  WHERE id=? AND id_user=?`;
			args = [
				checkpoint.checkpoint,
				checkpoint.type,
				checkpoint.id,
				checkpoint.user
			];
		}
		else {

			query = `INSERT INTO worktimeregister_checkpoint VALUES (DEFAULT,?,?,?,?,?,?,?,UNIX_TIMESTAMP(),UNIX_TIMESTAMP())`;
			args = [
				checkpoint.user,
				checkpoint.checkpoint,
				checkpoint.type,
				0.0,
				0.0,
				"",
				""
			];

		}
		const responseQuery = await this.ddbb.doQuery(query, args);
		return responseQuery;
	}

	/**
	 * setHoliday
	 * @description
	 * @param [TicmWorkTimeHolidayDT] data
	 * @returns
	 */
	async setHoliday(data: TicmWorkTimeHolidayDT) {
		const holiday: TicmWorkTimeHolidayDT = data;

		let query: string;
		let args: any;
		if (data.id !== undefined) {

			query = `UPDATE worktimeregister_holiday SET type=?, day=?, hours=? WHERE id=? AND id_user=?`;
			args = [
				holiday.type,
				holiday.day,
				holiday.hours,
				holiday.id,
				holiday.id_user
			];
		}
		else {

			query = `INSERT INTO worktimeregister_holiday VALUES (DEFAULT,?,?,?,?,?,UNIX_TIMESTAMP())`;
			args = [
				holiday.id_user,
				holiday.type,
				holiday.day,
				holiday.hours,
				holiday.status
			];

		}
		const responseQuery = await this.ddbb.doQuery(query, args);
		return responseQuery;
	}
}

export let daoTicmWorkTimeRegisterInstance = new TicmWorkTimeRegister();
