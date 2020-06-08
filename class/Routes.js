const Route = require('./Route');

class Routes {
  constructor(...routes) {
    if (!routes.length) {
      throw new Error('Routes must be defined');
    }

    for (const route of routes) {
      if (route instanceof Route === false) {
        throw new TypeError('Routes must be of type Route');
      }
    }

    this.routes = routes;
  }

  static map = (...routesToBeMapped) => {
    const routes = new Routes(...routesToBeMapped);
    return routes.createMapping();
  };

  createMapping = () =>
    this.routes.reduce((accumulatedMapping, route) => {
      return {
        ...accumulatedMapping,
        [route.path]: route.mapping,
      };
    }, {});
}

module.exports = Routes;
