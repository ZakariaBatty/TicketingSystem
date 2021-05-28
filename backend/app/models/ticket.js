const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const d = new Date();
let month = d.getMonth() + 1;
if (month < 10) month = `0${month}`;
const dt = `${d.getFullYear()}-${month}-${d.getDate()}`;

const ticket = new Schema(
  {
    titre: { type: String, require: true },
    type: { type: String, require: true },
    urgence: { type: String, ennum: ['normal', 'urgence', 'moyenne'] },
    discription: { type: String, require: true },
    etat: {
      type: String,
      ennum: ['Assign', 'initialize', 'reserved', 'reassigned'],
      default: 'Initial',
    },
    date: { type: String, default: dt },
    userId: { type: Schema.ObjectId, ref: 'Employee' },
  },
  { timestamps: true }
);

module.exports = model('Ticket', ticket);
