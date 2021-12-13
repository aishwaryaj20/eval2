const express = require("express")  //its express is fun

const productController = require("./controllers/product.controller")
const app = express();

const {register, login, movie} = require("./controllers/user.controller")
app.use (express.json())

app.use("/movies", productController)

app.post("/register" , register)

app.post("/movie" , movie)
app.post("/login" , login)

module.exports= app