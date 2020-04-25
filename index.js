
const express = require('express')
const path = require('path')
const bodyParse = require('body-parser')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const { clientErrorHandler, errorHandler, logErrors } = require('./utils/middleware/errosHandlers')

// app
const app = express();

// middleware
app.use(bodyParse.json())

// static files
app.use('/static', express.static(path.join(__dirname, "public")))

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug")

// routes
app.use('/products', productsRouter)
app.use('/api/products', productsApiRouter)

// redirect
app.get('/', function (req, res) {
    res.redirect('/products');
})

// error handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
const server = app.listen(8000, function () {
    console.log(`Listening http://localhost:${server.address().port}`);
})