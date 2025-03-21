
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require('cors');
const whatsappSender = require("./config/whatsappSender");

async function initWhatsapp() {
    await whatsappSender.init();
}

initWhatsapp();

const whatsappRoute = require('./routes/whatsapp');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/whatsapp', whatsappRoute);

app.use((req, res, next) => {
    const erro = new Error("Não encontrado");
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
       mensagem: error.message
    });
});

module.exports = app;