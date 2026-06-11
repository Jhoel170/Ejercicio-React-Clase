const { DataTypes } = require('sequelize');
const { createSequelize } = require('../config/sequelize.config');

const sequelize = createSequelize();

const Estudiante = sequelize.define('Estudiante', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      notNull: { msg: "Id is required" }
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "Nombre is required" }
    }
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: { msg: "Edad is required" },
      isInt: { msg: "Edad debe ser un número entero" },
      min: { args: [0], msg: "Edad no puede ser negativa" }
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: "URL no válida" }
    }
  }
}, {
  tableName: 'estudiantes'
});

module.exports = { Estudiante };

/*-- Crear la base de datos
CREATE DATABASE bdd_epn;

-- Usar la base de datos
USE bdd_epn;

-- Crear la tabla estudiantes
CREATE TABLE estudiantes (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    url VARCHAR(255)
);

-- Insertar 3 estudiantes de ejemplo
INSERT INTO estudiantes (id, nombre, edad, url) VALUES
(1, 'Juan Perez', 20, 'https://ejemplo.com/juan'),
(2, 'Maria Lopez', 22, 'https://ejemplo.com/maria'),
(3, 'Carlos Ruiz', 19, 'https://ejemplo.com/carlos');*/