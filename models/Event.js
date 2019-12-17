const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  allDay: {
    type: Boolean,
    required: true,
    default: true
  },
  start: {
    type: Date,
    required: true,
  },
  color: {
    type: String
  },
  link: {
    type: String
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;