const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChildSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  hasIEP: {
    type: Boolean,
    required: true
  },
  school: {
    type: String,
    required: true,
    trim: true
  },
  diagnosis: {
    type: String,
    required: true,
    trim: true
  },
  therapist: {
    type: String,
    required: true,
    trim: true
  },
  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Session"
    }
  ]
});

const Child = mongoose.model("Child", ChildSchema);

module.exports = Child;