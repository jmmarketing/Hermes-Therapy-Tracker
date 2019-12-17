var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var SessionSchema = new Schema({
  // `title` is of type String
  positiveInteractions: {
    type: Number,
    required: true
  },
  // `body` is of type String
  appropriateRequests: {
    type: Number,
    required: true
  },
  appropriateResponse: {
    type: Number,
    required: true
  },
  difficultyWith: String,
  successWith: String,
  date: {
    type: Date,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
var Session = mongoose.model("Session", SessionSchema);

// Export the Note model
module.exports = Session;