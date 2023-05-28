import { getDB } from "../db/DB";
import { ControllerType } from "../types/ControllersTypes";

export const SignIn: ControllerType = {
  path: "/signin",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = await req?.body;

    if (ValidateBody(req.body)) {
      const findLength = (
        await getDB()
          .find({
            "profile.email": email,
            "profile.password": password,
          })
          .toArray()
      ).length;

      if (findLength == 1) {
        try {
          res.json({ message: `Logged in successful` });
        } catch (err) {
          res.status(500).json({ message: `Couldn't log in user ${err}` });
        }
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  },
};

interface SignUpBody {
  email: string;
  password: string;
}

const ValidateBody = (body: SignUpBody) => {
  if (body.email && body.password) {
    return Object.values(body).includes("") ||
      Object.values(body).includes(null)
      ? false
      : true;
  } else {
    return false;
  }
};
