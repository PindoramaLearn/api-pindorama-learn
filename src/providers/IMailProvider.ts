export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>;
}

export interface IMessage {
  to: string;
  subject: string;
  body: string;
}
