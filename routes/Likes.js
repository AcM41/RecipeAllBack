const express = require("express");
const router = express.Router(); 
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get('/user/:id',validateToken,async(req,res)=>{
    const userId = req.params.id
    const likedProductIdList = await Likes.findAll({where: {UserId: userId}})
    res.json(likedProductIdList)
})

router.post("/", validateToken,async(req,res)=>{
    const {ProductId} = req.body
    const UserId = req.user.id
    const found = await Likes.findOne({where:{ProductId:ProductId,UserId:UserId}})
    if(!found){
        await Likes.create({ProductId:ProductId,UserId:UserId})
        res.json({
            liked:true
        })
    }
    else{
        await Likes.destroy({where : {
            ProductId:ProductId,UserId:UserId
        }})
        res.json({
            liked:false
        })
    }
    

})



module.exports = router