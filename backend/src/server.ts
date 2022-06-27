
import {router as policemanRouter} from "./API/policeman";
import {router as adressRouter} from "./API/adress";
import {router as accidentRouter} from "./API/accident";
import {router as trafficJamRouter} from "./API/trafficjam";
import {router as reportRouter} from "./API/report";
import {router as wantedPersonRouter} from "./API/wanted_Person";
import {router as newsRouter} from "./API/news"

import config from "./config";

const cors = require("cors");
const express = require('express');
let port = config.PORTS.BACKEND;

const corsOptions={
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
}

export const app = express();
const amqp = require("amqplib/callback_api");

export let amqpConn:any;
export let amqpChannel:any;

amqp.connect(`amqp://${config.RABBITMQ.USER}:${config.RABBITMQ.PASSWORD}@${config.RABBITMQ.DOMAIN}:${config.RABBITMQ.PORT}`,function(error0:any, connection:any) {
    if(error0) throw error0;
    amqpConn = connection;

    connection.createChannel(function (error1:any,channel:any) {
        if(error1) throw error1;
        channel.assertExchange(config.RABBITMQ.EXCHANGE_NAME, "topic",{durable:true});
        amqpChannel = channel;

        channel.assertQueue("",{durable:true,exclusive:false,autoDelete:true}, (error2:any,queueInstance:any) =>{
            if(error2) throw error2;

            channel.bindQueue(queueInstance.queue, config.RABBITMQ.EXCHANGE_NAME, config.RABBITMQ.ROUTINGKEYS.WORLD);

            channel.consume(queueInstance.queue,function(msg:any) {
                config.RABBITMQ.JWT_SECRET = msg.content.toString();
                console.log("RECIEVED: "+msg.content.toString());
                })
            })
            channel.publish(config.RABBITMQ.EXCHANGE_NAME,config.RABBITMQ.ROUTINGKEYS.HELLO,Buffer.from("Polizei"));
        })
})



export async function start(port:number){
    app.use(express.json());
    app.use(cors(corsOptions));

    app.use("/policeman",policemanRouter);
    app.use("/adress",adressRouter);
    app.use("/accident",accidentRouter);
    app.use("/trafficJam",trafficJamRouter);
    app.use("/report",reportRouter);
    app.use("/wantedPerson",wantedPersonRouter);
    app.use("/news",newsRouter);

    app.listen(port, () =>{
        console.log(`listening on port ${port}`);
    });
}

start(port);



