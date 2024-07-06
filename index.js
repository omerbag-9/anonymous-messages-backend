// import modules
import express from 'express'
import { connectDB } from './db/connection.js'

// create server
const app = express()
const port = 3000

// connect to db

connectDB()

// parse data

app.use(express.json())

// routers

//global error handler

// listent on server

app.listen(port , ()=>{
    console.log('server is running on port',port);
})
