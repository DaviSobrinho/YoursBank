const Sequelize = require('sequelize');
const database = require('../db');

const Usuario = require('./Usuario');

const ContaCorrente = database.define('conta_corrente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    numero: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_abertura: {
        type: Sequelize.DATE,
        allowNull: false
    },
    saldo: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = ContaCorrente;
