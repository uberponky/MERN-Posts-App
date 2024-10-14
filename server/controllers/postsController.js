import mongoose from "mongoose"
import Post from "../models/PostModel.js"
import User from "../models/UserModel.js"

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" })
    return res.status(200).json({ posts })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getUserPosts = async (req, res) => {
  // Grab authenticated user from request body
  const user = await User.findById(req.user._id)

  try {
    const userPosts = await Post.find({ user: user._id }).sort({ createdAt: "desc" })
    return res.status(200).json({ userPosts, email: user.email })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const addPost = async (req, res) => {
  const {title, body} = req.body
  
  if (!title || !body) {
    return res.status(400).json({ msg: 'All fields are required' })
  }

  const user = await User.findById(req.user._id)
  if (!user) return res.status(401).json({ msg: 'No user found'})
  
  try {
    const post = await Post.create({ user: user._id, email: user.email, title, body })
    return res.status(200).json({ msg: 'Post created', post })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID'})
  }

  // Check post exists
  const post = await Post.findById(id)
  if (!post) return res.status(400).json({ error: 'Post not found'})
  
  // Check user owns the post
  const user = await User.findById(req.user._id)
  if (!post.user.equals(user._id)) return res.status(401).json({ msg: 'User not authorised to delete post'})

  try {
    await post.deleteOne()
    res.status(200).json({ msg: 'Post deleted'})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updatePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID'})
  }

  const {title, body} = req.body

  if (!title || !body) {
    return res.status(400).json({ msg: 'All fields are required' })
  }

  const post = await Post.findById(id)
  if (!post) return res.status(400).json({ error: 'Post not found'})

  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) return res.status(401).json({ error: "Not authorized" })

  try {
    await post.updateOne({ title, body })
    res.status(200).json({ msg: 'Post updated', post })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { getPosts, getUserPosts, addPost, deletePost, updatePost }