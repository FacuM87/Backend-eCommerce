import nodemailer from "nodemailer"
import config from "../config/config.js"

export default class Mail {
    constructor(){
        this.transport = nodemailer.createTransport({
            service: config.mailService,
            port: config.mailPort,
            auth:{
                user: config.mailUser,
                pass: config.mailPass
            }
    })}

    send = async (user, subject, html) => {
        const options = {
            from: config.mailUser,
            to: user,
            subject,
            html
          }
      
          const result = await this.transport.sendMail(options)
      
          return result
    }
}
