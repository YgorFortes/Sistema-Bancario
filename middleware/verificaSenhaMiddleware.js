import bancodedados from "../model/bancodedados.js";
const {banco} = bancodedados;
function verificaSenha(req, res, next){
  const {senha_banco}= req.query;

  if(senha_banco !== banco.senha){
    return res.status(401).send({mensagem: 'Senha incorreta, tente novamente'});
  }

  next();
}

export default verificaSenha;