# optionJS
 Parse command line arguments for the UNIX style

use:

    option([{
      opt: String,    // a char to short option, like -x
      option: String, // a word to long option, like --xxxx=yyyy
      argument: Bool  // need a value or not
    }, ...])

## example

in test.js:

    let option = require('optionJS');

    let arguments = option([{
      opt: 'h',
      option: 'help',
      argument: false
    }, {
      opt: 'o',
      option: 'out',
      argument: true
    }]);

    console.log(JSON.stringify(arguments));

shell:

```node test.js -o obj.o src.src``` **or** ```node test.js --out=obj.o src.src```

console:

    {
      "out": "obj.o",
      "default": "src.src"
    }
