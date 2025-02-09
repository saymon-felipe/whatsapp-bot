const whatsappSender = require("../config/whatsappSender");

let whatsappService = {
    sendMessage: async function (messages) {
        let messagesResults = [];

        for (let i = 0; i < messages.length; i++) {
            let currentMessage = messages[i];
            
            const result = await whatsappSender.sendMessage(currentMessage.destinatario, currentMessage.mensagem)

            messagesResults.push(
                {
                    id: currentMessage.id,
                    status: result
                }
            )
        }

        return messagesResults;
    }
}

module.exports = whatsappService;