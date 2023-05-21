import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import { IMailProvider, IMessage } from "../IMailProvider";

export class NodemailerProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    this.transporter
      .sendMail({
        from: "PindoramaLearn",
        to: message.to,
        subject: message.subject,
        html: message.body,
      })
      .catch((err) => console.log(err));
  }
}
