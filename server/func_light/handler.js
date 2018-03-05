/*jshint esversion: 6 */
/*global require, module,  __dirname */
/*jshint node: true */
/*jshint asi: true */
'use strict';

const express = require('express')
const app = express()

function handle(req, res) {
    var data = {}
    if(req == undefined || req == null){
        data.status= "error"
        console.info(JSON.stringify(data))
        //callback(undefined, data)
    }

    var request = JSON.parse(req)
    var value = request.value;

    if(value == true){
        data.status = "The light is ON"
    }else{
        data.status = "The light is OFF"
    }

    console.log(JSON.stringify(data))
    return
}

module.exports = (req, res) => {
    handle(req, res)
}