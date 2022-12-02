import Users from "../../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authorization from "../../middlewares/authorization";

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!req.body) return res.status(405).json({ success: false, error: "Mohon isi seluruh data" });

  try {
    // checked user is registered
    const checkUser = await Users.findOne({ email });
    if (checkUser) return res.status(402).json({ success: false, error: "Akun anda telah terdaftar" });

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const data = await Users.create({ username, email, password: passwordHash });
    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET);

    res.status(200).json({ success: true, msg: "Pendaftaran akun berhasil", data, token });
  } catch (error) {
    return res.status(400).json({ success: false, error: "Mohon coba lagi" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!req.body) return res.status(405).json({ success: false, error: "Mohon isi seluruh data" });

  try {
    const checkUser = await Users.findOne({ email });
    if (!checkUser) return res.status(402).json({ success: false, error: "Email anda salah" });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) return res.status(402).json({ success: false, error: "Password anda salah" });

    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, msg: "Selamat, anda berhasil masuk", data: checkUser, token });
  } catch (error) {
    return res.status(400).json({ success: false, error: "Mohon coba lagi" });
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