import express from "express";
import { getParkingLotInfoHandler } from "./services/getParkingLotInfo";
import mongoose from "mongoose";
import { config } from "dotenv";
import { getServer } from "./services/viewParkingLots";
import { ServerCredentials } from "@grpc/grpc-js/build/src/server-credentials";
config({ path: "./.env" });

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URL as string);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Conneted to database"));

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.get("/getParkingLotInfo/:id", getParkingLotInfoHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

var viewParkingLotServer = getServer();
viewParkingLotServer.bindAsync(
  "0.0.0.0:50051",
  ServerCredentials.createInsecure(),
  () => {
    viewParkingLotServer.start();
    console.log(`gRPC server running at http://localhost:50051`);
  },
);
