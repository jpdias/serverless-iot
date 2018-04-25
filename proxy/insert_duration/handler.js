/*jshint esversion: 6 */
/*global require, module,  __dirname */
/*jshint node: true */
/*jshint asi: true */
'use strict';

const MongoClient = require('mongodb').MongoClient 
const assert = require('assert')

const funcsConfig = require('./my_functions.json')
const rigConfigs = require('./my_rig_config.json')

var statsDB;  // Cached connection-pool for further requests.

function handle(event, context) {
    var data = {}
    if(event.body === undefined || event === null){
        data.status= "error1"
        data.message = "Body undefined or null"
        return context.fail(JSON.stringify(data))
    }

    var duration
    var functionName
    var environment

    var func
    var body = event.body
    try{
        functionName = body.func;
        duration = body.duration
        environment = body.environment

        for(var i = 0; i < funcsConfig.length; i++) {
            if(functionName == funcsConfig[i].name){
                func = funcsConfig[i]
                break
            }

            if(i == funcsConfig.length - 1)
                throw new Error("function not found")
        }
    }catch (err) {
        data.status= "error"
        data.message = "" + err
        return context.fail(JSON.stringify(data))
    }   

    prepareDB()
    .then((stats) => {
        const record = {"function": func.name, "duration": duration, "environment": environment };

        stats.collection("stats").insertOne(record, (insertErr) => {
            if(insertErr) {
                return context.fail(insertErr.toString());
            }

            const result =  {
                status: "Insert done of: " + JSON.stringify(event.hody)
            };
    
            context 
                .status(200)
                .succeed(result);
        });
    })
    .catch(err => {
        context.fail(err.toString());
    });
}

const prepareDB = () => {
    //const url = "mongodb://" + process.env.mongo + ":27017/stats"
    const url = "mongodb://" + rigConfigs.mongo + ":27017/stats"

    return new Promise((resolve, reject) => {
        if(statsDB) {
            console.error("DB already connected.");
            return resolve(statsDB);
        }

        console.error("DB connecting");

        MongoClient.connect(url, (err, database) => {
            if(err) {
                return reject(err)
            }
    
            statsDB = database.db("stats");
            return resolve(statsDB)
        });
    });
}

module.exports = (event,context) => {
    handle(event,context)
}
