import jwt from "jsonwebtoken";

// Doctor authentication middleware

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) return res.status(400).json({ msg: "Invalid Authentication" });
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export default authDoctor;
