const Log = require('./Log');
const Helper = require('./Helper');

class Print {
  static banner = (title, slogan) => {
    Log.blanc();
    Log.line(`~ ${title} ~`);

    if (slogan) {
      Log.center(slogan);
    }

    Log.line();
    Log.blanc();
  };

  static welcome = () => {
    Print.banner('DIARY', 'Welcome you!');
    Log.info('Type "help" or "man" if you need help with commands');
    Log.blanc(1);
  };

  static help = () => {
    Print.banner('HELP', "I'll help as much as I can");

    const dl = Log.definitionList({
      add: {
        entry: '<string> Adds new entry to diary',
        training: '<string> Adds new training entry to diary',
        gratefulness: '<string> Adds something you are grateful for to diary',
      },
      remove: {
        entry:
          '<id> <YYYY-MM-DD?> Removes entry with given id. Optionally you can pass diary date as first argument',
        training:
          '<id> <YYYY-MM-DD?> Removes training entry with given id. Optionally you can pass diary date as first argument',
        gratefulness:
          '<id> <YYYY-MM-DD?> Removes something you are grateful for with given id. Optionally you can pass diary date as first argument',
      },
      read: {
        diary:
          '<YYYY-MM-DD?> Loggs todays diary entries including training and things your are grateful for. Optionally pass date as an argument to read another date than today',
      },
      flush: {
        diary:
          '<YYYY-MM-DD?> Deletes an entire day. Optionally pass date as an argument to delete another date than today',
      },
    });

    Log.indentedList(dl);

    Print.banner('END');
  };

  static diary = (diaryEntry) => {
    const { timestamp, entries, training, gratefulness } = diaryEntry;
    const date = Helper.getReadableDateString(timestamp);
    const iterateAndLogEntries = (title, entries) => {
      if (entries.length) {
        Log.plain(`~ ${title.toUpperCase()} ~`);
        Log.blanc();
        for (const entry of entries) {
          const time = Helper.getTimeString(entry.timestamp);
          Log.plain(
            Log.color.green(`[${Helper.getTimeString(entry.timestamp)}]`),
            entry.entry,
            Log.color.blue(`(${Helper.firstPartOfUUID(entry.id)})`)
          );
        }
        Log.blanc(2);
      }
    };

    Print.banner('READING DIARY', 'from ' + date);

    iterateAndLogEntries('entries', entries);
    iterateAndLogEntries('training', training);

    if (gratefulness.length) {
      Log.plain(`~ I'M GRATEFUL FOR ~`);
      Log.blanc();

      for (let index = 0; index < gratefulness.length; index++) {
        const entry = gratefulness[index];
        Log.plain(
          Log.color.green(`${index + 1}.`),
          entry.entry,
          Log.color.blue(`(${Helper.firstPartOfUUID(entry.id)})`)
        );
      }

      Log.blanc(2);
    }

    Print.banner('END');
  };
}

module.exports = Print;
