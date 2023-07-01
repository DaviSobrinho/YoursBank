const ContaCorrente = require('../models/ContaCorrente');
const Usuario = require('../models/Usuario');
const Movimento = require('../models/Movimento')
const Pessoa = require('../models/Pessoa');
const loginController = require('./LoginController');
let contaCorrente = null;
let cpf = null;
let pessoa = null;
let usuario = null;
let movimento = null;

const contaCorrenteController = {
  get: async (req, res) => {
    try {
      cpf = req.query.cpf;
      res.render('cadastro-conta'); // Renderiza o formulário de cadastro de conta corrente
    } catch (error) {
      console.error(error);
      return res.redirect('/login'); // Redireciona para a tela index após processar a criação da conta
    }
  },

  create: async (req, res) => {
    const { saldo, numero } = req.body;
    try {
      pessoa = await Pessoa.findOne({ where: { cpf: cpf } });
      usuario = await Usuario.findOne({ where: { pessoa_id: pessoa.id } });
      if (usuario) {
        const today = new Date().getDate();
        const novaContaCorrente = await ContaCorrente.create({
          numero: numero,
          usuario_id: usuario.id,
          nome: pessoa.nome,
          data_abertura: today,
          saldo,
        });
        contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id } });
        res.render('index', { pessoa, contaCorrente });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  excluir: async (req, res) => {
    try {
      const numero = req.query.numero;
      const conta = await ContaCorrente.findOne({ where: { numero: numero } });
      usuario = await Usuario.findOne({ where: { id: conta.usuario_id } });
      pessoa = await Pessoa.findOne({ where: { id: usuario.pessoa_id } });
      contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id } });
      if (conta) {
        await conta.destroy();
        contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id } });
        res.render('index', { pessoa, contaCorrente });
      } else {
        contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id } });
        res.render('index', { pessoa, contaCorrente });
      }
    } catch (error) {
      console.error(error);
      contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id } });
      res.render('index', { pessoa, contaCorrente });
    }
  },

  getTransferencia: async (req, res) => {
    try {
      const cc = req.query.id;
      const conta = await ContaCorrente.findByPk(cc);
      usuario = await Usuario.findOne({ where: { id: conta.usuario_id } });
      pessoa = await Pessoa.findOne({ where: { id: usuario.pessoa_id } });
      res.render('cadastro-movimento'); // Renderiza o formulário de transferência
    } catch (error) {
      console.error(error);
      return res.redirect('/login'); // Redireciona para a tela de login
    }
  },

  transferir: async (req, res) => {
    const { contaOrigem, contaDestino, valor } = req.body;
    try {
      const origem = await ContaCorrente.findOne({ where: { numero: contaOrigem } });
      const destino = await ContaCorrente.findOne({ where: { numero: contaDestino } });
      contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id } });
      console.log("Destino"+destino)
      const valorTransferencia = parseFloat(valor);

      if (origem && destino) {
        // Verifica se a conta de origem tem saldo suficiente para a transferência
        if (origem.saldo >= valorTransferencia) {
          origem.saldo -= valorTransferencia;
          destino.saldo += valorTransferencia;
          await origem.save();
          await destino.save();
          const today = new Date().getDate();
          movimento = await Movimento.create({
            conta_corrente_id : origem.id,
            contacorrente_origem: origem.numero,
            contacorrente_destino: destino.numero,
            tipo: "D",
            data_movimento: today,
            valor : valorTransferencia,
            observacao: "Transferência bancária",
          });
          movimento = await Movimento.create({
            conta_corrente_id : destino.id,
            contacorrente_origem: destino.numero,
            contacorrente_destino: origem.numero,
            tipo: "C",
            data_movimento: today,
            valor : valorTransferencia,
            observacao: "Transferência bancária",
          });
          contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id } });
          res.render('index', { pessoa, contaCorrente });
        } else {
          res.status(400).json({ message: 'Saldo insuficiente na conta de origem' });
        }
      } else {
        res.status(400).json({ message: 'Conta de origem ou destino não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  historico: async (req, res) => {
    try {
      const cc = req.query.id;
      const conta = await ContaCorrente.findByPk(cc);
      movimento = await Movimento.findAll({ where: { conta_corrente_id: conta.id } });
      res.render('consulta-movimentos',{movimento}); 
    } catch (error) {
      console.error(error);
      return res.redirect('/login'); 
    }
  },

  // Restante do código...

};

module.exports = contaCorrenteController;
