const Diary = require('./Diary');
const Log = require('./Log');
const Print = require('./Print');

class Handle {
  static exit = () => {
    Log.info('BYE!');
    process.exit(0);
  };

  static notFound = () => Log.warning('Command not found');

  static help = () => Print.help();

  static add = {
    entry: (cli, params) => Diary.addEntry(cli, params, Diary.entryType.ENTRY),
    training: (cli, params) => Diary.addEntry(cli, params, Diary.entryType.TRAINING),
    gratefulness: (cli, params) => Diary.addEntry(cli, params, Diary.entryType.GRATEFULNESS),
  };

  static remove = {
    entry: (cli, params) => Diary.removeEntry(cli, params, Diary.entryType.ENTRY),
    training: (cli, params) => Diary.removeEntry(cli, params, Diary.entryType.TRAINING),
    gratefulness: (cli, params) => Diary.removeEntry(cli, params, Diary.entryType.GRATEFULNESS),
  };

  static read = {
    diary: (cli, params) => Diary.readDiary(cli, params),
  };

  static flush = {
    diary: (cli, params) => Diary.flush(cli, params),
  };
}

module.exports = Handle;
