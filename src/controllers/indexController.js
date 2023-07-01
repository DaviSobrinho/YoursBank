const indexController = {
  index: (req, res) => {
    // Renderizar a página inicial
    res.redirect('/login');
  }
};

module.exports = indexController;
