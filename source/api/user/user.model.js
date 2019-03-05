//
// ─── USER MODEL ─────────────────────────────────────────────────────────────────
//

/* eslint-disable func-names */

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  username: { type: String, required: true },
  password: { type: String, select: false },
});

UserSchema.pre('save', function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

// Need to use function to enable this.password to work.
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};


const User = mongoose.model('User', LineSchema); 

module.exports = {
  User,
};
