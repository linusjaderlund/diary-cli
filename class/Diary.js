const File = require('./File');
const Log = require('./Log');
const Print = require('./Print');
const Crypto = require('./Crypto');
const SystemPath = require('./SystemPath');
const Helper = require('./Helper');

class Diary {
  static entryType = {
    ENTRY: 'entries',
    TRAINING: 'training',
    GRATEFULNESS: 'gratefulness',
  };

  static template = () => ({
    id: Helper.generateUniqueKey(),
    timestamp: Date.now(),
    [Diary.entryType.ENTRY]: [],
    [Diary.entryType.TRAINING]: [],
    [Diary.entryType.GRATEFULNESS]: [],
  });

  static entry = (entryString) => ({
    id: Helper.generateUniqueKey(),
    timestamp: Date.now(),
    entry: entryString,
  });

  static get = async (file) => {
    if (await Diary.isDiaryNonExistingForDate(file, true)) {
      return Diary.template();
    }

    const encrypted = await file.read();
    const decrypted = await Crypto.decrypt(encrypted);

    return JSON.parse(decrypted);
  };

  static addEntry = async (cli, params, entryType) => {
    const entryString = params.join(' ').trim();

    if (!entryString) {
      return Log.info('...such quiet');
    }

    try {
      const file = new File(SystemPath.getDiaryEntryPath());
      const diary = await Diary.get(file);

      diary[entryType].push(Diary.entry(entryString));

      const diaryJSON = JSON.stringify(diary);

      await file.write(await Crypto.encrypt(diaryJSON));

      Log.info('Your diary entry was successfully written down and tucked away');

      if (entryType === Diary.entryType.ENTRY) {
        const gratefulnessString = await cli.question('Are you grateful for something?');

        if (gratefulnessString) {
          Diary.addEntry(cli, [gratefulnessString], Diary.entryType.GRATEFULNESS);
        }
      }
    } catch (error) {
      Log.error(error);
    }
  };

  static isDiaryNonExistingForDate = async (file, isSuppressWarning) => {
    if (!file || !(await file.exists())) {
      if (!isSuppressWarning) {
        Log.warning('Could not find diary for given date');
      }

      return true;
    }

    return false;
  };

  static getFileBasedOnDateString = (dateString) => {
    if (!dateString) {
      return new File(SystemPath.getDiaryEntryPath());
    } else if (Helper.isDashedDateString(dateString)) {
      const date = new Date(dateString);
      return new File(SystemPath.getDiaryEntryPath(date.getTime()));
    } else {
      return Log.warning('Date argument is optional and must be in format YYYY-MM-DD');
    }
  };

  static removeEntry = async (cli, params, entryType) => {
    const [firstPartOfUUID, dateString] = params;
    const file = Diary.getFileBasedOnDateString(dateString);

    if (await Diary.isDiaryNonExistingForDate(file)) {
      return;
    }

    if (!Helper.isFirstPartOfUUID(firstPartOfUUID)) {
      return Log.warning('Removing any entry requires entry id as argument and optionally date');
    }

    try {
      const diaryEntry = await Diary.get(file);
      const entry = diaryEntry[entryType].find(
        (item) => Helper.firstPartOfUUID(item.id) === firstPartOfUUID
      );

      if (!entry) {
        return Log.warning('Could not find entry with given ID on given date');
      }

      const isRemove = await cli.question(
        `Are you sure you want to delete this entry: "${entry.entry}"? (yes/no)`
      );

      if (isRemove.trim().toLowerCase() !== 'yes') {
        return Log.info('Removal aborted');
      }

      diaryEntry[entryType].splice(diaryEntry[entryType].indexOf(entry), 1);

      const diaryJSON = JSON.stringify(diaryEntry);
      await file.write(await Crypto.encrypt(diaryJSON));

      Log.info(`Entry with id ${firstPartOfUUID} was successfully removed`);
    } catch (error) {
      Log.error(error);
    }
  };

  static flush = async (cli, params) => {
    const [dateString] = params;
    const file = Diary.getFileBasedOnDateString(dateString);

    if (await Diary.isDiaryNonExistingForDate(file)) {
      return;
    }

    const isFlush = await cli.question(
      'Are you absolutely sure you want to delete this entire day? (yes/no)'
    );

    if (isFlush.trim().toLowerCase() !== 'yes') {
      return Log.info('Flushing aborted');
    }

    await file.delete();
    Log.info('Flushed entire day down the pipes!');
  };

  static readDiary = async (cli, params) => {
    const [dateString] = params;
    const file = Diary.getFileBasedOnDateString(dateString);

    if (await Diary.isDiaryNonExistingForDate(file)) {
      return;
    }

    const diaryEntry = await Diary.get(file);
    Print.diary(diaryEntry);
  };
}

module.exports = Diary;
