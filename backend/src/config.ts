export default{
    RABBITMQ:{
        EXCHANGE_NAME:"service_polizei",
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
        PASSWORD: "|sJ{@2tOXw*edi1XU0CD=t//r2X/mPS",
        DATABASE: "polizei",
        SUPPORTBIGNUMBERS: true,
        CONNECTIONLIMIT: 10
    }
}