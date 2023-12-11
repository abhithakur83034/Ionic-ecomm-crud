const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const PORT = 9000;
const config = require('./config/config.json')
const server = http.createServer(app);

const DBConnection = config.database.mongodb.local;


server.listen(PORT, ()=>{
    console.log("server started on port :",PORT);
    mongoose.connect(DBConnection,{
        useNewUrlParser:true,
        useUnifiedTopology:true   
     }).then(()=>{
        console.log('server connected with database')
    }).catch((error)=>{
        console.log("error in connecting with DB :",error)
})
})