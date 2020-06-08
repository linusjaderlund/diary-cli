const Cli = require('./Cli');
const FileDependencies = require('./FileDependencies');
const Log = require('./Log');
const Print = require('./Print');
const routes = require('../setting/routes');

class Application {
  init = async () => {
    const cli = new Cli(routes);
    Print.welcome();
    cli.prompt();

    try {
      await FileDependencies.check(cli);
    } catch (error) {
      Log.error(error.toString());
      process.exit(0);
    }
  };
}

module.exports = Application;
