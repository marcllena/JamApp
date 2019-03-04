'use strict'

/*
On estan implementades totes les operacions de productes. Així, aqui s'accedeix a la base de dades, i es conecta amb Node JS
*/

const Product = require('../models/product')

function getProduct (req,res){
    console.log('GET /api/product/:productId')

    let productId = req.params.productId
  
    Product.findById(productId,(err, product) => {
        if(err) 
        return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
  
        if(!product)
        return res.status(404).send({message: `El producto no existe`})
  
        res.status(200).send({product: product})
    })
}

function getProducts (req,res){
    console.log('GET /api/product/')

    Product.find({},(err, products) => {
      if(err)
      return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
  
      if(!products)
        return res.status(404).send({message: `No existen productos`})
        
        res.status(200).send({products})
    })
}

function saveProduct(req,res){
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture 
    product.price = req.body.price
    product.category = req.body.category 
    product.description = req.body.description
    
    product.save((err,productStored) => {
        if(err)
        return es.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

        res.status(200).send({product: productStored})

    })
}

function updateProduct (req,res){
    console.log('PUT /api/product/:productId')

    let productId = req.params.productId
    let update = req.body
  
    Product.findByIdAndUpdate(productId,update,(err, productUpdated) => {
        if(err) 
        return res.status(500).send({message: `Error al actualizar el producto: ${err}`})
  
        if(!productUpdated)
        return res.status(404).send({message: `El producto no existe`})
  
        res.status(200).send({product: productUpdated})
        })
}

function deleteProduct (req,res){
    console.log('DELETE /api/product/:productId')

    let productId = req.params.productId
  
    Product.findById(productId,(err, product) => {
        if(err) 
        return res.status(500).send({message: `Error al borrar el producto: ${err}`})
  
        if(!product)
        return res.status(404).send({message: `El producto no existe`})
  
        product.remove(err =>{ 
            if(err)
            return res.status(500).send({message: `Error al borrar el producto: ${err}`})
  
            res.status(200).send({message: "El producto se ha eliminado correctamente"})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
    
}
