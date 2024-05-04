const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
const cookieParser= require('cookie-parser')
require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
))
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))


const routeFiles = readdirSync('./routes');
console.log(routeFiles); // Check the list of files in the routes directory
routeFiles.map((route) => app.use('/api/v1', require('./routes/' + route)));
app.use("/app/v1", require('./routes/authRoutes'))



const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()