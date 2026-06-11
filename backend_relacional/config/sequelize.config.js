const { Sequelize } = require("sequelize");
const env = require("../config/env");

module.exports.createSequelize = () => {
  const seq = new Sequelize(env.db.name, env.db.user, env.db.pass, {
    host: env.db.host,
    port: env.db.port,
    dialect: env.db.dialect,
    logging: false,
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: false,
    },
    pool: { // opcional
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
  return seq;
    // Sincroniza los modelos con la base de datos
    sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
    }).catch(err => {
    console.log('Error al sincronizar la BDD', err);
    });

    // {force: true}  → elimina y vuelve a crear todas las tablas (solo desarrollo)
    // {alter: true}  → ajusta las tablas existentes sin eliminar datos
};
