const Pessoa = require('../models/Pessoa');
const Usuario = require('../models/Usuario');

const pessoaController = {
  cadastrarView: (req, res) => {
    res.render('cadastro');
  },

  cadastrarPessoa: async (req, res) => {
    try {
      const novaPessoa = await Pessoa.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        cpf: req.body.cpf,
        data_nascimento: req.body.data_nascimento,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        cep: req.body.cep
      });

      const novoUsuario = await Usuario.create({
        pessoa_id: novaPessoa.id,
        email: req.body.email,
        password: req.body.password
      });

      res.render('contaCriada');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });

    }
  }
};

module.exports = pessoaController;
