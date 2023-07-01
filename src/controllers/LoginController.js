const Usuario = require('../models/Usuario');
const Pessoa = require('../models/Pessoa');
const ContaCorrente = require('../models/ContaCorrente');


const loginController = {
  exibirFormularioLogin: (req, res) => {
    // Verificar se o usuário já está autenticado
    if (req.session.user) {
      // Redirecionar para a página inicial
      try{
        res.render('index');
      }catch{
        res.render('login');
      }
    } else {
      // Renderizar o formulário de login
      res.render('login');
    }
  },
  realizarLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.findOne({ where: { email } });

      if (usuario && usuario.password === password) {
        // As credenciais são válidas, armazenar o usuário na sessão
        req.session.user = { email };
        // Renderizar a tela de index com os dados da pessoa
        const pessoa = await Pessoa.findByPk(usuario.pessoa_id);
        const contaCorrente = await ContaCorrente.findAll({ where: { usuario_id: usuario.id }});
        res.render('index', { pessoa, contaCorrente });

      } else {
        // As credenciais são inválidas, redirecionar para a tela de login
        res.redirect('/login');
      }
    } catch (error) {
      console.error(error);
      res.redirect('/pessoa/cadastrar');
    }
  },
  realizarLogout: (req, res) => {
    // Remover o usuário da sessão
    req.session.user = null;
    // Redirecionar para a página de login
    res.redirect('/login');
  }
};

module.exports = loginController;
