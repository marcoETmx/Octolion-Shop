
const express = require('express')
const app = express();
const path = require('path')
const productsRouter = require('./routes/products')

app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "pug")

app.use('/products', productsRouter)

const server = app.listen(8000, function(){
    console.log(`Listening http://localhost:${server.address().port}`);
})