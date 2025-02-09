module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token == process.env.ACCESS_KEY) {
            next();
        }        
    } catch (error) {
        return res.status(401).send({ mensagem: "Falha na verificação da autenticação" });
    }
}