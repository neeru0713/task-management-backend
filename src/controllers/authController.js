const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    let newUser = await authService.createUser(req.body);

    const tokens = await authService.generateAuthTokens(newUser);
    let resObj = {
      user: newUser,
      tokens: tokens,
      message: "Congratulations and welcome to craftnest",
    };
    res.status(201).json(resObj);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    let user = await authService.loginUserWithEmailAndPassword(
      req.body.email,
      req.body.password
    );

    if (!user) {
      res.status(401).json({
        error: "Incorrect password",
      });
    } else {
      const tokens = await authService.generateAuthTokens(user);
      let resObj = {
        user: user,
        token: tokens?.access?.token,
      };
      res.status(200).json(resObj);
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
