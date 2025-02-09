const express = require('express');
const router = express.Router();
const login = require("../middleware/login");
const _whatsappService = require("../services/whatsappService");
const functions = require("../utils/functions");

router.post("/send_messages", login, async (req, res, next) => {
    try {
        const results = await _whatsappService.sendMessage(req.body);
        const response = await functions.createResponse("Mensagem enviada com sucesso", results, "POST", 200);
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;