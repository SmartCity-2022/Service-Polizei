export default{
    RABBITMQ:{
        EXCHANGE_NAME:"service",
        DOMAIN:"127.0.0.1",
        PORT:"5672",
        USER:"guest",
        PASSWORD:"guest",
        ROUTINGKEYS: {
            HELLO: "service.hello",
            WORLD: "service.world"
        },
        JWT_SECRET:""
    },
    PORTS:{
        BACKEND:8088,
    },
    DATABASE:{
        HOST: "127.0.0.1",
        PORT: 3306,
        USERNAME: "polizei",
        PASSWORD: "123456798",
        DATABASE: "polizei",
        SUPPORTBIGNUMBERS: true,
        CONNECTIONLIMIT: 10
    }
}