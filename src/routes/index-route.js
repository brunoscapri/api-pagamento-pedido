'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagamento-controller');

router.get('/', async (req, res) => {
    res.status(200).send({
        message: "API DE PAGAMENTOS ONLINE"
    })
});

router.post('/', controller.realizarPagamento);


module.exports = router;