const express = require('express');
const { connection } = require('./config/db');
const { JobRouter } = require('./routes/job.route');
const { UserRouter } = require('./routes/user.route');
require('dotenv').config()
const cors = require('cors')

const app = express();
app.use(cors({
    origin : '*'
}))

app.use(express.json())
app.use('/user', UserRouter)
app.use('/job', JobRouter)

















app.listen(process.env.PORT, async()=>
{
    try{
        await connection
        console.log('listening on port ', process.env.PORT)
        console.log("Db is connected successfully")

    }
    catch(err){
        console.log('Db is not connected')
        console.log('Erro on Listening on port 8080')

    }
    console.log('Db is connected successfully')
})