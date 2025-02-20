import express from "express";
import getAdminStats from "../controller/statsController.js";

const blogStatsrouter = express.Router();

blogStatsrouter.get("/stats", getAdminStats);

export default blogStatsrouter;
