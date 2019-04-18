const debug = require('debug')('wa:ws');

const WebSocket = require('ws');

const DEFAULT_ENDPOINT_WS = 'wss://w5.web.whatsapp.com/ws';

const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

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
  });
};

module.exports = {
  start
};
