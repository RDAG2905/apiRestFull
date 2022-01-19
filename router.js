     const express = require('express')
     const { Router } = express
     const router = Router()
     let productos = [
        {
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        id: 1
        },
        {
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        id: 2
        },
        {
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        id: 3
        }
        ] 

     let primerId = 1
     let error = 'producto no encontrado' 


     router.get('/',(req,res)=>{
         res.send({productos})
     })


     router.get('/:id',(req,res)=>{
        let idProducto = req.params.id
        let producto = productos.find(pr => pr.id == idProducto)
        if(!producto){
           res.send({error}) 
        }
        res.send({producto})
    })
     

     router.post('/',(req,res)=>{
         let producto = req.body//.producto
         console.log(producto)
         if (productos.length == 0){
            producto.id = primerId
         }else{
             let ids = productos.map(p=>p.id)            
             let maxId = Math.max(...ids)
             producto.id = maxId + 1
         }
         productos.push(producto) 
         res.send({producto}) 
     })

     
     router.put('/:id',(req,res)=>{
        let id = req.params.id 
        console.log(id)
        let productoEdicion = req.body
        console.log('productoEdicion' + productoEdicion) 
        /*
        let index = productos.indexOf(product => {return product.id == parseInt(id)})
        console.log(index)
        if(index == -1){
            res.send({error})
        }else{
            productos[index].title = productoEdicion.producto.title 
            productos[index].price = productoEdicion.producto.price
            productos[index].thumbnail = productoEdicion.producto.thumbnail
            let producto = productos[index]
            console.log(productos[index])
        }
        */
        //res.send({"ok":""})
        let existe = productos.find( pr => pr.id == id)
        if(!existe){
            res.send({error})         
        }else{
            
           let producto;
            productos
            .forEach(element => {
                if(element.id == id){
                    element.title = productoEdicion.title 
                    element.price = productoEdicion.price
                    element.thumbnail = productoEdicion.thumbnail                   
                    producto = element
            }
            });
            res.send({producto}) 
            }     
     })


     router.delete('/:id',(req,res)=>{
        let id = req.params.id
        let existe = productos.find( pr => pr.id == id)
        if(!existe){
            res.send({error})
        }else{
            
            productos = productos.filter(prd => prd.id != id)
            res.send({"producto Eliminado ": existe})
        }
        
     })

     module.exports = router