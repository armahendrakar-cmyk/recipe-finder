const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Newly added import

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true, // Ensures no two users can register with the same email
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
    password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
    favorites: [
    {
      // Each object in the array will have a recipeId.
      recipeId: {
        type: String,
        required: true,
      },
      // Each object will also have a notes field.
      // We set a default value of an empty string (''). This is a crucial
      // best practice. It ensures that the `notes` property will always exist
      // on a favorite object, even if one isn't provided. This prevents
      // potential `undefined` errors on the frontend and simplifies our API logic.
      notes: {
        type: String,
        default: '',
      },
    },
  ],
  },
  {
    timestamps: true,
  }
);

// Newly added pre-save hook
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;