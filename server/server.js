import express from 'express'
import { postsRoutes } from './routes/postsRoutes.js'
import { usersRoutes } from './routes/usersRoutes.js'
import { connect as mongoConnect } from 'mongoose'

import path from 'path'
import { fileURLToPath } from 'url'

// Resolving dirname for ES Module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { config } from 'dotenv'
config()

mongoConnect(process.env.MONGO_URI)
	.then(() => console.log('db connected'))
	.catch(err => console.log(err))

const app = express()

app.use(express.json())

app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/client/dist/index.html')))


app.listen(4000, () => {
  console.log('Listening on Port 4000');
})