import { getDB } from "../db/DB";
import {
  ControllerType,
  SignUpBodyType,
  SignUpDataType,
} from "../types/ControllersTypes";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import Mail from "../utils/Mail";

export const SignUp: ControllerType = {
  path: "/signup",
  method: "post",
  handler: async (req, res) => {
    const { first_name, last_name, email, password } = await req?.body;

    if (ValidateBody(req.body)) {
      const findLength = (
        await getDB().find({ "profile.email": email }).toArray()
      ).length;

      if (findLength == 0) {
        const passwordHash = await bcrypt.hash(password, 10);
        const confirmationId = uuid();

        try {
          getDB()
            .insertOne(
              SignUpData({
                first_name,
                last_name,
                email,
                password: passwordHash,
                confirmation_id: confirmationId,
              })
            )
            .then((data) => {
              Mail({
                firstName: first_name,
                lastName: last_name,
                confirmationId,
              })
                .then((mailData) => {
                  res.json({
                    message: `Created user ${data.insertedId}`,
                  });
                })
                .catch((err) => {
                  res.status(500).send({ message: "Something went wrong" });
                  console.log(err);
                });
            });
        } catch (err) {
          res.status(500).json({ message: `Couldn't create user ${err}` });
        }
      } else {
        res
          .status(409)
          .json({ message: "An account with the email already exists" });
      }
    } else {
      res.sendStatus(400);
    }
  },
};

const SignUpData = ({
  first_name,
  last_name,
  email,
  password,
  confirmation_id,
}: SignUpDataType) => {
  return {
    profile: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      confirmedAccount: false,
      image: "",
      confirmation_id: confirmation_id,
    },
    account: {
      balance: 0,
      verifiedMerchant: false,
      pin: null,
    },
  };
};

const ValidateBody = (body: SignUpBodyType) => {
  if (body.first_name && body.last_name && body.email && body.password) {
    return Object.values(body).includes("") ||
      Object.values(body).includes(null)
      ? false
      : true;
  } else {
    return false;
  }
};
