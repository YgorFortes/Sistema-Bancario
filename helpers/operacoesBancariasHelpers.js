import bancodedados from "../model/bancodedados.js";
const {depositos, saques, transferencias, } = bancodedados;
import utilitariosConta from "../helpers/utilitariosConta.js";
const {formataData, encontraContaPeloNumero} = utilitariosConta;


function depositandoSaldo(conta, valor){
  conta.saldo += valor;
  const deposito = {
    data: formataData(),
    numero_conta : conta.numero,
    valor: valor
  }

  depositos.push(deposito);
}


function sacandoSaldo(conta, valor){
  conta.saldo -= valor; 
  const saque = {
    data: formataData(),
    numero_conta : conta.numero,
    valor: valor
  }
  saques.push(saque);
}


function transferindoSaldo(conta, contaDestino, valor){
  conta.saldo -= valor;
  contaDestino.saldo +=valor;

  const transferencia = {
    data: formataData(),
    numero_conta_origem: conta.numero,
    numero_conta_destino: contaDestino.numero,
    valor: valor
  }
  transferencias.push(transferencia)
}

function buscandoSaldoPorConta(conta){
  const saldo =  conta.saldo;
  return saldo;
}


function buscaExtratoPorConta(numero_conta, depositos, saques, transferencias){
 
  const deposito = depositos.filter((deposito)=> deposito.numero_conta === numero_conta);
  const saque = saques.filter((saque)=> saque.numero_conta === numero_conta);
  const tranferenciasEnviadas = transferencias.filter((tranferencia)=> tranferencia.numero_conta_origem === numero_conta);
  const tranferenciasRecebidas = transferencias.filter((tranferencia)=> tranferencia.numero_conta_destino === numero_conta);

  const extrato = {
    depositos: deposito ,
    saques :saque,
    tranferenciasEnviadas,
    tranferenciasRecebidas
  }
  return extrato;
}





export default {depositandoSaldo, sacandoSaldo, transferindoSaldo, buscandoSaldoPorConta ,buscaExtratoPorConta};