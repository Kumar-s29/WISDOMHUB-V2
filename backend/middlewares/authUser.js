import jwt from "jsonwebtoken";

// user authentication middleware

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export default authUser;
