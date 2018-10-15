import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'changebymenodemailer@gmail.com',
        pass: 'GIrcatkedWirTe4'
    }
})

const mailConfig = text => ({
    from: 'changebymenodemailer@gmail.com',
    to: 'Change.by.Kravets@gmail.com',
    subject: 'Sending Email from changeby.me',
    text
})

export const sendMail = text => {    
    transporter.sendMail(mailConfig(text), (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    });
}