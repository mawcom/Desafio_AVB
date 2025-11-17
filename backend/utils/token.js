import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
export default {
    generateToken,
    verifyToken
}

