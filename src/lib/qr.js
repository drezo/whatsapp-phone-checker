const Qr = require('qrcode');
const fs = require('fs');
const mkdirp = require('mkdirp');
const { promisify } = require('util');
const { join } = require('path');

const pathTmpFolder = join(__dirname, '../../temp');

const writeFileAsync = promisify(fs.writeFile);
const mkdirpAsync = promisify(mkdirp);

const saveToTmp = async (name, base64) => {
  const filePath = `${pathTmpFolder}/${name}`;
  await mkdirpAsync(pathTmpFolder);
  return writeFileAsync(filePath, base64, 'base64');
};

module.exports = {
  generate: text => Qr.toDataURL(text),
  saveToTmp
};
