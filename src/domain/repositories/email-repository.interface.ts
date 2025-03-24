export interface EMailRepository {
  sendMail(
    from: string,
    to: string,
    content: string,
    subject: string,
    html: string
  ): Promise<string>;
}