const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const {validateToken} = require('../middlewares/AuthMiddleware')

router.get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    const comments = await Comments.findAll({ where: { productId: productId } });
    res.json(comments);
});
router.get('/user/:id',validateToken,async(req,res)=>{
    const userId = req.params.id
    const myCommentList = await Comments.findAll({where: {UserId: userId}})
    res.json(myCommentList)
})
router.post("/",validateToken, async (req, res) => {
    const username = req.user.username
    const id = req.user.id
    const comment = req.body;
    comment.username = username
    comment.UserId = id
    await Comments.create(comment);
    res.json(comment);
});
router.delete('/:commentId',validateToken,async (req,res)=>{
    const commentId = req.params.commentId
    await Comments.destroy({
        where: {
            id: commentId,
        },
        });
    res.json("Delete Successfully")
})

module.exports = router