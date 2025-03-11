import Mail from "nodemailer/lib/mailer";
import { EMailRepository } from "../../../domain/repositories/email-repository.interface";
import nodemailer, { SentMessageInfo } from "nodemailer";

export class NodeMailerService implements EMailRepository {
  private transporter: Mail<SentMessageInfo>;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT!),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }
  async sendMail(
    from: string,
    to: string,
    content: string,
    subject: string,
    html: string
  ): Promise<string> {
    const info = await this.transporter.sendMail({
      from,
      to,
      subject,
      text: content, // plain text body
      html, // html body
    });
    return info.messageId;
  }
}
