import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as Knex from "knex";

import config from "./config";
import * as KnexConfig from "./knexfile";
import ApiRouter from "./routers/ApiRouter";
import jwtStrategy from "./util/auth/JwtStrategy";

import ItemsService from "./services/ItemsService";
import OrdersService from "./services/OrdersService";
import PricesService from "./services/PricesService";
import UsersService from "./services/UsersService";

dotenv.config();
const knex = Knex(KnexConfig[config.env]);
const app = express();

const usersService = new UsersService(knex);
const itemsService = new ItemsService(knex);
const ordersService = new OrdersService(knex);
const pricesService = new PricesService(knex);

const jwtAuth = jwtStrategy(usersService);
const apiRouter = new ApiRouter(jwtAuth, usersService, itemsService, ordersService, pricesService, knex);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", apiRouter.getRouter());

app.listen(config.port, () => {
  console.log(`Application started at port: ${config.port}`);
});
