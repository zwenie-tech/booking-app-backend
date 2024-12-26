import Mail from "nodemailer/lib/mailer";
import { EMailRepository } from "../../../domain/repositories/email-repository.interface";
import nodemailer, { SentMessageInfo, TransportOptions } from 'nodemailer';

export class NodeMailerService implements EMailRepository{
    private transporter : Mail<SentMessageInfo>
    constructor(){
        this.transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT!),
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.MAIL_USER, 
              pass: process.env.MAIL_PASS, // test changes
            },
        })
    }
    async sendMail(from: string, to: string, content: string, subject: string): Promise<string> {
        const info = await this.transporter.sendMail({
            from,
            to,
            subject,
            text: content, // plain text body
            html: "<b>Hello world?</b>", // html body
        })
        return info.messageId;
    }
}