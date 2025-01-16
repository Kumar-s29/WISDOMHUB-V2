import jwt from "jsonwebtoken";

// admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) return res.status(400).json({ msg: "Invalid Authentication" });
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
      return res.status(400).json({ msg: "Invalid Authentication" });
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export default authAdmin;
