const Sequelize = require('sequelize');
const database = require('../db');

const ContaCorrente= require('./ContaCorrente');

const Movimento = database.define('movimento', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    conta_corrente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: ContaCorrente,
            key: 'id'
        }
    },
    tipo: {
        type: Sequelize.STRING(1),
        allowNull: false
    },
    data_movimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    contacorrente_origem: {
        type: Sequelize.BIGINT
    },
    contacorrente_destino: {
        type: Sequelize.BIGINT
    },
    observacao: {
        type: Sequelize.STRING(255)
    }
});

module.exports = Movimento;
