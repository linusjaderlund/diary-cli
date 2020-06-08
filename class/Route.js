const Helper = require('./Helper');

class Route {
  constructor(path, mapping) {
    if (typeof path !== 'string') {
      throw new TypeError('Path must be of type string');
    }

    if (typeof mapping !== 'function' && !Helper.isObject(mapping)) {
      throw new TypeError('Mapping must be of type function or route mapping');
    }

    this.path = path;
    this.mapping = mapping;
  }
}

module.exports = Route;
