const express = require('express');
const session = require('express-session');
const path = require('path');

const db = require('./src/db')
db.sync(() => console.log(`Banco de dados conectado`));


const bodyParser = require('body-parser');





const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'html');


// Configurar o express-session
app.use(session({
  secret: 'admin',
  resave: false,
  saveUninitialized: false
}));

// Configurar as rotas
const routes = require('./src/routes/routes');
app.use('/', routes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
