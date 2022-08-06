const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, EmailVerify } = require('../model');
const { sendEmail } = require('./mailJetEmail');

const registerUser = async (req, res, isChildAccount = false) => {
  try {
    const { fname, lname, email, pass, username } = req.body;

    // Validate user input
    if (!(email && pass && username)) {
      return res.status(400).json({ message: 'All input are required' });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    if (oldUser) {
      if (isChildAccount) {
        return {
          success: false,
          message: 'UserName or Email already Exist',
        };
      }
      return res
        .status(400)
        .json({ message: 'UserName or Email already Exist' });
    }

    //Encrypt user pass
    let encryptedpass = await bcrypt.hash(pass, 10);

    // Create user in our database

    const lastRecord = await User.findOne().sort({ _id: -1 }).limit(1);

    let counterId;

    if (lastRecord == null) {
      counterId = process.env.MONGO_Counter;
      ////  console.log(process.env.MONGO_Counter);
    } else {
      /////console.log(lastRecord.counterId);

      counterId = lastRecord.counterId + 1;
    }

    const user = await User.create({
      fname,
      lname,
      email: email.toLowerCase(),
      username: username.toLowerCase(), // sanitize: convert email to lowercase
      pass: encryptedpass,
      counterId: counterId,
    });

    console.log('Toen time  now', process.env.TOKEN_Time);

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_Time,
      }
    );
    // save user token
    user.token = token;
    console.log(token);

    const VerifiedEmial = await EmailVerify.create({
      email: email.toLowerCase(),
    });

    var emailParameters = {
      fname,
      email,

      uniquelink:
        process.env.websiteLink +
        'api/email/verify/' +
        email.toLowerCase() +
        '/uniqueid/' +
        VerifiedEmial._id,
    };

    let emailToSend = [
      {
        Email: email,
      },
    ];

    ///// subject, data, emaile templete to select
    sendEmail(
      emailToSend,
      'Welcome to API Service',
      emailParameters,
      'veerify_Email_Body'
    );

    // return new user
    if (isChildAccount) {
      return {
        success: true,
        message: 'Verfication Email has been sent.Please Check your email',
        user,
      };
    }

    return res
      .status(201)
      .json('Verfication Email has been sent.Please Check your email ');
  } catch (err) {
    console.log(err);
    if (isChildAccount) {
      return {
        success: false,
        message: 'something Went Wrong',
      };
    }
    return res.status(400).json({ message: 'something Went Wrong' });
  }
};

module.exports = {
  registerUser,
};
