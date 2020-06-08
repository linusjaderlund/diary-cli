const Route = require('../class/Route');
const Routes = require('../class/Routes');
const Handle = require('../class/Handle');

const routeMapping = Routes.map(
  new Route('exit', Handle.exit),
  new Route('help', Handle.help),
  new Route('man', Handle.help),
  new Route(
    'add',
    Routes.map(
      new Route('entry', Handle.add.entry),
      new Route('training', Handle.add.training),
      new Route('gratefulness', Handle.add.gratefulness)
    )
  ),
  new Route(
    'remove',
    Routes.map(
      new Route('entry', Handle.remove.entry),
      new Route('training', Handle.remove.training),
      new Route('gratefulness', Handle.remove.gratefulness)
    )
  ),
  new Route('read', Routes.map(new Route('diary', Handle.read.diary))),
  new Route('flush', Routes.map(new Route('diary', Handle.flush.diary)))
);

module.exports = routeMapping;
