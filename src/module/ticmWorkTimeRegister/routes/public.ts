/**
 * public
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */
import { Request, Response, Router } from "express";
const api: Router = Router();
import { settingsInstance } from "../../../core/Settings";

api.get("/registers", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "ticmWorkTimeRegister - Registers");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "ticmWorkTimeRegister",
		component: "panel"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});

api.get("/management", async (req: Request, res: Response) => {
	settingsInstance.setPageTitle(req, "ticmWorkTimeRegister - Management");
	const currentPanel: SettingsCurrentPanelDT = {
		module: "ticmWorkTimeRegister",
		component: "management"
	};
	settingsInstance.setCurrentPanel(req, currentPanel);
	return res.render("pages/base", await settingsInstance.getSettings(req));
});

export const ticmWorkTimeRegisterController: Router = api;