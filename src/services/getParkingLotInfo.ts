import { Request, Response } from "express";
import { parkingLotInfoModel } from "../../models/ParkingLotInfo";

const getParkingLotInfoHandler = async (req: Request, res: Response) => {
  if (!req.params.id) res.status(400).send("Some fields are missing.");
  const id = req.params.id;
  const parkingLotInfo = await parkingLotInfoModel.findOne({ id: id });
  if (parkingLotInfo == null) {
    res.status(400).send("No parkingLot with that id");
    return;
  }
  res.status(200).json(parkingLotInfo);
};

export { getParkingLotInfoHandler };
