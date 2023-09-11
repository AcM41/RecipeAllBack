const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const {Users} = require('../models')
const {sign}  = require('jsonwebtoken')
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/",async (req,res)=>{
    const {username, password}=req.body
    bcrypt.hash(password,10).then((hash)=>{
        Users.create({
            username:username,
            password:hash
        })
    })
    res.json("SUCCESS")
})

router.post('/login',async (req,res)=>{
    const {username, password}=req.body
    const user = await Users.findOne({where :{username:username}})

    if(!user) return res.status(200).json({ error: "User doesn't exist" });
    bcrypt.compare(password,user.password).then((match)=>{
        if (!match)  {
            return res.status(200).json({ error: "Wrong Username And Password Combination" });
        }
        const accessToken = sign({username:user.username,id:user.id},"important")
        console.log(user.username)
        res.json({ token: accessToken, username: username, id: user.id })
    })
})

router.get("/validate", validateToken, (req, res) => {
    res.json(req.user);
});

router.put('/updatePassword',validateToken,async(req,res)=>{
    const {oldPwd,newPwd}=req.body
    const user = await Users.findOne({ where: { username: req.user.username } })

    bcrypt.compare(oldPwd,user.password).then(async (match)=>{
        if(!match) {
            res.json("Wrong Password Entered!")
            
        }
        else{
            bcrypt.hash(newPwd,10).then((hash)=>{
                Users.update(
                    { password: hash },
                    { where: { username: req.user.username } }
                    );
            })
            res.json("Success")
        }
    })
})
    

module.exports = router