import "reflect-metadata";
import { DataSource } from "typeorm";

import { Region } from "./entity/Region";
import { Country } from "./entity/country";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "machine_test",
  synchronize: true,
  logging: true,
  entities: [Region, Country],
  migrations: [],
  subscribers: [],
});
