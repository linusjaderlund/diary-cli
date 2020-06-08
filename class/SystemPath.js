const path = require('path');
const Helper = require('./Helper');

class SystemPath {
  static directory = {
    store: path.join(__dirname, '../.store'),
    diary: path.join(__dirname, '../.store/diary'),
  };

  static file = {
    key: path.join(__dirname, '../.key'),
    bookmarks: path.join(SystemPath.directory.store, 'bookmarks.json'),
    cookiejar: path.join(SystemPath.directory.store, 'cookiejar.json'),
    challenges: path.join(SystemPath.directory.store, 'challenges.json'),
  };

  static getDiaryEntryPath = (ms) =>
    path.join(SystemPath.directory.diary, `${Helper.getDateString(ms)}.json`);
}

module.exports = SystemPath;
