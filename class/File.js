const FileSystem = require('./FileSystem');

class File {
  constructor(path) {
    this.path = path;
  }

  exists = () => FileSystem.exists(this.path);

  read = (encoding) => FileSystem.read(this.path, encoding);

  write = (data, encoding) => FileSystem.write(this.path, data, encoding);

  delete = () => FileSystem.delete(this.path);
}

module.exports = File;
