import express from 'express';
import routers from './router/index.js';
const app = express();

const porta = 3000;
routers(app);


app.listen(porta, ()=>{
  console.log(`Servidor funcionado na porta http://localhost:${porta}/`);
});

export default app;