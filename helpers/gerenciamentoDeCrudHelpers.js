import bancodedados from "../model/bancodedados.js";
const {contas} = bancodedados;


function adicionarConta(contas, numero, saldo, usuario) {
  const conta = {
    numero, saldo,
    usuario
  }
  contas.splice(contas.length, 0, conta);
}


function atualizarCamposUsuario(resultadoBuscaConta, req){
  Object.keys(resultadoBuscaConta.usuario).forEach((valorCampo)=> {
    if(req.body[valorCampo]){
      resultadoBuscaConta.usuario[valorCampo] = req.body[valorCampo];
    }
 });
}


function excluirConta(conta,indexConta, res){
  let mensagem = '';
  if(conta.saldo === 0){
    contas.splice(indexConta, 1);
    return res.status(200).send({mensagem: 'Conta excluída com sucesso!'});
  }else{
    return res.status(422).send({mensagem: 'A conta tem dinheiro em seu saldo. Só poderar se excluida quando o saldo estiver zerado'});
  }
}


export default {adicionarConta, atualizarCamposUsuario, excluirConta}