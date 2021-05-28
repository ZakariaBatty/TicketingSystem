const ticketSchema = require('../models/ticket');
const { ticketValidation } = require('../validation/validation');

//@ CREATE TICKE
const createTcket = async (req, res) => {
  //@ VALIDATION
  const { error } = ticketValidation(req.body);
  //@ CHECK IF ERROR
  if (error) return res.status(400).json({ error: error.details[0].message });
  //@ CREATING NEW INSTANCE OF TICHEK
  const { titre, type, urgence, discription } = req.body;
  const userId = req.user.id;
  const ticket = new ticketSchema({
    titre,
    type,
    urgence,
    discription,
    userId,
  });
  try {
    //@ SAVE ticket
    await ticket.save();
    res.status(200).json({ message: 'A new ticket has been added' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json('server error');
  }
};

//@ GET ALL TICKETS
const tickets = async (req, res) => {
  const { etat, date } = req.body;
  try {
    if (etat) {
      const tickets = await ticketSchema.find({ etat });
      return res.status(200).json(tickets);
    }
    if (date) {
      const tickets = await ticketSchema.find({ date });
      return res.status(200).json(tickets);
    } else {
      const tickets = await ticketSchema.find();
      return res.status(200).json(tickets);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json('server error');
  }
};

module.exports = { createTcket, tickets };
