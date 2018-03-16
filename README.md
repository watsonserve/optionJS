# opt-arguments
 Parse command line arguments for the UNIX style

## use:

    optArguments([{
      opt: String,    // a char to short option, like -x
      option: String, // a word to long option, like --xxxx=yyyy
    }, ...])

## example

#### in test.js:

    const optArguments = require('opt-arguments');

    let arguments = optArguments([{
      opt: 'h',
      option: 'help'
    }, {
      opt: 'o',
      option: 'out'
    }]);

    console.log(JSON.stringify(arguments));

#### shell:

```node test.js -o obj.o src.src``` **or** ```node test.js --out=obj.o src.src```

#### console:

    {
      "options": {
        "out": "obj.o"
      },
      "default": ["src.src"]
    }
