import bancodedados from "../model/bancodedados.js";
const {contas} = bancodedados;


function verificaCamposVazios(req, ...campos ){
  let mensagem = ''
  for(let campo of campos){
    if(!req[campo] && req[campo] !== 0){
      return mensagem =  `Campo ${campo} não digitado`;
    } 
  }
  return false;
}





function verificaDuplicidade( cpf, email){
  let mensagem = '';
  for(let conta of contas){
    if(cpf === conta.usuario.cpf){
      return mensagem = 'Numero de cpf já existente';
    }else if(email === conta.usuario.email){
      return mensagem = 'Email já existente';
    }
  } 
  return mensagem = undefined;
}



function verificaRequisicaoVazia(req){
  let mensagem =''
  const campoCorpoVazio = Object.keys(req).length <1
  if(campoCorpoVazio) {
    return mensagem = 'Requisição vazia, por favor digite algum campo'
  }
}



function verificaSenha(conta, senha){
  if(conta.usuario.senha === senha){
    return true;
  }else{
    return false;
  }
}



function verificaValorDisponivel(saldo, valor =null){
  if((saldo <=0 ) || (saldo <valor)){
    return false;
  }
  return true;
}


export default  {verificaCamposVazios, verificaDuplicidade, verificaRequisicaoVazia, verificaSenha, verificaValorDisponivel}

