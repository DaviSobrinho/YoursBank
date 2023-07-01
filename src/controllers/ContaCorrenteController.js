const ContaCorrente = require('../models/ContaCorrente');
const Usuario = require('../models/Usuario');
const Pessoa = require('../models/Pessoa');
const loginController = require('./LoginController');
let contaCorrente = null;
let cpf = null;
let pessoa = null;
let usuario = null


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
    const { saldo , numero} = req.body;
    try {
      pessoa = await Pessoa.findOne({where : { cpf: cpf }})
      usuario = await Usuario.findOne({ where: { pessoa_id: pessoa.id } });
      if (usuario) {
        const today = new Date().getDate();
        const novaContaCorrente = await ContaCorrente.create({
          numero: numero,
          usuario_id: usuario.id,
          nome: pessoa.nome,
          data_abertura: today,
          saldo
        });
        contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id }});
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
      pessoa = await Pessoa.findOne({where : { id: usuario.pessoa_id }})
      contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id }});
      if (conta) {
        await conta.destroy();
        contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id }});
        res.render('index',{pessoa, contaCorrente});
      } else {
        contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id }});
        res.render('index',{pessoa, contaCorrente});
      }
    } catch (error) {
      console.error(error);
      contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id }});
      res.render('index',{pessoa, contaCorrente});
    }
  }
  

  // Restante do código...

};

module.exports = contaCorrenteController;
