/*jshint esversion: 6 */
/*global require, module,  __dirname */
/*jshint node: true */
/*jshint asi: true */
'use strict';

const fs = require('fs');

var value 

function handle(req) {
    var data = {}
    if(req == undefined || req == null){
        data.status= "error"
        console.info(JSON.stringify(data))
    }

    try{
        req = JSON.parse(req)
        value = req.value;
    }catch (err) {
        data.status= err
        console.info(JSON.stringify(data))
        return 
    }

    fs.readFile("/etc/hostname", "utf8", uponNodeInfo)
}

function uponNodeInfo(err, body){
    var data = {}
    if(err){
        data.status = "error"
        data.message = "Error requesting node info"
        data.error = err
        return console.info(JSON.stringify(data))
    }

    data.nodeInfo = body
    data.message = "I was able to achieve this result using SUPER HEAVY calculations"
    data.status = assertValue(value)
    console.info(JSON.stringify(data))
}

function assertValue(value){
    if(value == true){
        return "The light is ON"
    }else{
        return "The light is OFF"
    }
}

module.exports = (req,res) => {
    handle(req,res)
}
