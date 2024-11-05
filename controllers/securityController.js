const { autenticaUsuarioDB } = require('../useCases/segurancaUseCases');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    await autenticaUsuarioDB(request.body)
        .then(usuario => {
            const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: 300 //expira em 5 min
            })
            return response.json({ auth: true, token: token })
        })
        .catch(err => response.status(401).json({ auth: false, message: err }));
}
//usa o verify nas rotas que precisam de autenticacao e daí vai no header e cola o token para ter acesso 
//a rota no insomnia , tipo o get de categorias cola o token no header e daí consegue acessar a rota
function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });
        // Se o token for válido, salva no request para uso posterior
       
        //inserindo o usuario no request para o proximo metodo a ser chamado poder usar 
        request.usuario = decoded.usuario;
        next();
    });
}

module.exports = {
    login, verificaJWT
}

