export default{
  EXCHANGE_NAME:"service_polizei",
  DOMAIN:"127.0.0.1",
  PORT:"5672",
  USER:"guest",
  PASSWORD:"guest",
  ROUTINGKEYS:{
      TEST:"service.polizei.test",
      ADRESS:{
        CREATE_ADRESS:"service.polizei.adresse.erstellen"
      }
  }
}