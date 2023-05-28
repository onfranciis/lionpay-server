import { controllerType } from "../types/ControllersTypes";

export const Base: controllerType = {
  path: "/",
  method: "get",
  handler: (req, res) => {
    res.send({ connected: true });
  },
};
