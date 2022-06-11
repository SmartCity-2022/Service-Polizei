let amqp = require('amqplib');



export function doRabbit(){

}


async function connect(){
    await amqp.connect('amqp://<RabbitMQ-Host>:5672', function(error0:any,connection:any) {
        if(error0) throw error0;

        return connection;
    });
}


async function createChannel(connection:any){
    await connection.createChannel(function(error:any,channel:any){
        if(error) throw error;
        return channel;
    });
}


async function createQueue(channel:any,queueName:string,durable:boolean,exclusive:boolean,autoDelete:boolean){
    await channel.assertQueue(queueName,{
        durable:durable,
        exclusive:exclusive,
        autoDelete: autoDelete,
    }, function(error:any,queueInstance:any) {
        if(error) throw error;

        return queueInstance;
    });
}


async function bindQueueOnExchange(queue:any,queueInstance:any,exchangeName:string,topic:string) {
    queue.bindQueue(queueInstance.queue, exchangeName, topic);
}


async function getMessage(queue:any,queueInstance:any,noAck:boolean){
    queue.consume(queueInstance.queue, function(message:any) {
        return message;
    }, {
        noAck:noAck
    });
}


async function sendMessage(channel:any,exchangeName:string,topicName:string,message:string){
    channel.publish(exchangeName,topicName,Buffer.from(message));
}




