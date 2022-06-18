import {router as policemanRouter} from "./API/policeman";
import {router as adressRouter} from "./API/adress";
import {router as accidentRouter} from "./API/accident"
import rabbitMQConfig from "./rabbitMQConfig";

const cors = require("cors");
const express = require('express');
let port = "8088";

const corsOptions={
    origin: "*",
    credentials: true,
    optionSucessStatus: 200
}

export const app = express();
const amqp = require("amqplib/callback_api");

export let amqpConn:any;
export let amqpChannel:any;

amqp.connect(`amqp://${rabbitMQConfig.USER}:${rabbitMQConfig.PASSWORD}@${rabbitMQConfig.DOMAIN}:${rabbitMQConfig.PORT}`,function(error0:any, connection:any) {
    if(error0) throw error0;
    amqpConn = connection;

    connection.createChannel(function (error1:any,channel:any) {
        if(error1) throw error1;
        channel.assertExchange(rabbitMQConfig.EXCHANGE_NAME, "topic",{durable:true});
        amqpChannel = channel;

        channel.assertQueue("",{exclusive:true}, (error2:any,queueInstance:any) =>{
            if(error2) throw error2;

            channel.bindQueue(queueInstance.queue, rabbitMQConfig.EXCHANGE_NAME, rabbitMQConfig.ROUTINGKEYS.TEST);

            channel.consume(queueInstance.queue,function(msg:any) {
                if(msg.fields.routingKey == rabbitMQConfig.ROUTINGKEYS.TEST) {
                    channel.publish(rabbitMQConfig.EXCHANGE_NAME,rabbitMQConfig.ROUTINGKEYS.TEST,Buffer.from("test publish from service Polizei"));
                }
            })
        })
    })
})


export async function start(port:string){
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use("/policeman",policemanRouter);
    app.use("/adresses",adressRouter);
    app.use("/accidents",accidentRouter);
    app.listen(port, () =>{
        console.log(`listening on port ${port}`);
    });
}

start(port);



