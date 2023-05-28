import { ControllerType } from "../types/ControllersTypes";

export const Base: ControllerType = {
  path: "/",
  method: "get",
  handler: (req, res) => {
    res.send({ connected: true });
  },
};
