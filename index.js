
const express = require('express')
const path = require('path')
const bodyParse = require('body-parser')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const authApiRouter = require("./routes/api/auth");
const boom = require("boom");
const { clientErrorHandler, errorHandler, logErrors, wrapErrors } = require('./utils/middleware/errosHandlers');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')

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
app.use('/api/products', productsApiRouter);
app.use("/api/auth", authApiRouter);

// redirect
app.get('/', function (req, res) {
    res.redirect('/products');
})

app.use(function (req, res, next) {
    if (isRequestAjaxOrApi(req)) {
        const{
            output:{ statusCode, payload}
        } = boom.notFound();
        res.status(statusCode).json(payload);
    } 

    res.status(404).render("404");
})

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
const server = app.listen(8000, function () {
    console.log(`Listening http://localhost:${server.address().port}`);
})