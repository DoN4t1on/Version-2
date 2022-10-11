const { ObjectId } = require('mongodb');

const { User, ForgetPassword, EmailVerify } = require('../model');
const { sendEmail } = require('../services/mailJetEmail');
const { ThanksEmailBody } = require('../services/EmailTemplates');

const applyForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    let userEmail = email.toLowerCase();
    

    console.log(req.body);
    const user = await User.findOne({
      email: userEmail,
      registeredBy: 'email',
    });

    if (user) {
      const passRecoed = await ForgetPassword.create({
        email: userEmail,
      });

      let uniquelink =
        process.env.websiteLink +
        'updatepass/' +
        encodeURIComponent(userEmail) +
        '/' +
        passRecoed._id;

      console.log(uniquelink);

      var emailParameters = {
        fname: user.fname,
        userEmail,

        uniquelink: uniquelink,
      };

      let emailToSend = [
        {
          Email: userEmail,
        },
      ];

      sendEmail(
        emailToSend,
        'Forget Password',
        emailParameters,
        'ForgetPass_Email_Body'
      );

      console.log(emailParameters);
      return res.status(200).json('Eine Email wurde gesendet');
    } else {
      return res.status(400).json({ message: 'Dieser Nutzer existiert nicht' });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Etwas lief schief' });
  }
};

const verifyEmail = async (req, res) => {
  const { email, uniqueId } = req.params;

  try {
    const Record_Exist = await EmailVerify.findOne({
      $and: [
        {
          email: email,
        },
        {
          _id: ObjectId(uniqueId),
        },
      ],
    });

    if (Record_Exist) {
      const filter = { email: email };
      const update = { verify: 'yes' };

      let doc = await User.findOneAndUpdate(filter, update);
      console.log(doc);

      var emailParameters = {
        email,
        fname: doc.fname,
      };

      let emailToSend = [
        {
          Email: email,
        },
      ];

      // sendEmail(
      //   emailToSend,
      //   'Welcome to  APi Service',
      //   emailParameters,
      //   'Welcome_Email_Body'
      // );
      res.send(ThanksEmailBody);
    } else {
      res.send('Kein Eintrag gefunden');
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Etwas lief schief' });
  }
};

module.exports = {
  applyForgotPassword,
  verifyEmail,
};
