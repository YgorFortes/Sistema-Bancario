import bancodedados from "../model/bancodedados.js";
const {depositos, contas, saques, transferencias} = bancodedados;

//Importando helpers
import verificacoesHelpers from "../helpers/verificacoesHelpers.js";
const {verificaCamposVazios, verificaSenha, verificaValorDisponivel} = verificacoesHelpers;

import operacoesBancariasHelpers from "../helpers/operacoesBancariasHelpers.js";
const {depositandoSaldo, sacandoSaldo, transferindoSaldo} = operacoesBancariasHelpers;

import utilitariosConta from "../helpers/utilitariosConta.js";
const {encontraContaPeloNumero} = utilitariosConta;


class TransacaoController {

  static depositar(req, res){
    const {numeroConta, valor} = req.body;

    try {
      
      //Verificando se os campos foram digitados
      const erroCampos = verificaCamposVazios(req.body, 'numeroConta', 'valor');
      if(erroCampos){
        return res.status(404).send({mensagem: erroCampos})
      }
      

      //Verificando se o valor é positivo
      if(!verificaValorDisponivel(valor)){
        return res.status(400).send({mensagem: 'Valor deve ser maior que zero'});
      }
     

      //Veritifcando / Encontrando a conta pelo numero dela
      const conta = contas.find((conta)=> conta.numero === numeroConta);
      if(!conta){
        return res.status(404).send({mensagem: 'Não existe conta para o Número de conta informado.'});
      }


      //Depositando o valor para conta
      depositandoSaldo(conta, valor);
      
      
      return res.status(200).send({mensagem: 'Depósito realizado com sucesso!'});
    } catch (erro) {
      console.log(erro)
      return res.status(200).send({mensagem: 'Erro no servidor, tente novamente mais tarde!'});
    } 
  }

  static sacar(req, res){
    const {numeroConta, valor, senha} = req.body;


    try {

      //Verificando se os campos foram digitados
      const erroCampos = verificaCamposVazios(req.body, 'numeroConta', 'valor', 'senha');
      if(erroCampos){
        return res.status(404).send({mensagem: erroCampos});
      }


      //Verificando / encontrando a conta pelo numero dela
      const conta =  encontraContaPeloNumero(contas, numeroConta);
      if(!conta){
        return res.status(404).send({mensagem: 'Não existe conta para o Número de conta informado.'});
      }


      //Verificando se senha coincide com a mandada pela requisição
      if(!verificaSenha(conta, senha)){
        return res.status(401).send({mensagem: 'Acesso negado. Senha incorreta!'});
      }


      //Verificando o saldo disponivel
      if(!verificaValorDisponivel(conta.saldo, valor)){
        return res.status(400).send({mensagem: 'Saldo indisponivel'});
      }
     

    
      //Sacando o saldo disponível  
      sacandoSaldo(conta, valor);

      return res.status(200).send({mensagem: 'Saque realizado com sucesso!'});
    } catch (erro) {
      console.log(erro)
      return res.status(200).send({mensagem: 'Erro no servidor, tente novamente mais tarde!'});
    }
  }

  static tranferir(req,res){
    
   const {numeroConta, senha, valor, numeroContaDestino} = req.body;

   try {

      //Verificando se tem campos em branco
      const erroCampos = verificaCamposVazios(req.body, 'numeroConta',  'senha', 'valor', 'numeroContaDestino');
      if(erroCampos){
        return res.status(404).send({mensagem: erroCampos});
      }


      //Verificando / Encontrando a conta
      const conta = encontraContaPeloNumero(contas, numeroConta);
      if(!conta){
        return res.status(404).send({mensagem: 'Não existe conta para o Número de conta informado'});
      }


      //Verificando / Encontrando a conta destino
      const contaDestino = encontraContaPeloNumero(contas, numeroContaDestino);
      if(!contaDestino){
        return res.status(404).send({mensagem: 'Não existe conta para o Número de conta destino informado.'});
      }


      //Verificando se senha coincide com a mandada pela requisição
      if(!verificaSenha(conta, senha)){
        return res.status(401).send({mensagem: 'Acesso negado. Senha incorreta!'});
      }


      //Verificando se existe saldo disponível
      if(!verificaValorDisponivel(conta.saldo, valor)){
        return res.status(400).send({mensagem: 'Saldo indisponivel ou insuficiente'});
      }


      //Tirando o valor da conta, e mandando para conta transferencia
      transferindoSaldo(conta, contaDestino, valor);


      return res.status(200).send({mensagem: 'Transferência realizada com sucesso!'});
   } catch (erro) {
    console.log(erro)
      return res.status(200).send({mensagem: 'Erro no servidor, tente novamente mais tarde!'});
   }
  }
}













export default TransacaoController;