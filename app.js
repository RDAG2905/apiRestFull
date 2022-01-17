const router = require('./router.js')
const express = require('express')
port = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use('/api/productos',router)
const server = app.listen(port,()=> console.log(`Servidor escuchando en el puerto ${server.address().port}`))
server.on('error',error=> console.log(`Error en el servidor ${error}`)) 
