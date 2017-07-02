/**
 * @name:   commandLineParser
 * @author:   JamesWatson
 * @params: table = [{
 *            opt: String,
 *            option: String,
 *            argument: Bool
 *          }]
 * @params: argv = process.argv
 * @return: args Object
 */

module.exports = function(table = [], argv = process.argv.slice(2)) {

  let retArg = {
    default: ''
  };
  let optionMap = {
    opt: {},
    option: {}
  };
  let key = null;

  table.forEach((item) => {
    item.command = item.option ? item.option : item.opt;

    if ('string' === typeof item.opt && '' !== item.opt) {
      optionMap.opt[item.opt] = item;
    }

    if ('string' === typeof item.option && '' !== item.option) {
      optionMap.option[item.option] = item;
    }
  });

  argv.forEach((item) => {

    // 前述参数
    if (key) {
      retArg[key] = item || true;
      key = null;
      return;
    }
    let op = null;

    // 参数
    if (item.startsWith('--')) {
      let [name, value] = item.substr(2).split('=');
      op = optionMap.option[name];
      if (!op) {
        console.error(`option ${item} not found`);
        process.exit(1);
      }

      retArg[op.command] = value || true;
      return;
    }

    // 选项
    if (item.startsWith('-')) {
      op = optionMap.opt[item.substr(1)];
      if (!op) {
        console.error(`option ${item} not found`);
        process.exit(1);
      }

      retArg[op.command] = true;
      key = op.command;
      return;
    }

    retArg['default'] = item;
  });

  return retArg;
};
