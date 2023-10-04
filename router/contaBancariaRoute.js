import { Router } from "express";
import ContaBancariaController from "../controller/ContaBancariaController.js";
import verificaSenha from '../middleware/verificaSenhaMiddleware.js';
const router = Router();

router
.get('/contas',verificaSenha, ContaBancariaController.listarContasBancarias)
.post('/contas', verificaSenha, ContaBancariaController.criarContaBancaria)
.put('/contas/:numeroConta/usuario', verificaSenha, ContaBancariaController.atualizarContaBancaria)
.delete('/contas/:numeroConta', verificaSenha ,ContaBancariaController.deletaConta)


export default router;