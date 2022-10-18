import jwt from "jsonwebtoken";

export default async function authorization(req, res) {
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(400).json({ success: false, error: "You're not have Authorization" });

    const authSplit = authorization.split(" ");
    const [authType, authToken] = [authSplit[0, authSplit[1]]];

    if (authType !== "Bearer")
      return res.status(400).json({ success: false, error: "Your auth type is not allowed" });

    return jwt.verify(authToken, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return res.status(400).json({ success: false, error });
      return resolve(decoded);
    })
  })
}