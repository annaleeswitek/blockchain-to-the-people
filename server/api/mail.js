const nodeMailer = require("nodemailer");
const router = require("express").Router();

router.post('/send-email', function (req, res) {
    let email = req.body.email; 
    let name = req.body.name; 
    let subject = req.body.subject; 
    let message = req.body.message;   
    //let code = req.params.code

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'blockchaintothepeople@gmail.com',
            pass: 'ethereumElection'
        }
      });

        let mailOptions = {
          from: 'Blockchain to the People <blockchaintothepeople@gmail.com>', // sender address
          to: req.body.email, // list of receivers
          subject: req.body.subject, // Subject line
          text: `Hi, ${name}! ${req.body.message}`, // plain text body
        //   html: '<b>NodeJS Email Tutorial</b>' // html body
      };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
                res.send("it worked");
            });
    });

    
module.exports = router; 
