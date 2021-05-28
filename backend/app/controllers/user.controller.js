const UserSchema = require('../models/employee');
const departementSchema = require('../models/departement');
const AssignSchema = require('../models/assign');
const ticketSchema = require('../models/ticket');
const bcrypt = require('bcryptjs');
const {
  userValidton,
  dipartementValidation,
} = require('../validation/validation');

//@ ADD COLLECTION DEPARTEMENT
const addDepartment = async (req, res) => {
  //@ VALIDATION
  const { error } = dipartementValidation(req.body);
  //@ CHECK IF ERROR
  if (error) return res.statut(400).json({ error: error.details[0].message });
  //@ CREATING NEW INSTANCE OF DEPARTEMENT
  const departement = new departementSchema({ ...req.body });
  try {
    //@ SAVE departement
    await departement.save();
    res.status(200).json({ message: 'A new departement has been added' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server error');
  }
};

//@ GET ALL DEPARTEMENT
const departements = async (req, res) => {
  try {
    const departement = await departementSchema.find();
    return res.status(200).json(departement);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('server error');
  }
};

//@ CREATE USER
const createUser = async (req, res) => {
  //@ VALIDATION
  const { error } = userValidton(req.body);
  //@ CHECK IF ERROR
  if (error) return res.status(400).json({ error: error.details[0].message });
  const { email, password } = req.body;
  try {
    //@ CHECKING USER'S PREVIOUS EXISTANCE
    let user = await UserSchema.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });
    //@ CREATING NEW INSTANCE OF USER
    user = new UserSchema({ ...req.body });
    // @ PASSWORD ENCRYPITIONS
    const salet = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salet);
    //@ SAVE USER
    await user.save();
    return res
      .status(200)
      .json({ message: `A new ${user.role} has been added` });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server error');
  }
};

//@ ASSIGN TICKET
const assignTicket = async (req, res) => {
  const { id_ticket, id_teck, etat } = req.body;
  const assign = new AssignSchema({ id_ticket, id_teck, etat });
  try {
    const save = await assign.save();
    if (save) {
      const update = await ticketSchema.findByIdAndUpdate(
        { _id: id_ticket },
        { etat: 'Assign' }
      );
      if (update)
        res.status(200).json({ message: 'A  ticket has been assigned' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json('server error');
  }
};

//@ GET TICKET ASSIGNED BY ID TECHNICIAN
const assign = async (req, res) => {
  //@ GET ID FROM MIDDLEWARE AUTH
  const id_teck = req.user.id;
  try {
    //@ FIND TICKET FROM TABLE ASSIGN BY ID AND GET SOME DATA TECHNICIAN
    const assign = await AssignSchema.findOne({ id_teck })
      .populate('id_ticket', '-_id')
      .populate('id_teck', '-_id');
    return res.status(200).json(assign);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('server error');
  }
};

//@ RESERVED OR REASSIGNED [TECHNICIAN]
const changeEtatTicket = async (req, res) => {
  //@ GET DATA FROM BODY
  const { etat, id_ticket } = req.body;
  try {
    //@ FIND BY ID AND UPDATE ETAT TICKET
    const changeEtatTicket = await ticketSchema.findByIdAndUpdate(
      { _id: id_ticket },
      { etat: etat }
    );
    //@ CHECK IF CHANGE SUCCESSFUL
    if (changeEtatTicket) {
      await AssignSchema.findByIdAndUpdate({ _id: id_ticket }, { etat: etat });
      res.status(200).json({ message: `Change a ticket has been ${etat}` });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json('server error');
  }
};

//@ HISTORY TICKET
const histiryTicket = async (req, res) => {
  try {
    const history = await AssignSchema.find(req.body.id_ticket)
      .populate('id_ticket', '-_id')
      .populate('id_teck', '-_id');
    return res.status(200).json(history);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('server error');
  }
};

module.exports = {
  createUser,
  addDepartment,
  assignTicket,
  assign,
  changeEtatTicket,
  histiryTicket,
  departements,
};
