const Contact = require("../models/contactModel");
const { validationResult } = require("express-validator");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingContact = await Contact.findOne({ email: req.body.email });
    if (existingContact) {
      return res
        .status(409)
        .json({ message: "Contact with this email already exists" });
    }

    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    console.log(error);
  }
};
exports.updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.test = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    res.status(200).json({ test: "ok" });
  } catch (e) {
    console.log(e);
    res.status(200).json({ msg: e.message });
  }
};
