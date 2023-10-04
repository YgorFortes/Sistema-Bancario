import express from 'express';
import conta from './contaBancariaRoute.js';
import transacao from './transacaoBancariaRoute.js'
import visualizacao from './visualizacaoConta.Route.js'
export default app => {
  app.get('/', (req, res)=>{
    res.status(200).send({mensagem: 'Sistema bancario funcionando'});
  });

  app.use(
    express.json(),
    conta,
    transacao,
    visualizacao
  )
}