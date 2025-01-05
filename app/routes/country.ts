import * as express from "express";
import { createCountry } from "../controllers/country/create_country";
import { CountryList } from "../controllers/country/view_country_list";

const countryRouter = express.Router();
countryRouter.post("/create", createCountry);

countryRouter.get("/list/:page", CountryList);
export default countryRouter;
