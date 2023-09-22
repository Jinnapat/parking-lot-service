import { loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import sqlite3 from "sqlite3";
import { Server } from "@grpc/grpc-js/build/src/server";

const PROTO_PATH = __dirname + "../../../../proto/ViewParkingLot.proto";

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = loadPackageDefinition(packageDefinition);
const viewparkinglot = protoDescriptor.viewparkinglot as any;

function createDbConnection(filepath: string) {
  console.log(filepath);
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  console.log("Connection with SQLite has been established");
  return db;
}

const sqliteDB = createDbConnection("./viewParkingLot.db");

const viewParkingLot = (call: any, callback: any) => {
  const parkingLotId = call.request.id as Number;
  sqliteDB.get(
    "SELECT * FROM viewparkinglot WHERE id=?;",
    [parkingLotId.toString()],
    (err: Error | null, row: any) => {
      if (row) {
        callback(null, {
          id: row.id,
          name: row.name,
          available: row.available,
        });
      }
    },
  );
};

function getServer() {
  var server = new Server();
  server.addService(viewparkinglot.ViewParkingLot.service, {
    viewParkingLot: viewParkingLot,
  });
  return server;
}

export { viewparkinglot, viewParkingLot, getServer };
