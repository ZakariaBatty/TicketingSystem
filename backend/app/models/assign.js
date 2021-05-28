const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const d = new Date();
let month = d.getMonth() + 1;
if (month < 10) month = `0${month}`;
const dt = `${d.getFullYear()}-${month}-${d.getDate()}`;

const assign = new Schema({
  id_ticket: { type: Schema.ObjectId, ref: 'Ticket' },
  id_teck: { type: Schema.ObjectId, ref: 'Employee' },
  date: { type: String, default: dt },
  etat: {
    type: String,
    ennum: ['initialize', 'reserved', 'reassigned'],
    default: 'initialize',
  },
});

module.exports = model('Assign', assign);
