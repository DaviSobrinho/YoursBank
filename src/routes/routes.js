const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');
const usuarioController = require('../controllers/usuarioController');
const contaCorrenteController = require('../controllers/contaCorrenteController');
const movimentoController = require('../controllers/movimentoController');
const autenticacaoController = require('../controllers/autenticacaoController');
const indexController = require('../controllers/indexController');
const loginController = require('../controllers/LoginController');

// Rota raiz - Página inicial
router.get('/', autenticacaoController.verificarAutenticacao, indexController.index);

// Rotas para Pessoa
router.get('/pessoa/cadastrar', pessoaController.cadastrarView);
router.post('/pessoa/cadastrar', pessoaController.cadastrarPessoa);

// Rotas para Usuario
router.get('/usuario', autenticacaoController.verificarAutenticacao, usuarioController.getAll);
router.get('/usuario/:id', autenticacaoController.verificarAutenticacao, usuarioController.getById);
router.post('/usuario', autenticacaoController.verificarAutenticacao, usuarioController.create);
router.put('/usuario/:id', autenticacaoController.verificarAutenticacao, usuarioController.update);
router.delete('/usuario/:id', autenticacaoController.verificarAutenticacao, usuarioController.delete);

// Rotas para Conta Corrente
router.get('/conta-corrente', autenticacaoController.verificarAutenticacao, contaCorrenteController.get);
router.post('/conta-corrente', autenticacaoController.verificarAutenticacao, contaCorrenteController.create);
router.get('/conta-corrente/excluir', autenticacaoController.verificarAutenticacao, contaCorrenteController.excluir);

// Rotas para Movimento
router.get('/movimento', autenticacaoController.verificarAutenticacao, movimentoController.getAll);
router.get('/movimento/:id', autenticacaoController.verificarAutenticacao, movimentoController.getById);
router.post('/movimento', autenticacaoController.verificarAutenticacao, movimentoController.create);
router.put('/movimento/:id', autenticacaoController.verificarAutenticacao, movimentoController.update);
router.delete('/movimento/:id', autenticacaoController.verificarAutenticacao, movimentoController.delete);

// Rota de login
router.get('/login', loginController.exibirFormularioLogin);
router.post('/login', loginController.realizarLogin);

// Rota de logout
router.get('/logout', loginController.realizarLogout);

module.exports = router;
