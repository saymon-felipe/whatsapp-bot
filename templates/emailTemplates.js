require('dotenv').config();

let templates = {
    adminConnectWhatsapp: function () {
        return `
            <div style="width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); font-family: Arial, Helvetica, sans-serif;">
                <div style="text-align: center; padding: 20px; background-color: #4CAF50; color: #ffffff; border-radius: 8px;">
                    <h1 style="margin: 0;">Cademint</h1>
                    <p style="margin: 0; font-size: 18px;">Reconectar WhatsApp Web</p>
                </div>
                <div style="padding: 20px;">
                    <p style="font-size: 16px; line-height: 1.5;">ADMIN CADEMINT</p>
                    <p style="font-size: 16px; line-height: 1.5;">A conexão do bot do whatsapp caiu, favor reconectar.</p>
                    <p style="font-size: 16px; line-height: 1.5;">Escaneie o QR Code em anexo para reconectar:</p>

                    <a href="${process.env.URL_SITE}" style="text-decoration: none; color: rgb(0, 162, 232); font-weight: 600; font-size: 20px; background: #FFCA37; padding: 10px 15px; border-radius: 10px;">
                        Acessar o sistema
                    </a>
                </div>
                <div style="margin-top: 20px; font-size: 14px; color: #777;">
                    <a href="${process.env.URL_SITE}" target="_blank">
                        <img src="https://lh3.googleusercontent.com/nSELc2XaAc7vhthJSOiS-JPx2iH_PSDocmJhncmQycotrygh1y_i1dRk-nEU1_bG6I1OZvxWjcNvhPaN=w616-h220-rw" style="width: 400px;">
                    </a>
                    <hr>
                    <h6>
                        Este é um email automático enviado por ana.cademint@gmail.com, não responda.
                        Caso queira enviar um email para nós <a href="mailto:contato.scrumcademint@gmail.com">clique aqui</a>.
                    </h6>
                </div>
            </div>
        `
    },
    adminWhatsappConected: function () {
        return `
            <div style="width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); font-family: Arial, Helvetica, sans-serif;">
                <div style="text-align: center; padding: 20px; background-color: #4CAF50; color: #ffffff; border-radius: 8px;">
                    <h1 style="margin: 0;">Cademint</h1>
                    <p style="margin: 0; font-size: 18px;">WhatsApp Web Reconectado</p>
                </div>
                <div style="padding: 20px;">
                    <p style="font-size: 16px; line-height: 1.5;">ADMIN CADEMINT</p>
                    <p style="font-size: 16px; line-height: 1.5;">A conexão do bot do whatsapp foi restaurada com sucesso!</p>

                    <a href="${process.env.URL_SITE}" style="text-decoration: none; color: rgb(0, 162, 232); font-weight: 600; font-size: 20px; background: #FFCA37; padding: 10px 15px; border-radius: 10px;">
                        Acessar o sistema
                    </a>
                </div>
                <div style="margin-top: 20px; font-size: 14px; color: #777;">
                    <a href="${process.env.URL_SITE}" target="_blank">
                        <img src="https://lh3.googleusercontent.com/nSELc2XaAc7vhthJSOiS-JPx2iH_PSDocmJhncmQycotrygh1y_i1dRk-nEU1_bG6I1OZvxWjcNvhPaN=w616-h220-rw" style="width: 400px;">
                    </a>
                    <hr>
                    <h6>
                        Este é um email automático enviado por ana.cademint@gmail.com, não responda.
                        Caso queira enviar um email para nós <a href="mailto:contato.scrumcademint@gmail.com">clique aqui</a>.
                    </h6>
                </div>
            </div>
        `
    }
}

module.exports = templates;