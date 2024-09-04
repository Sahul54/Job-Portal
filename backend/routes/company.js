import express from "express"; 
import { getCompany, registerCompany, updateCompany } from "../controllers/company.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const companyRoute = express.Router();

companyRoute.route("/register").post(isAuthenticated, registerCompany);
companyRoute.route("/get").get(isAuthenticated, getCompany);
companyRoute.route("/get/:id").get(isAuthenticated, getCompany);
companyRoute.route("/profile/update/:id").put(isAuthenticated, updateCompany);

export default companyRoute;
