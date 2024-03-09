const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

var SALT_WORK_FACTOR = 10;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Complete userSchema, a Mongoose schema for "users" collection
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
     
    },
    password: {
      type: String,
      required: true,
     
    },
    username: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement the isEmailTaken() static method
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  // let user = await this.findOne({ email: email });
  // if(user){
  //   return true;
  // }
  // else{
  //   return false;
  // }
  const result = await this.find({ email: email });
  if (result.length) return true;
  else return false;
};

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

/*
 * Create a Mongoose model out of userSchema and export the model as "User"
 * Note: The model should be accessible in a different module when imported like below
 * const User = require("<user.model file path>").User;
 */
/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);
module.exports = { User };
