const mailjet = require('node-mailjet').connect(
  process.env.MAIL_JET_KEY1,
  process.env.MAIL_JET_KEY2
);

const {
  forgetEmailBody,
  verifyEmailBody,
  welcomeEmailBody,
  Report_Email_Body,
} = require('./EmailTemplates');

async function sendEmail(emailToSend, subject, data, Email_templete) {
  try {
    var Email_Templete_Name = ``;
    if (Email_templete == 'veerify_Email_Body') {
      Email_Templete_Name = await verifyEmailBody(data);
    } else if (Email_templete == 'Welcome_Email_Body') {
      Email_Templete_Name = await welcomeEmailBody(data);
    } else if (Email_templete == 'forgetEmailBody') {
      Email_Templete_Name = await forgetEmailBody(data);
    } else if (Email_templete == 'Report_Email_Body') {
      Email_Templete_Name = await Report_Email_Body(data);
    }

    console.log(Email_Templete_Name);
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'it@localpetition.org',
            Name: process.env.Email_Name,
          },
          To: emailToSend,
          Subject: subject,
          ////TextPart: "here is email",
          HTMLPart: Email_Templete_Name,
          CustomID: 'AppGettingStartedTest',
        },
      ],
    });
    let response = await request;
    console.log(response);
    return response;
  } catch {
    return false;
  }
}

module.exports = {
  sendEmail,
};
