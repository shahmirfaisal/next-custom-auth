import dbConnect from "../../lib/dbConnect";
import User from "../../models/user";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { setCookies } from "cookies-next";

export default async function handler(req, res) {
  await dbConnect();

  const { email, password } = req.body;

  if (req.method === "POST") {
    const user = await User.findOne({ email, password });

    if (!user)
      return res.status(422).json({ message: "Wrong email or password!" });

    console.log(process.env.TOKEN_SECRET);
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    setCookies("token", token, {
      req,
      res,
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    res.status(200).json(user);
  } else {
    res.status(424).json({ message: "Invalid method!" });
  }
}
