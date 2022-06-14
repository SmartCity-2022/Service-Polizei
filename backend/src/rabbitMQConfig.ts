export default{
  EXCHANGE_NAME:"service_polizei",
  DOMAIN:"127.0.0.1",
  PORT:"5672",
  USER:"polizei",
  PASSWORD:"polizei",
  ROUTINGKEYS:{
      TEST:"service.polizei.test",
      ADRESS:{
        CREATE_ADRESS:"service.polizei.adresse.erstellen"
      }
  }
}