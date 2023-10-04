import { Router } from "express";
import TransacaoController from "../controller/TransacaoController.js";

const router = Router();

router
.post('/transacoes/depositar',  TransacaoController.depositar)
.post('/transacoes/sacar', TransacaoController.sacar)
.post('/transacoes/transferir',  TransacaoController.tranferir)

export default router;