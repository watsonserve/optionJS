/**
 * @name:   commandLineParser
 * @author: JamesWatson
 * @param:  table = [{
 *            opt: String,
 *            option: String
 *          }, ...]
 * @param:  argv = process.argv
 * @return: args Object
 */

module.exports = function(table = [], argv = process.argv.slice(2)) {
  const retArg = {
    default: [],
    options: {}
  };
  const optionMap = {
    opt: {},
    option: {}
  };
  let key = null;

  table.forEach(item => {
    item.command = item.option ? item.option : item.opt;

    if ('string' === typeof item.opt && '' !== item.opt) {
      optionMap.opt[item.opt] = item;
    }

    if ('string' === typeof item.option && '' !== item.option) {
      optionMap.option[item.option] = item;
    }
  });

  if (!argv.length) {
    return retArg;
  }

  argv
  .map(item => {
    if (1 < item.length && '-' === item[0] && '-' !== item[1]) {
      return item.substr(1).split('').map(flag => `-${flag}`);
    }
    return item;
  })
  .reduce((foo, bar) => {
    return foo.concat(bar);
  })
  .forEach(item => {
    if (key) {
      retArg.options[key] = item || true;
      key = null;
      return;
    }
    let op = null;

    // arguments
    if (item.startsWith('--')) {
      let [name, value] = item.substr(2).split('=');
      op = optionMap.option[name];
      if (!op) {
        console.error(`option ${item} not found`);
        process.exit(1);
      }

      retArg.options[op.command] = value || true;
      return;
    }

    // option
    if (1 < item.length && item.startsWith('-')) {
      const flag = item.substr(1);
      op = optionMap.opt[flag];
      if (!op) {
        console.error(`option ${op} not found`);
        process.exit(1);
      }
      retArg.options[op.command] = true;
      key = op.command;
      return;
    }

    retArg.default.push(item);
  });

  return retArg;
};
