import log4js from 'log4js';

// pasar como middleware de express;

log4js.configure({
  appenders: { 
    info: { type: 'file', filename: 'info.log' },
    peligro: { type: 'file', filename: 'peligro.log' }
  },
  categories: { 
    default: { 
      appenders: ['info'], level: 'info' 
    }
  }
});

export const infoLogger = log4js.getLogger('info');

