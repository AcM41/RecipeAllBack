const express = require('express')
const db = require('./models')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())
const productRouter = require('./routes/Products.js')
app.use("/products", productRouter)
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter)
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter)
const likesRouter = require("./routes/Likes");
app.use("/like", likesRouter)
db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
    console.log("server running on 3001");
}) 
})

