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

export const CreateRegion = async (req: Request, res: Response) => {
  let uploadedFileUrl: string = "";

  try {
    const { region_name } = req.body;
    if (!hasData(region_name)) {
      throw new Error("region_name is required");
    }

    // const { files } = req;

    // if (files || Object.keys(files).length > 0) {
    //   try {
    //     uploadedFileUrl = await FileUploadToLocalServer({
    //       req,
    //       pathToUpload: "region",
    //       fileTypes: [".webp", ".png", ".jpg", ".jpeg"],
    //     });
    //   } catch (error: any) {
    //     DeleteLocalServerFile(uploadedFileUrl);
    //     return errorResponse(res, error.message);
    //   }
    // }
    let newRegion: Region = new Region();
    newRegion.region_name = region_name;
    // newRegion.img = uploadedFileUrl;
    let inserted = await AppDataSource.manager.save(Region, newRegion);

    return toJson(res, {
      data: {
        message: "Region created successfully",
      },
    });
  } catch (error) {
    
    DeleteLocalServerFile(uploadedFileUrl);
    return errorResponse(res, error);
  }
};
