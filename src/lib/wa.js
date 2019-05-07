const debug = require('debug')('wa:ws');

const WebSocket = require('ws');
const Qr = require('./qr');

const SHORT_KEY = 'MzdzBoyeimWLlPBYnqUUgQ==';
const LONG_KEY = '2bCVucKfvMB9oJqeGJ6YQuLNxpQAfTmySSs4zmXtUic=';

const DEFAULT_ENDPOINT_WS = 'wss://w5.web.whatsapp.com/ws';

const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

const getUnixTime = () => Number.parseInt(new Date().getTime() / 1000, 10);

const generateInitBody = () => {
  const unixtime = getUnixTime();
  return `${unixtime}.--0,["admin","init",[0,3,2846],["Mac OS 10.14.2","IE"],"${SHORT_KEY}",true]`;
};

const parseMessage = message => {
  try {
    if (typeof message === 'string') {
      const [firstPart, ...splitJson] = message.split(',');
      const textJson = splitJson.join(',');
      const body = JSON.parse(textJson);

      const [time, code = null] = firstPart.split('.');

      if (Array.isArray(body)) {
        const [type, json] = body;
        return {
          type,
          time,
          code,
          body: json
        };
      }
      return {
        time,
        code,
        body
      };
    }
    return {};
  } catch (err) {
    return {};
  }
};

const start = () => {
  const wss = new WebSocket(DEFAULT_ENDPOINT_WS, {
    headers: {
      Origin: 'https://web.whatsapp.com',
      'User-Agent': DEFAULT_USER_AGENT,
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      Cookie: 'wa_lang_pref=en'
    }
  });

  wss.on('open', () => {
    debug('[WS]: Open');
    const dataInit = generateInitBody();
    debug('[WS]: initizalization data: ', dataInit);
    wss.send(dataInit);
  });

  wss.on('message', async data => {
    debug('[WS]: Message');
    const { code, body } = parseMessage(data);
    if (code && code === '--0' && body && body.ref) {
      const unixtime = getUnixTime();
      const { ref } = body;
      const keyQr = `${ref},${LONG_KEY},${SHORT_KEY}`;
      const qr = await Qr.generate(keyQr);
      const base64Data = qr.replace(/^data:image\/png;base64,/, '');
      await Qr.saveToTmp(`qr-${unixtime}.png`, base64Data);
      const dataReref = `${unixtime}.--1,["admin","Conn","reref"]`;
      debug(`[WS:send] data: ${dataReref}`);
      wss.send(dataReref);
    }
  });
};

module.exports = {
  start
};
