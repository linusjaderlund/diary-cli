const Helper = require('./Helper');

class Log {
  static info = (...str) => console.log(Log.color.blue(), '[info]', ...str);

  static warning = (...str) => console.log(Log.color.yellow(), '[warning]', ...str);

  static error = (...str) => console.log(Log.color.red(), '[error]', ...str);

  static plain = (...str) => console.log(...str);

  static blanc = (repeat = 1) => {
    for (let index = 0; index < repeat; index++) {
      console.log();
    }
  };

  static line = (str) => {
    const columns = process.stdout.columns;

    if (!str) {
      return console.log('-'.repeat(columns));
    }

    const padding = 1;
    const lineLength = Math.round(columns / 2) - Math.round(str.length / 2) - padding;
    const lastLineLength = columns - lineLength - padding * 2 - str.length;

    console.log(
      '-'.repeat(lineLength) +
        ' '.repeat(padding) +
        str +
        ' '.repeat(padding) +
        '-'.repeat(lastLineLength)
    );
  };

  static center = (str) => {
    const columns = process.stdout.columns;
    const padding = Math.round(columns / 2) - Math.round(str.length / 2);
    console.log(' '.repeat(padding) + str);
  };

  static definitionList = (map, indent = 0, list = []) => {
    const keys = Object.keys(map);
    const indentSize = 4;
    const addLog = (currentIndent, command, description = '') =>
      list.push([currentIndent, command, description]);

    for (const key of keys) {
      const item = map[key];

      if (!Helper.isObject(item)) {
        addLog(indent * indentSize, key, item);
        continue;
      }

      addLog(indent * indentSize, key);
      Log.definitionList(item, indent + 1, list);
    }

    return list;
  };

  static indentedList = (list) => {
    const max = list.reduce(
      (max, current) => (current[1].length > max ? current[1].length : max),
      0
    );
    const newline = (commandSectionLength, line) => {
      const maxAllowedChars = process.stdout.columns - 50;

      if (line.length < maxAllowedChars) {
        return line;
      }

      let charCount = 0;

      const newLine = line
        .split(' ')
        .map((word) => {
          charCount += word.length;

          if (charCount > maxAllowedChars) {
            charCount = commandSectionLength;
            return `\n${' '.repeat(commandSectionLength)}${word}`;
          }

          return word;
        })
        .join(' ');

      return newLine;
    };

    for (const item of list) {
      const [indent, command, description] = item;
      const dots = max - command.length + 2;
      const line = newline(
        indent + (command.length + 2) + (dots + 2),
        `${' '.repeat(indent)}${Log.color.green(`[${command}]`)}${
          description ? ` ${'.'.repeat(dots)} ${description}` : ''
        }`
      );

      console.log(line);
    }
  };

  static colorizeString = (color, str) => `\x1b[${color}m${str ? str : '%s'}\x1b[0m`;

  static color = {
    green: (str) => Log.colorizeString(32, str),
    blue: (str) => Log.colorizeString(34, str),
    yellow: (str) => Log.colorizeString(33, str),
    red: (str) => Log.colorizeString(31, str),
  };
}

module.exports = Log;
