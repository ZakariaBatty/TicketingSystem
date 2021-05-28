const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const d = new Date();
let month = d.getMonth() + 1;
if (month < 10) month = `0${month}`;
const dt = `${d.getFullYear()}-${month}-${d.getDate()}`;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      ennum: ['Employee', 'Admin', 'Teck'],
      default: 'Employee',
    },
    idDepartement: { type: Schema.ObjectId, ref: 'Departement' },
    dateEmbauche: { type: String, default: dt },
  },
  { timestamps: true }
);
module.exports = model('Employee', userSchema);
