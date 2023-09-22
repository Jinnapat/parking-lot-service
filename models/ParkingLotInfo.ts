import mongoose from "mongoose";

const parkingLotInfoSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  latitude: {
    type: Number,
    require: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});

const parkingLotInfoModel = mongoose.model(
  "ParkingLotInfo",
  parkingLotInfoSchema,
);
export { parkingLotInfoModel };
