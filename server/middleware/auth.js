import jwt from "jsonwebtoken"
import User from '../models/UserModel.js'

import { config } from "dotenv"
config()

// Extract ID from JWT and store in request
const auth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) return res.status(401).json({ error: "Authorization token not found" })

  const token = authorization.split(" ")[1]

  try {
    // Decode and extract the user ID from token
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)

    // Ensure ID is in db and save in request
    req.user = await User.findById(_id).select("_id")

    next()
  } catch (error) {
    res.status(401).json({ error: `${error.message} - JWT Expired Bud` })
  }
}

export default auth