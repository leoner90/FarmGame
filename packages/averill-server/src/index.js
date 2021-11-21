// LIBRARIES
// import express
const express = require('express')
// import cors to connect between diferent servers , in our case diferenet localhost port
const cors = require('cors')
// import routes
const Router = require('./routes/router.js')
// init express
const app = express()
// use express json
app.use(express.json())

// USE CORS
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  }),
)

// USE ROUTER
app.use(Router)

// //START SERVER LISTENER
const port = 4545
app.listen(port, function () {})
