
/**
 * api - ticmWorkTimeRegister
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

import { Request, Response, Router } from "express";
const api: Router = Router();
import { settingsInstance } from "../../../core/Settings";
import { ticWTRInstance } from "../controller/TicmWorkTimeRegister";

/**
 * POST Checkpoint
 * @description Insert a checkpoint
 */
api.post("/set", async (req: Request, res: Response) => {

	const response: ResponseDT = {
		status: false,
		data: [],
		message: "",
		size: 0,
		time: new Date().toLocaleString()
	};

	const user: SettingsUserDT = settingsInstance.getUser(req);

	let purpose: number = 3;
	if (req.body.purpose === "enter") purpose = 1;
	if (req.body.purpose === "exit") purpose = 2;

	const touch: TicmWorkTimeRegisterDT = {
		checkpoint: Math.floor(new Date().getTime() / 1000),
		type: purpose,
		user: user.profile.id || 0,
		latitude: req.body.geolocation.latitude || undefined,
		longitude: req.body.geolocation.longitude || undefined,
		platform: req.headers["user-agent"] || undefined,
		address: req.connection.remoteAddress || undefined,
	};

	const data: ResponseDT = await ticWTRInstance.setCheckpoint(touch);
	if (data.status) {
		console.log(`[INFO] ticmWorkTimeRegister: POST/set: Checkpoint saved by [ID.${user.profile.id}] ${user.profile.name}`);
		response.status = true;
		response.message = "Checkpoint saved";
	} else {
		console.error(`[ERROR] ticmWorkTimeRegister: POST/set: Can't save checkpoint. ${JSON.stringify(data)}`);
		response.message = `ERROR: ticmWorkTimeRegister: POST/set: Please contact with your administrator and report this issue directly with next info. ${JSON.stringify(data)}`;
	}

	return res.json(response);
});


/**
 * POST Checkpoint
 * @description Insert a checkpoint
 */
api.post("/setCheckpoint", async (req: Request, res: Response) => {

	const response: ResponseDT = {
		status: false,
		data: [],
		message: "",
		size: 0,
		time: new Date().toLocaleString()
	};

	const user: SettingsUserDT = settingsInstance.getUser(req);

	const touch: TicmWorkTimeRegisterDT = {
		id: parseInt(req.body.id) || undefined,
		checkpoint: parseInt(req.body.date),
		type: parseInt(req.body.type),
		user: parseInt(req.body.user),
		latitude: undefined,
		longitude: undefined,
		platform: undefined,
		address: undefined,
	};

	const data: ResponseDT = await ticWTRInstance.setCheckpoint(touch);
	if (data.status) {
		console.log(`[INFO] ticmWorkTimeRegister: POST/setCheckpoint: Checkpoint updated by [ID.${user.profile.id}] ${user.profile.name}`);
		response.status = true;
		response.message = "Checkpoint saved";
	} else {
		console.error(`[ERROR] ticmWorkTimeRegister: POST/setCheckpoint: Can't update checkpoint. ${JSON.stringify(data)}`);
		response.message = `ERROR: ticmWorkTimeRegister: POST/setCheckpoint: Please contact with your administrator and report this issue directly with next info. ${JSON.stringify(data)}`;
	}

	return res.json(response);
});

/**
 * POST Checkpoint
 * @description Insert a checkpoint
 */
api.post("/setHolidays", async (req: Request, res: Response) => {

	const response: ResponseDT = {
		status: false,
		data: [],
		message: "",
		size: 0,
		time: new Date().toLocaleString()
	};

	const user: SettingsUserDT = settingsInstance.getUser(req);

	const touch: TicmWorkTimeHolidayDT = {
		id: parseInt(req.body.id) || undefined,
		type: parseInt(req.body.type),
		id_user: parseInt(req.body.user),
		day: parseInt(req.body.date),
		hours: parseFloat(req.body.hours),
		status: 2
	};

	const data: ResponseDT = await ticWTRInstance.setHoliday(touch);
	if (data.status) {
		console.log(`[INFO] ticmWorkTimeRegister: POST/setHoliday: Holiday updated by [ID.${user.profile.id}] ${user.profile.name}`);
		response.status = true;
		response.message = "Checkpoint saved";
	} else {
		console.error(`[ERROR] ticmWorkTimeRegister: POST/setHoliday: Can't update holiday. ${JSON.stringify(data)}`);
		response.message = `ERROR: ticmWorkTimeRegister: POST/setHoliday: Please contact with your administrator and report this issue directly with next info. ${JSON.stringify(data)}`;
	}

	return res.json(response);
});

/**
 * GET Checkpoints
 * @description Get all checkpoints
 */
api.get("/get", async (req: Request, res: Response) => {

	const response: ResponseDT = {
		status: false,
		data: [],
		message: "",
		size: 1,
		time: new Date().toLocaleString()
	};


	const user: SettingsUserDT = JSON.parse(JSON.stringify(settingsInstance.getUser(req)));
	if (req.query.id !== undefined && !isNaN(Number(String(req.query.id)))) user.profile.id = parseInt(String(req.query.id));


	const checkpoints: ResponseDT = await ticWTRInstance.getCheckpoints(user);
	if (!checkpoints.status) return res.json(response);


	const journal: ResponseDT = await ticWTRInstance.getJournal(user);
	if (!journal.status) return res.json(response);


	const vacationCalendar: ResponseDT = await ticWTRInstance.getVacationCalendar();
	if (!journal.status) return res.json(response);

	const holidays: ResponseDT = await ticWTRInstance.getHolidays(user);
	if (!holidays.status) return res.json(response);


	const data: any = {};
	data.user = {
		id: user.profile.id
	};
	data.checkpoint = checkpoints.data;
	data.journal = journal.data;
	data.vacationCalendar = vacationCalendar.data;
	data.holidays = holidays.data;


	response.status = true;
	response.data.push(data);

	return res.json(response);
});

/**
 * GET Checkpoints
 * @description Get all checkpoints, vacations, ...
 */
api.get("/getAll", async (req: Request, res: Response) => {

	const response: ResponseDT = {
		status: false,
		data: [],
		message: "",
		size: 1,
		time: new Date().toLocaleString()
	};


	const user: SettingsUserDT = JSON.parse(JSON.stringify(settingsInstance.getUser(req)));
	if (req.query.id !== undefined && !isNaN(Number(String(req.query.id)))) user.profile.id = parseInt(String(req.query.id));


	const checkpoints: ResponseDT = await ticWTRInstance.getCheckpointsDetail(user);
	if (!checkpoints.status) return res.json(response);



	const holidays: ResponseDT = await ticWTRInstance.getHolidaysDetail(user);
	if (!holidays.status) return res.json(response);


	const data: any = {};
	data.user = {
		id: user.profile.id
	};
	data.checkpoint = checkpoints.data;
	data.holidays = holidays.data;


	response.status = true;
	response.data.push(data);

	return res.json(response);
});

/**
 * GET Users
 * @description Get users with this functionality
 */
api.get("/users", async (req: Request, res: Response) => {

	const users: ResponseDT = await ticWTRInstance.getUsers();
	if (users.status) {
		return res.json(users);
	}
});



export const ticmWorkTimeRegisterController: Router = api;