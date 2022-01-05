import twilio from 'twilio';
import config from '../config/config';
import {infoLogger} from './logger';

class Twilio {
  private twilio;

  constructor() {
    this.twilio = twilio(config.TWILIO_ACCOUNT_ID, config.TWILIO_TOKEN);
  }

  async sendMessage(message: string, to?:string) {
    const params = {
      body: message,
      from: config.TWILIO_CELLPHONE,
      to: to || config.TWILIO_ADMIN,
    };
    // const receiver = to || config.TWILIO_ADMIN;
    
    await this.twilio.messages.create(params);
    infoLogger.info(`SMS enviado a ${params.to}`)
    // return response; 
  }
}

// export const SmsService = new Twilio();
const SmsService = new Twilio();
export default SmsService;
