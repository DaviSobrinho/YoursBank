const Usuario = require('../models/Usuario');

const usuarioController = {
  getAll: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ message: 'Usuário not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  create: async (req, res) => {
    const { nome, email } = req.body;
    try {
      const novoUsuario = await Usuario.create({ nome, email });
      res.status(201).json({ message: 'Usuário criado com sucesso', usuario: novoUsuario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        await usuario.update({ nome, email });
        res.json({ message: 'Usuário atualizado com sucesso', usuario });
      } else {
        res.status(404).json({ message: 'Usuário not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        await usuario.destroy();
        res.json({ message: 'Usuário excluído com sucesso' });
      } else {
        res.status(404).json({ message: 'Usuário not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = usuarioController;
