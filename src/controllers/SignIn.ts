import { getDB } from "../db/DB";
import { ControllerType, SignInBody } from "../types/ControllersTypes";
import { JWTSign } from "./auth/Auth";
import bcrypt from "bcrypt";

const ValidateBody = (body: SignInBody) => {
  if (body.email && body.password) {
    return Object.values(body).includes("") ||
      Object.values(body).includes(null)
      ? false
      : true;
  } else {
    return false;
  }
};

export const SignIn: ControllerType = {
  path: "/signin",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = await req?.body;

    if (ValidateBody(req.body)) {
      await getDB()
        .findOne({
          "profile.email": email,
        })
        .then(async (data) => {
          if (data) {
            const { password: storedPassword } = data.profile;
            const isCorrectPassword = await bcrypt.compare(
              password,
              storedPassword
            );

            if (!data || !isCorrectPassword) {
              res.status(401).json({ message: "Invalid email or password" });
            } else {
              const { _id: id } = data;
              const {
                first_name,
                last_name,
                email,
                confirmedAccount: confirmed_account,
              } = data.profile;
              const { balance, verifiedMerchant: verified_merchant } =
                data.account;

              JWTSign(
                {
                  id,
                  email,
                  first_name,
                  last_name,
                  confirmed_account,
                  verified_merchant,
                  balance,
                },
                res
              );
            }
          } else {
            res.status(401).json({ message: "Invalid email or password" });
          }
        });
    } else {
      res.sendStatus(400);
    }
  },
};
