const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const Roles = require("../client/shared/roles");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Child"
    }
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  address: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  role: {
    type: String,
    default: Roles.guardian,
    enum: [Roles.guardian, Roles.therapist]
  }
});

// Execute before each user.save() call
UserSchema.pre("save", function (callback) {
  let user = this;

  // Break out if the password hasn't changed
  if (!user.isModified("password")) {return callback();}

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function (err, salt) {
    if (err) {return callback(err);}

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {return callback(err);}
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {return cb(err);}
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;