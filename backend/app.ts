import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as Knex from "knex";
import * as cors from "cors";

import * as KnexConfig from "./knexfile";

import UsersRouter from "./routers/UsersRouter";
import UsersService from "./services/UsersService";

import ItemsRouter from "./routers/ItemsRouter";
import ItemsService from "./services/ItemsService";

import OrdersRouter from "./routers/OrdersRouter";
import OrdersService from "./services/OrdersService";

import PricesRouter from "./routers/PricesRouter";
import PricesService from "./services/PricesService";

dotenv.config();

const PORT = process.env.PORT || '8080';
const NODE_ENV = process.env.NODE_ENV || 'development';
const knex = Knex(KnexConfig[NODE_ENV]);

const app = express();

let usersService = new UsersService(knex);
let usersRouter = new UsersRouter(usersService);

let itemsService = new ItemsService(knex);
let itemsRouter = new ItemsRouter(itemsService);

let ordersService = new OrdersService(knex);
let ordersRouter = new OrdersRouter(ordersService);

let pricesService = new PricesService(knex);
let pricesRouter = new PricesRouter(pricesService);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/users", usersRouter.router());
app.use("/api/items", itemsRouter.router());
app.use("/api/orders", ordersRouter.router());
app.use("/api/orders", pricesRouter.router());

app.listen(PORT,() => {
    console.log(`Application started at port: ${PORT}`);
});

