import { Request, Response } from "express";
import {
  cToBooleanSafe,
  errorResponse,
  hasData,
  toJson,
} from "node_custom_utils";
import { AppDataSource } from "../../../src/data-source";
import { getPaginationValues } from "../../../utils/pagination";
import { Country } from "../../../src/entity/country";
import moment = require("moment");

export const CountryList = async (req: Request, res: Response) => {
  try {
    const pagination = getPaginationValues(req.params.page);
    const { country_code, region, search } = req.query;
    const query = await AppDataSource.manager
      .getRepository(Country)
      .createQueryBuilder("c")
      .leftJoinAndSelect("c.Region", "r")

      .select("c.id", "id")
      .addSelect("c.country_name", "country_name")
      .addSelect("c.country_code", "country_code")
      .addSelect("c.time_zone", "time_zone")
      .addSelect("c.capital", "capital")
      .addSelect("c.status", "status")
      .addSelect("c.createdAt", "createdAt")
      .addSelect("c.updatedAt", "updatedAt")

      .addSelect(
        `(
          CASE
              WHEN NULLIF(r.id, '') IS NULL THEN NULL
              ELSE JSON_OBJECT(
                  'id', CAST(r.id AS CHAR), 
                  'region_name', r.region_name,
                  'createdAt', r.createdAt,
                  'updatedAt', r.updatedAt
                  
              )
          END
      )`,
        "regionData"
      );

    if (hasData(country_code)) {
      query.andWhere("c.country_code =:country_code", {
        country_code: country_code,
      });
    }

    if (hasData(region)) {
      query.andWhere("r.id =:id", {
        id: region,
      });
    }

    if (hasData(search)) {
      query.andWhere(
        `(c.country_name LIKE :search OR c.capital LIKE :search  OR r.region_name LIKE :search  OR c.time_zone LIKE :search )`,
        {
          search: `%${search}%`,
        }
      );
    }

    const [total_count, rawCountries] = await Promise.all([
      query.getCount(),
      query
        .orderBy("c.createdAt", "DESC")
        .offset(pagination.skip)
        .limit(pagination.limit)
        .getRawMany(),
    ]);

    const country = rawCountries.map((countryie) => ({
      ...countryie,
      current_time: moment().format("HH:mm:ss"), // Adjust format as needed
    }));


    return toJson(res, {
      data: {
        country,
        total_count,
        limit: pagination.limit,
      },
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
