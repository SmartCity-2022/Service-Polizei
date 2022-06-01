
const express = require('express');
const app = express();

console.log(process.cwd());
import * as dbconfig from "./database/databaseconnection";


app.use(express.json());

/*app.get('/',(req, res) =>{
    res.send("hello World");
})*/

app.listen(8080, () =>{
    console.log('listening on port ${dbconfig.config.port}');
});


