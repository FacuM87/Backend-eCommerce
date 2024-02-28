import nodemailer from "nodemailer"
import config from "../config/config"

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
        
    }
}
