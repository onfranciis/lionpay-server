import { Response } from "express";
import { getDB } from "../../db/DB";
import { ControllerType } from "../../types/ControllersTypes";

export const ConfirmAccount: ControllerType = {
  path: "/confirmation/:id",
  method: "get",
  handler: async (req, res) => {
    const { id: confirmationId } = req.params;
    if (!confirmationId) {
      res.status(400).json({ message: "No id was attached" });
    } else {
      const result = await getDB().findOne({
        "profile.confirmation_id": confirmationId,
      });
      if (!result) {
        res.status(400).json({ message: "Invalid confirmation code" });
      } else {
        if (confirmationId === result.profile.confirmation_id) {
          if (result.profile.confirmedAccount) {
            res.json({
              message: "Email has already been confirmed",
            });
          } else {
            updateConfirmationStatus(confirmationId, res);
          }
        } else {
          res.status(400).json({ message: "Invalid confirmation code" });
        }
      }
    }
  },
};

const updateConfirmationStatus = async (Id: string, res: Response) => {
  await getDB().updateOne(
    { "profile.confirmation_id": Id },
    { $set: { "profile.confirmedAccount": true } }
  );
  res.json({
    message: "Email has been confirmed successfully",
  });
};
