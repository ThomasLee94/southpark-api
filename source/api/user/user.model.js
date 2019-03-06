//
// ─── USER MODEL ─────────────────────────────────────────────────────────────────
//

/* eslint-disable func-names */

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, select: false },
});

UserSchema.pre('save', function(next) {
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

const User = mongoose.model('User', UserSchema); 

module.exports = {
  User,
};
