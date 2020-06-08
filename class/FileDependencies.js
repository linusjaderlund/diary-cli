const FileSystem = require('./FileSystem');
const File = require('./File');
const Helper = require('./Helper');
const Log = require('./Log');
const SystemPath = require('./SystemPath');

class FileDependencies {
  static check = async (cli) => {
    const keyFile = new File(SystemPath.file.key);
    const keyFileExists = await keyFile.exists();
    const directories = [SystemPath.directory.store, SystemPath.directory.diary];

    if (!keyFileExists) {
      const isGenerateKey = await cli.question(
        'Can not find .key file needed to encrypt ' +
          'you diary, would you like to ' +
          'automatically generate it? (yes/no)'
      );

      if (isGenerateKey.trim().toLowerCase() === 'yes') {
        await FileDependencies.createKeyFile(keyFile);
      } else {
        throw new Error(
          'Can not find .key file in the root folder. ' +
            'You need to create a .key file and in it put ' +
            'a unique key so that everything you write in ' +
            'your diary will be encrypted'
        );
      }
    }

    const keyFileContent = await keyFile.read();

    if (!keyFileContent.length) {
      throw new Error('Your .key file must contain a passphrase of some kind, it can not be empty');
    }

    for (const directory of directories) {
      const exists = await FileSystem.exists(directory);

      if (!exists) {
        await FileSystem.mkdir(directory);
      }
    }
  };

  static createKeyFile = async (keyFile) => {
    try {
      const key = Helper.generateUniqueKey();
      await keyFile.write(key);
      Log.info(
        `.key file successfully crated with the key "${key}", ` +
          'store this info somewhere safe if you need to recreate ' +
          'the .key file in the future.'
      );
    } catch (error) {
      Log.error(error);
    }
  };
}

module.exports = FileDependencies;
