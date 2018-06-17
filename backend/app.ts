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

// import UsersRouter from "./routers/UsersRouter";
// import OrdersRouter from "./routers/OrdersRouter";
// import ItemsRouter from "./routers/ItemsRouter";
// import PricesRouter from "./routers/PricesRouter";

dotenv.config();
const knex = Knex(KnexConfig[config.env]);
const app = express();

const usersService = new UsersService(knex);
const itemsService = new ItemsService(knex);
const ordersService = new OrdersService(knex);
const pricesService = new PricesService(knex);

const jwtAuth = jwtStrategy(usersService);
const apiRouter = new ApiRouter(jwtAuth, usersService, itemsService, ordersService, pricesService, knex);

// const usersRouter = new UsersRouter(usersService);
// const itemsRouter = new ItemsRouter(itemsService);
// const ordersRouter = new OrdersRouter(ordersService);
// const pricesRouter = new PricesRouter(pricesService);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", apiRouter.getRouter());

// app.use("/api/users", usersRouter.router());
// app.use("/api/items", itemsRouter.router());
// app.use("/api/orders", ordersRouter.router());
// app.use("/api/prices", pricesRouter.router());

app.listen(config.port, () => {
  console.log(`Application started at port: ${config.port}`);
});
