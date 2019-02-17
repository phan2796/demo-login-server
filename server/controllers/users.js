const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const { isPasswordSatisfyPolicy } = require('./../utils/common')

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password, cfPassword } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(200).json({
        ok: false,
        error: 'Email is already in use'
      });
    }

    if (!isPasswordSatisfyPolicy(password)) {
      return res.json({
        ok: false,
        errorCode: 200,
        error: 'Password does not satisfy password policy'
      })
    }


    // Create a new user
    const newUser = new User({
      method: 'local',
      local: {
        email: email,
        password: password
      },
      tokens: []
    });


    await newUser.save();
    res.json({
      ok: true,
    })
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);

    await User.findOneAndUpdate({ "_id": req.user._id }, { token });
    // Generate token
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    console.log("googleOAuth - req.user: ", req.user)
    const { token } = req.user
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    console.log("facebookOAuth - req.user: ", req.user)
    const { token } = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  }
}