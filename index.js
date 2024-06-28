require('dotenv').config()
// create server using express 
const express=require('express')


const ServerApp=express()

// cors - connect with front-end 
const cors=require('cors')
const router = require('./Routes/routes')
ServerApp.use(cors())
require('./db/connection')


// convert all incoming json data to js 
ServerApp.use(express.json())
ServerApp.use(router)

// export upload folder to client app - express.static()
ServerApp.use('/uploads',express.static('./uploads'))


// port set - listen 
const PORT=4000 || process.env.PORT

ServerApp.listen(PORT,()=>{
    console.log(`________Project Server Started At ${PORT}________`);
})

// resolve api requests
ServerApp.get('/',(req,res)=>{
    res.send('<h1>get requested received</h1>')
})


// ServerApp.post('/postexc',(req,res)=>{
//     // json - convert data js to json then send to client
//     // res.json(req.body.username)
//     res.status(203).json("incurrect username")
// })

// ServerApp.get('/getexc',(req,res)=>{
//     res.send("get requested 2 received")
// })
