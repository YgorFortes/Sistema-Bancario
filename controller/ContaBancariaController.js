import bancodedados from "../model/bancodedados.js";
const {contas} = bancodedados;

//Importando helpers
import verificacoesHelpers from "../helpers/verificacoesHelpers.js";
const {verificaCamposVazios, verificaDuplicidade, verificaRequisicaoVazia} = verificacoesHelpers;

import utilitariosConta from "../helpers/utilitariosConta.js";
const {numeroContaUnico, encontraContaPeloNumero} = utilitariosConta;


import gerenciamentoDeCrudHelpers from "../helpers/gerenciamentoDeCrudHelpers.js";
const {adicionarConta, atualizarCamposUsuario, excluirConta} = gerenciamentoDeCrudHelpers;

class ContaBancariaController{
  
  static async listarContasBancarias(req, res, next){
    try {


      if(contas.length <1) {
        return res.status(404).send({mensagem: 'nenhuma conta encontrada'})
      }


      return res.status(200).send(contas);
    } catch (erro) {
      console.log(erro)
    }
    
  }

  static async criarContaBancaria (req, res){
    const {nome, cpf, dataNascimento, telefone, email, senha} = req.body;
    const numero = numeroContaUnico();
    const saldo = 0;
 
    try {

      //Verificando se os campos estão em branco
      const erroCampos = verificaCamposVazios(req.body, 'nome', 'cpf', 'dataNascimento', 'telefone', 'email', 'senha' );


      if(erroCampos){
        return res.status(400).send({mensagem: erroCampos});
      }


      //verificando duplicacao de número da conta, cpf do usuário e email
      const erroDuplicidade = verificaDuplicidade(cpf, email);
      if(erroDuplicidade){
         return res.status(404).send({mensagem: erroDuplicidade});
      }
     

      //Criando um usuario e adicionando uma conta
      const usuario = {
        nome, cpf, dataNascimento, telefone, email, senha
      }

      adicionarConta(contas, numero, saldo, usuario);
      

      //Buscando nova conta
      const resultadoBuscaConta = encontraContaPeloNumero(contas, numero);
      if(!resultadoBuscaConta){
        return res.status(404).send({mensagem: 'Não existe conta para o Número de conta informado.'});
      }


      return res.status(201).send(resultadoBuscaConta);
    } catch (erro) {
      console.log(erro)
      return res.status(500).send({mensagem: 'Erro interno no servidor, tente novamente mais tarde!'});
    }
  }



  static async atualizarContaBancaria(req, res){
    const {nome, cpf, data_Nascimento, telefone, email, senha} = req.body;
    const {numeroConta} = req.params;

    try {


      //Verificando se foi digitado numero na url
      if(isNaN(numeroConta)){
        return res.status(400).send({mensagem: 'Número de conta informado no formato inválido. Digite um número.'});
      }


      //Verificando se a conta existe
      const resultadoBuscaConta = encontraContaPeloNumero(contas, numeroConta);
      if(!resultadoBuscaConta){
        return res.status(404).send({mensagem: 'Não existe conta para o Número de conta informado.'});
      }


      //verificando duplicacao de número da conta, cpf do usuário e email
      const erroDuplicidade = verificaDuplicidade(cpf, email);
      if(erroDuplicidade){
         return res.status(400).send({mensagem: erroDuplicidade});
      }


      //Verificando se foi deixado campo do corpo vazio
      const erroCampoVazio = verificaRequisicaoVazia(req.body);
      if(erroCampoVazio){
        return res.status(400).send({mensagem: erroCampoVazio});
      }
    

      //Atualizando campo, conforme campo digitado no body
      atualizarCamposUsuario(resultadoBuscaConta, req);
    

     return res.status(200).send({mensagem: 'Conta atualizada com sucesso!'});
    } catch (erro) {
      console.log(erro)
      return res.status(500).send({mensagem: 'Erro no servidor, tente novamente mais tarde!'});
    }
  }

  static deletaConta(req, res){
    const {numeroConta} = req.params;

    try {


      //Encontando/ verificando  se a conta existe e pegando seu index 
      const indexConta = contas.findIndex((conta)=> conta.numero === numeroConta);
      const conta =  encontraContaPeloNumero(contas, numeroConta);
      if(!conta){
        return res.status(400).send({mensagem: 'Conta informada não encontrada.'});
      }
      

      //Veirificando se o numero da conta é valido
      if(isNaN(numeroConta)){
        return res.status(400).send({mensagem: ' Número de conta informado no formato inválido. Digite um número.'});
      }
      

      //Verificando se a conta estar zerada e excluindo
      excluirConta(conta,indexConta, res);
      


    } catch (erro) {
      console.log(erro)
      return res.status(500).send({mensagem: 'Erro no servidor, tente novamente mais tarde!'});
    }
  
  }
}










export default ContaBancariaController;