const mysql = require('mysql')
const createConnect =  mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mainmath"
})


createConnect.connect((err)=>{
if(Boolean(err)){
    throw err
}
})
module.exports = createConnect