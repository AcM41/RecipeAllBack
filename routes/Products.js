const express = require('express')
const router = express.Router()
const {Products,Likes} = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware')



router.get("/",async (req,res)=>{
    const listOfProducts = await Products.findAll({include:[Likes]})
    res.json(listOfProducts)
})
router.get('/id/:id',async (req,res)=>{
    const id = req.params.id
    const product = await Products.findByPk(id)
    res.json(product)

})
router.get('/user/:id',validateToken,async(req,res)=>{
    const userId = req.params.id
    const myProductList = await Products.findAll({where: {UserId: userId}})
    res.json(myProductList)
})

router.post("/",validateToken,async (req,res)=>{
    
    const id = req.user.id
    const username = req.user.username
    console.log(username)
    const product = req.body
    product.UserId = id
    product.username = username
    console.log(product)
    await Products.create(product)
    res.json(product);
})

router.delete('/:productId',validateToken,async (req,res)=>{
    const productId = req.params.productId
    console.log(req.body)
    console.log(productId)
    await Products.destroy({
        where: {
            id: productId,
        },
        });
    res.json("Delete Successfully")
})


module.exports = router