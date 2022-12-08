var nodemailer=require('nodemailer');
var smtpTransport=require('nodemailer-smtp-transport');

var transporter=nodemailer.createTransport(
    smtpTransport({
        service:'gmail',
        port:465,
        secure:true,
        auth:{
            user:"kumarnitesh88771@gmail.com",
            pass:"Nitesh@123"
        }
    })
);

module.exports=transporter;