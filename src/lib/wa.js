const debug = require('debug')('wa:ws');

const WebSocket = require('ws');

const INITIALIZATION_KEY = 'MzdzBoyeimWLlPBYnqUUgQ==';

const DEFAULT_ENDPOINT_WS = 'wss://w5.web.whatsapp.com/ws';

const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

const getUnixTime = () => Number.parseInt(new Date().getTime() / 1000, 10);

const generateInitBody = () => {
  const unixtime = getUnixTime();
  return `${unixtime}.--0,["admin","init",[0,3,2846],["Mac OS 10.14.2","IE"],"${INITIALIZATION_KEY}",true]`;
};

const parseMessage = message => {
  try {
    const [firstPart, ...splitJson] = message.split(',');
    const textJson = splitJson.join(',');
    const body = JSON.parse(textJson);

    const [time, code] = firstPart.split('.');

    return {
      time,
      code,
      body
    };
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
      debug('generate: qr code');
    }
  });
};

module.exports = {
  start
};
