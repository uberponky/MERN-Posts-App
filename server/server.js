import express from 'express'
import { postsRoutes } from './routes/postsRoutes.js'
import { usersRoutes } from './routes/usersRoutes.js'
import { connect as mongoConnect } from 'mongoose'

import { config } from 'dotenv'
config()

mongoConnect(process.env.MONGO_URI)
	.then(() => console.log('db connected'))
	.catch(err => console.log(err))

const app = express()

app.use(express.json())

app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)

app.listen(4000, 'localhost', () => {
  console.log('Listening on Port 4000');
})