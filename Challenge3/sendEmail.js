const nodemailer = require('nodemailer');
const fs = require('fs');

//here I used my email, password and send email to hr@ignitershub.com , for security reasons I am hiding this password if you want to test this code ,kindly add your Email id and password
const myEmail = 'vibhademla@gmail.com';
//const myPassword = '';     //app specific password

//object that handles sending of the email ,configured with gmail service and sender's details
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: myEmail,
    pass: myPassword
  }
});

//object defining email properties
const sendEmail = async () => {
  try {
    let mailOptions = {
      from: myEmail,
      to: 'hr@ignitershub.com',
      subject: 'Challenge 3 Completed',
      text: 'Name: Vibha\nSemester: 4th\nBranch:Computer Science\nRoll Number: 202201051\nGithub Repo: https://github.com/VibhaDemla/IgnitersHubProjects-intern-assignment',
      attachments: [
        {
          filename: 'VD_Photo.jpeg',
          path: './VD_Photo.jpeg',

        }
      ]
    };

  //Sends the email using the configured transporter and the specified mail options
  let data = await transporter.sendMail(mailOptions);
  console.log('Email sent: ' + data.response);
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

sendEmail();
