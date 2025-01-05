import { Request, Response } from "express";
import {
  cToBooleanSafe,
  DeleteLocalServerFile,
  errorResponse,
  FileUploadToLocalServer,
  hasData,
  toJson,
} from "node_custom_utils";
import { AppDataSource } from "../../../src/data-source";
import { Region } from "../../../src/entity/Region";
import { Country } from "../../../src/entity/country";

export const createCountry = async (req: Request, res: Response) => {
  try {
    const { country_name, country_code, time_zone, capital, Region_id } =
      req.body;
    if (!hasData(country_name)) {
      throw new Error("country_name is required");
    }

    if (!hasData(country_code)) {
      throw new Error("country_code is required");
    }

    let regionData;
    regionData = await AppDataSource.manager.findOne(Region, {
      where: {
        id: Region_id,
      },
    });
    if (!regionData) {
      throw new Error("check the region id");
    }

    let newCountry: Country = new Country();
    newCountry.country_name = country_name;
    newCountry.country_code = country_code;
    newCountry.time_zone = time_zone;
    newCountry.capital = capital;
    newCountry.Region = regionData;

    let inserted = await AppDataSource.manager.save(Country, newCountry);

    return toJson(res, {
      data: {
        message: "country created successfully",
      },
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
