const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const departementSchema = new Schema(
  {
    lastName: { type: String, require: true },
    responsable: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = model('Departement', departementSchema);
