import nodemailer from 'nodemailer';
import config from '../config/config';

export default class EmailService {
  private owner:any;

  private transporter:any;

  constructor() {
      const name:string = config.GMAIL_NAME;
      const address:string = config.GMAIL_USERNAME;
      const host:string = config.GMAIL_HOST;
      const port:number = Number(config.GMAIL_PORT);
      const username:string = config.GMAIL_USERNAME;
      const password:string = config.GMAIL_PASS;

      this.owner = {
        name: name,
        address: address,
      };

      this.transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure:false,
        auth: {
          user: username,
          pass: password,
        },
      });
  }
  

  async sendEmail(dest: string, subject: string, content: string) {
    const mailOptions = {
      from: this.owner,
      to: dest,
      subject,
      html: content,
    };

    await this.transporter.sendMail(mailOptions);
    
  }
}
