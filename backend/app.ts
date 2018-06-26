import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as Knex from "knex";

import config from "./config";
import * as KnexConfig from "./knexfile";
import ApiRouter from "./routers/ApiRouter";
import jwtStrategy from "./util/auth/jwtStrategy";

import ItemsService from "./services/ItemsService";
import OrdersService from "./services/OrdersService";
import PaymentsService from "./services/PaymentsService"
import PricesService from "./services/PricesService";
import UsersService from "./services/UsersService";

dotenv.config();
const knex = Knex(KnexConfig[config.env]);
const app = express();

const usersService = new UsersService(knex);
const itemsService = new ItemsService(knex);
const ordersService = new OrdersService(knex);
const pricesService = new PricesService(knex);
const paymentsService = new PaymentsService(knex);

const jwtAuth = jwtStrategy(usersService);
const apiRouter = new ApiRouter(jwtAuth, usersService, itemsService, ordersService, pricesService, paymentsService, knex);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", apiRouter.getRouter());

// @Andrew do not use this one, it will break the socket
// app.listen(config.port, () => {
//   console.log(`Application started at port: ${config.port}`);
// });

import * as http from "http";
const server = http.createServer(app);
server.listen(8080);

import * as socketIO from "socket.io";
export const io = socketIO();
io.attach(server);

io.on("connection", (socket: any) => {
  console.log("socket connected: ", socket.id);
  io.to(socket.id).emit("action", { type: "SOCKET_CONNECT_SUCCESS", socketID: socket.id });

  // socket.on("action", (action: any) => {
  //   // empty
  // });
});

