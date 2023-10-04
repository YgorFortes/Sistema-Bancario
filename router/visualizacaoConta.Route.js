import { Router } from "express";
import VisualizacoesContaController from "../controller/VisualizacoesContaController.js";

const router = Router();

router
.get('/contas/saldo', VisualizacoesContaController.saldo)
.get('/contas/extratos', VisualizacoesContaController.extrato)

export default router;