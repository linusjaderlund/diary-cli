const { promisify } = require('util');
const crypto = require('crypto');
const scrypt = promisify(crypto.scrypt);
const FileSystem = require('./FileSystem');
const SystemPath = require('./SystemPath');

class Crypto {
  static getKey = () => FileSystem.read(SystemPath.file.key);

  static getCryptoParameters = async () => [
    'aes-192-cbc',
    await scrypt(await Crypto.getKey(), 'salt', 24),
    Buffer.alloc(16, 0),
  ];

  static write = (data, method, fromEncoding, toEncoding) =>
    new Promise((resolve) => {
      let str = '';

      method.on('readable', () => {
        let chunk;
        while (null !== (chunk = method.read())) {
          str += chunk.toString(toEncoding);
        }
      });

      method.on('end', async () => {
        resolve(str);
      });

      method.write(data, fromEncoding);
      method.end();
    });

  static encrypt = async (data) =>
    Crypto.write(
      data,
      crypto.createCipheriv(...(await Crypto.getCryptoParameters())),
      'utf8',
      'hex'
    );

  static decrypt = async (data) =>
    Crypto.write(
      data,
      crypto.createDecipheriv(...(await Crypto.getCryptoParameters())),
      'hex',
      'utf8'
    );

  static encryptAndWriteToFile = async (path, data) => {
    const encrypted = await Crypto.encrypt(data);
    return FileSystem.write(path, encrypted, 'hex');
  };

  static decryptAndWriteToFile = async (path, data) => {
    const decrypted = await Crypto.decrypt(data);
    return FileSystem.write(path, decrypted);
  };
}

module.exports = Crypto;
