const readline = require('readline');
const Handle = require('./Handle');

class Cli {
  constructor(routeMapping) {
    this.routeMapping = routeMapping;
    this.cli = this.createCli();
  }

  createCli = () => {
    const cli = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '',
    });

    cli.on('line', (userInputString) => {
      const inputs = userInputString
        .trim()
        .split(' ')
        .filter((input) => input);

      this.findHandle(inputs)();
    });

    cli.on('close', Handle.exit);

    return cli;
  };

  prompt = () => this.cli.prompt();

  findHandle = (inputs) => {
    const params = [...inputs];
    let route = params.splice(0, 1)[0];
    let mapping = { ...this.routeMapping };
    let currentHandle = mapping[route];

    while (currentHandle) {
      if (typeof currentHandle === 'function') {
        return () => currentHandle({ question: this.question }, params);
      }

      route = params.splice(0, 1)[0];
      mapping = currentHandle;
      currentHandle = mapping[route];
    }

    return () => Handle.notFound();
  };

  question = (str) =>
    new Promise((resolve, reject) =>
      this.cli.question(`\x1b[32m[question]\x1b[0m ${str}: `, (answer) => resolve(answer))
    );
}

module.exports = Cli;
