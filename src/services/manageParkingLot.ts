import { Request, Response } from "express";

const manageParkingLotHandler = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
};

export { manageParkingLotHandler };
