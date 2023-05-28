import { ControllerType } from "../types/ControllersTypes";

export const NotFound: ControllerType = {
  path: "*",
  method: "all",
  handler: (req, res) => {
    res.status(404).send({ message: "This route does not exist" });
  },
};
