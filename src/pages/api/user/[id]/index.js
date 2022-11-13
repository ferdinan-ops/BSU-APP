import connectMongo from "../../../../database/connection";
import { getProfileData, updateUserProfile } from "../../../../database/controllers/user";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  connectMongo().catch(() => res.status(500).json({ success: false, error: "Error in connection" }));
  await authorization(req, res);

  switch (req.method) {
    case "GET":
      await getProfileData(req, res);
      break;
    case "PATCH":
      await updateUserProfile(req, res);
    default:
      res.status(400).json({ success: false, error: "Request method not allowed" });
      break;
  }
} 