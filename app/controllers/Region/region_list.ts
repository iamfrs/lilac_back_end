import { Request, Response } from "express";
import {
  cToBooleanSafe,
  errorResponse,
  hasData,
  toJson,
} from "node_custom_utils";
import { AppDataSource } from "../../../src/data-source";
import { getPaginationValues } from "../../../utils/pagination";
import { Region } from "../../../src/entity/Region";

export const RegionList = async (req: Request, res: Response) => {
  try {
    const pagination = getPaginationValues(req.params.page);
    const { search } = req.query;
    const query = await AppDataSource.manager
      .getTreeRepository(Region)
      .createQueryBuilder("r")
      .select("r.id", "id")
      .addSelect("r.region_name", "region_name")
      .addSelect("r.status", "status")
      .addSelect("r.createdAt", "createdAt")
      .addSelect("r.updatedAt", "updatedAt")
      .addSelect(
        `CASE 
            WHEN NULLIF(r.img, '') IS NULL  THEN '${null}' 
              ELSE CONCAT('http://localhost:5000/img', r.img
            ) 
        END`,
        "img"
      );

    if (hasData(search)) {
      query.andWhere(`(r.region_name LIKE :search OR   )`, {
        search: `%${search}%`,
      });
    }

    const [total_count, region] = await Promise.all([
      query.getCount(),
      query
        .orderBy("r.createdAt", "DESC")
        .offset(pagination.skip)
        .limit(pagination.limit)
        .getRawMany(),
    ]);

    return toJson(res, {
      data: {
        region,
        total_count,
        limit: pagination.limit,
      },
    });
  } catch (error) {
    console.log("404 data not found");

    return errorResponse(res, error);
  }
};
