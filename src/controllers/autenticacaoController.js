const autenticacaoController = {
  verificarAutenticacao: (req, res, next) => {
    // Verificar se o usuário está autenticado
    if (req.session && req.session.user) {
      // O usuário está autenticado, podemos prosseguir para a próxima rota
      next();
    } else {
      if (req.path === '/pessoa/cadastrar') {
        next();
      } else {
        res.redirect('/login');
      }
    }
  }
};

module.exports = autenticacaoController;
