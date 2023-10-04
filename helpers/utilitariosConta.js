import bancodedados from "../model/bancodedados.js";
const {contas} = bancodedados;

function encontraContaPeloNumero(contas, numeroConta){
  const conta = contas.find((conta)=> conta.numero === numeroConta);
  if(conta){
    return conta;
  }
  return false;
}


function formataData(){
  const data = new Date().toLocaleString()
  const [dataCalendario, horario] = data.split(', ');

 return `${dataCalendario} ${horario}`;
}



function numeroContaUnico(){
  let numeroConta = 0;
  contas.map((conta)=> {
    return numeroConta= Number(conta.numero) +1;
  });
  let numeroContaEmString = numeroConta.toString(); 
  return numeroContaEmString;
}


export default {encontraContaPeloNumero, formataData, numeroContaUnico}
