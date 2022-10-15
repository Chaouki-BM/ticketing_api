require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to database')
}).catch((e) => {
    console.log('unable to connect to database ')
})
const port = process.env.PORT || 3500
//import routes 

const userRouter = require('./routes/user.routes');
const equipementRouter = require('./routes/equipement.routes');
const errorRouter = require('./routes/error.routes');
const { pingMachines } = require('./utils/ping');

app.use('/user', userRouter);
app.use('/error', errorRouter);
app.use('/equipment', equipementRouter)


//pingMachines();
app.listen(port, () => {
    console.log('app is running')
})
