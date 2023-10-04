import bancodedados from "../model/bancodedados.js";
const {depositos, contas, saques, transferencias} = bancodedados;

//Importando helpers
import verificacoesHelpers from "../helpers/verificacoesHelpers.js";
const {verificaCamposVazios, verificaSenha} = verificacoesHelpers;

import operacoesBancariasHelpers from "../helpers/operacoesBancariasHelpers.js";
const {buscandoSaldoPorConta ,buscaExtratoPorConta} = operacoesBancariasHelpers;

import utilitariosConta from "../helpers/utilitariosConta.js";
const {encontraContaPeloNumero} = utilitariosConta;



class VisualizacoesContaController{


  static saldo(req, res){
    const {numero_conta, senha} = req.query;

    try {

      //Verificando / Buscando a conta digitada no req
      const conta = encontraContaPeloNumero(contas,  numero_conta);
      if(!conta){
        return res.status(404).send({mensagem: 'Não existe conta para o Número de conta informado.'})
      }

      //Verificando a senha
      if(!verificaSenha(conta, senha)){
        return res.status(401).send({mensagem: 'Acesso negado. Senha incorreta!'});
      }

      //Encontrando saldo
      const saldo = buscandoSaldoPorConta(conta);
      return res.status(200).send({saldo: saldo})

    } catch (erro) {
      console.log(erro);
      return res.status(200).send({mensagem: 'Erro no servidor, tente novamente mais tarde!'});
    }
  }


  static extrato(req, res){
    const {numero_conta, senha} = req.query;

    try {
       //Verificando se os campos da requisição estão vazios
      const erroCampoVazio = verificaCamposVazios(req.query, 'numero_conta', 'senha');
      if(erroCampoVazio){
        return res.status(400).send({mensagem: erroCampoVazio})
      }


      //Verificando se a conta existe
      const conta = encontraContaPeloNumero(contas,  numero_conta);
      if(!conta){
        return res.status(404).send({mensagem: 'Não existe conta para o Número de conta informado.'})
      }

      //Verificando a senha
      if(!verificaSenha(conta, senha)){
        return res.status(401).send({mensagem: 'Acesso negado. Senha incorreta!'});
      }
      
      //Buscando o extrato da conta
      const extrato = buscaExtratoPorConta(numero_conta, depositos, saques, transferencias);
    
      return res.status(200).send(extrato);
    
    } catch (erro) {
      console.log(erro);
      return res.status(200).send({mensagem: 'Erro no servidor, tente novamente mais tarde!'});
    }
   
  }
}


export default VisualizacoesContaController;