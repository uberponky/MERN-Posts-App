import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { config } from "dotenv"
config()

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '10d' })
}

const registerUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: "All fields are required" })

  try {
    // Check for duplicate email
    const duplicate = await User.findOne({ email })
    if (duplicate) return res.status(400).json({ msg: "User already exists" })

    // Hash password
    const salt = await bcrypt.genSalt()
    const hashedPwd = await bcrypt.hash(password, salt)
    
    // Create user
    const user = await User.create({ email, password: hashedPwd })
    const token = createToken(user._id)
    res.status(200).json({ email, token })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: "All fields are required" })

    try {
      // Check user exists
      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ msg: "User does not exist" })

      // Create JSON Web Token
      const token = createToken(user._id)
  
      // Check password
      const match = await bcrypt.compare(password, user.password)
      if (!match) return res.status(400).json({ error: "Incorrect password." })

      // Send final response
      return res.status(200).json({ email, token })
    } catch (error) {
      return res.status(401).json({ error: error.message })
    }
}

export { registerUser, loginUser }