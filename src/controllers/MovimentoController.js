const Movimento = require('../models/Movimento');

const movimentoController = {
  getAll: async (req, res) => {
    try {
      const movimentos = await Movimento.findAll();
      res.json(movimentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const movimento = await Movimento.findByPk(id);
      if (movimento) {
        res.json(movimento);
      } else {
        res.status(404).json({ message: 'Movimento not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  create: async (req, res) => {
    const { descricao, valor } = req.body;
    try {
      const novoMovimento = await Movimento.create({ descricao, valor });
      res.status(201).json({ message: 'Movimento criado com sucesso', movimento: novoMovimento });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { descricao, valor } = req.body;
    try {
      const movimento = await Movimento.findByPk(id);
      if (movimento) {
        await movimento.update({ descricao, valor });
        res.json({ message: 'Movimento atualizado com sucesso', movimento });
      } else {
        res.status(404).json({ message: 'Movimento not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const movimento = await Movimento.findByPk(id);
      if (movimento) {
        await movimento.destroy();
        res.json({ message: 'Movimento excluído com sucesso' });
      } else {
        res.status(404).json({ message: 'Movimento not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = movimentoController;
