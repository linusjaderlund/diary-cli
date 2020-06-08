const { promisify } = require('util');
const fs = require('fs');
const exists = promisify(fs.exists);
const write = promisify(fs.writeFile);
const read = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);

class FileSystem {
  static exists = (path) => exists(path);

  static write = (path, data, encoding = 'utf8') => write(path, data, encoding);

  static read = (path, encoding = 'utf8') => read(path, encoding);

  static mkdir = (path) => mkdir(path);

  static delete = (path) => unlink(path);
}

module.exports = FileSystem;
