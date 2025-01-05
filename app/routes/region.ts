import * as express from "express";
import { CreateRegion } from "../controllers/Region/create_region";
import { RegionList } from "../controllers/Region/region_list";

const regionRouter = express.Router();
regionRouter.post("/create", CreateRegion);

regionRouter.get("/list/:page", RegionList);
export default regionRouter;
