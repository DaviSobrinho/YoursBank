const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');
const contaCorrenteController = require('../controllers/contaCorrenteController');
const autenticacaoController = require('../controllers/autenticacaoController');
const indexController = require('../controllers/indexController');
const loginController = require('../controllers/LoginController');

// Rota raiz - Página inicial
router.get('/', autenticacaoController.verificarAutenticacao, indexController.index);

// Rotas para Pessoa
router.get('/pessoa/cadastrar', pessoaController.cadastrarView);
router.post('/pessoa/cadastrar', pessoaController.cadastrarPessoa);

// Rotas para Conta Corrente
router.get('/conta-corrente', autenticacaoController.verificarAutenticacao, contaCorrenteController.get);
router.post('/conta-corrente', autenticacaoController.verificarAutenticacao, contaCorrenteController.create);
router.get('/conta-corrente/excluir', autenticacaoController.verificarAutenticacao, contaCorrenteController.excluir);
router.get('/conta-corrente/transferir', autenticacaoController.verificarAutenticacao, contaCorrenteController.getTransferencia);
router.post('/conta-corrente/transferir', autenticacaoController.verificarAutenticacao, contaCorrenteController.transferir);
router.get('/conta-corrente/historico', autenticacaoController.verificarAutenticacao, contaCorrenteController.historico);

// Rota de login
router.get('/login', loginController.exibirFormularioLogin);
router.post('/login', loginController.realizarLogin);

// Rota de logout
router.get('/logout', loginController.realizarLogout);

module.exports = router;
