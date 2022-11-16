import Users from "../../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authorization from "../../middlewares/authorization";

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!req.body) return res.status(405).json({ success: false, error: "Form data not provided..." });

  try {
    // checked user is registered
    const checkUser = await Users.findOne({ email });
    if (checkUser) return res.status(402).json({ success: false, error: "Your account is already registered" });

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const data = await Users.create({ username, email, password: passwordHash });
    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET);

    res.status(200).json({ success: true, msg: "Register successfully", data, token });
  } catch (error) {
    return res.status(400).json({ success: false, error: "Agak laen" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!req.body) return res.status(405).json({ success: false, error: "Form data not provided" });

  try {
    const checkUser = await Users.findOne({ email });
    if (!checkUser) return res.status(402).json({ success: false, error: "Your email is wrong" });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) return res.status(402).json({ success: false, error: "Your password is wrong" });

    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, msg: "Login successfully", data: checkUser, token });
  } catch (error) {
    return res.status(400).json({ success: false, error: "Agak laen" });
  }
}

export async function currentUser(req, res) {
  const auth = await authorization(req, res);
  try {
    const data = await Users.findById(auth.id, { _id: 1, username: 1, photo: 1 });
    return res.status(200).json({ success: true, msg: "Get current user successfully", data });
  } catch (err) {
    return res.status(400).json({ success: false, err });;
  }
}