import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Response } from "express";

export const JWTSign = (Data: JWTSignDataType, res: Response) => {
  const PrivateKey = process.env.JWT_KEY ?? "";

  jwt.sign(
    Data,
    PrivateKey,
    {
      expiresIn: "2d",
      algorithm: "HS384",
    },
    (err, encoded) => {
      if (err) {
        res.status(500).send({ message: "Something went wrong" });
      } else {
        res.status(200).send({
          ...Data,
          token: encoded,
        });
      }
    }
  );
};

interface JWTSignDataType {
  id: ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  verified_merchant: boolean;
  confirmed_account: boolean;
  balance: number;
}
