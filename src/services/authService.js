const { User } = require("../models/User.js");
const jwt = require("jsonwebtoken");

async function createUser(userBody) {
  console.log(" user body ", userBody);

  let userExists = await User.isEmailTaken(userBody.email);
  console.log(" is userExists ", userExists);
  if (userExists) {
    // let error = new ApiError(httpStatus.OK, "Email already taken");
    // throw error;
  } else {
    const result = await User.create(userBody);
    return result;
  }
}

const generateToken = (userId, secret = "taskmanagementsecret") => {
  const payload = { _id: userId.toString()};
  const token = jwt.sign(payload, secret);
  return token;
};

const generateAuthTokens = async (user) => {
  
  let token = generateToken(user?._id);
  let obj = {
    access: {
      token: token
    },
  };

  return obj;
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
  }

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) {
    // throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    return;
  }

  const isMatching = await user.isPasswordMatch(password);

  if (!isMatching) {
    // throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    return;
  }

  return user;
};

module.exports = {
  createUser,
  generateAuthTokens,
  loginUserWithEmailAndPassword,
  
};
