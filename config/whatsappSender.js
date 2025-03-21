require('dotenv').config();

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const sendEmails = require("../config/sendEmail");
const emailTemplates = require("../templates/emailTemplates");

const user_email = "linnubr@gmail.com";

let client;
let sended_qrCode_email = false;

const processarQRCode = async (qr) => {
    try {
        if (!sended_qrCode_email) {
            qrCodeBase64 = await qrcode.toDataURL(qr); // Converte o QR Code para Base64
            console.log('✅ QR Code gerado com sucesso!');

            let html = emailTemplates.adminConnectWhatsapp();
            let title = `ADMIN CADEMINT: Conexão com Whatsapp Sender necessária! `;
            let from = "Ana da Cademint <ana.cademint@gmail.com>";

            sendEmails.sendEmail(html, title, from, user_email, [{ filename: 'qrcode.png', content: qrCodeBase64.split("base64,")[1], encoding: 'base64' }]);
            sended_qrCode_email = true;
        }
    } catch (err) {
        console.error('❌ Erro ao converter QR Code para base64:', err);
    }
};

async function restartWhatsApp(client) {
    console.log('🚨 WhatsApp desconectado. Reiniciando o cliente...');
    
    try {
        if (client) {
            await client.destroy(); // Destruir o cliente
            console.log("Cliente do WhatsApp destruído.");
        }
        
        // Fechar o Puppeteer (se presente)
        if (client?.pupBrowser) {
            await client.pupBrowser.close();
            console.log("Puppeteer fechado.");
        }

        // Reiniciar o cliente do WhatsApp
        startClient();
    } catch (error) {
        console.error("Erro ao reiniciar cliente:", error);
    }
}

async function sendMessage(destinatario, mensagem) {
    let novoStatus = "falha";

    try {
        const number_details = await client.getNumberId(destinatario);
        
        const resultado = await client.sendMessage(number_details._serialized, mensagem);
    
        novoStatus = resultado.sucesso ? "enviado" : "falha";
    } catch (error) {
        return "Erro ao enviar mensagem:" + error;
    } finally {            
        if (global.gc) {
            global.gc();
        } else {
            console.warn("⚠️ Garbage Collection não está exposto! Use node --expose-gc.");
        }

        return novoStatus;
    }
}

async function startClient() {
    try {
        if (client) {
            console.log("Fechando instância antiga antes de iniciar nova...");
            try {
                await client.destroy();
            } catch (error) {
                console.error("Erro ao destruir cliente antigo:", error);
            }
        }

        client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-gpu",
                    "--single-process",
                    "--no-zygote",
                    "--disable-background-timer-throttling",
                    "--disable-breakpad",
                    "--disable-software-rasterizer",
                    "--disable-accelerated-2d-canvas",
                    "--disable-background-networking",
                    "--renderer-process-limit=1"
                ],
                headless: true
            }
        });

        client.on('qr', (qr) => {
            console.log('⚡ Gerando QR Code...');
            processarQRCode(qr);
        });

        client.on('ready', () => {
            console.log("✅ WhatsApp Client is ready!");

            let html = emailTemplates.adminWhatsappConected();
            let title = `ADMIN CADEMINT: Conexão realizada! A conexão com o Whatsapp Sender foi realizada.`;
            let from = "Ana da Cademint <ana.cademint@gmail.com>";

            sended_qrCode_email = false;

            if (process.env.URL_API.indexOf("https://") != -1) { // Só manda o email de conectado com sucesso quando não estiver no ambiente de desenvolvimento
                sendEmails.sendEmail(html, title, from, user_email);
            }
        });

        client.on('disconnected', async () => {
            restartWhatsApp(client);
        });

        try {
            await client.initialize(); // Espera pela inicialização do cliente
            console.log("✅ WhatsApp Client inicializado com sucesso!");
        } catch (error) {
            console.error("Erro ao inicializar o cliente WhatsApp:", error);
        }
    } catch (error) {
        console.error("Erro ao iniciar o cliente:", error);
    }
}

/*process.on("SIGTERM", async () => { //Comentando para subir no google cloud
    console.log("🛑 Recebido SIGTERM. Encerrando processos...");

    if (client) {
        try {
            await client.destroy();
            console.log("✅ Cliente do WhatsApp destruído.");
        } catch (error) {
            console.error("Erro ao destruir cliente do WhatsApp:", error);
        }
    }

    if (client?.pupBrowser) {
        try {
            await client.pupBrowser.close();
            console.log("✅ Puppeteer fechado.");
        } catch (error) {
            console.error("Erro ao fechar Puppeteer:", error);
        }
    }

    // Coleta de lixo para garantir que os recursos sejam liberados
    if (global.gc) {
        global.gc();
        console.log("🧹 Garbage Collection executado!");
    }

    console.log("🚪 Finalizando aplicação...");
    process.exit(0);
});*/

let whatsappSender = {
    init: () => startClient(),
    sendMessage: (destinatario, mensagem) => sendMessage(destinatario, mensagem)
}

module.exports = whatsappSender;
