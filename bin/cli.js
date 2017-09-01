#!/usr/bin/env node
'use strict';
const meow = require('meow');
const cli = meow(`
Usage
    $ nextbook <command> [<args>]

Commands
    new     Create new site
    serve   Serve locally
    build   Build static HTML to specified directory

Examples
    $ nextbook blog           # Create new site named "blog"
    $ cd blog
    $ nextbook serve          # Run server on localhost
    $ nextbook build          # Build static files to "out/"
    $ nextbook build public   # Build static files to "public/"
    $ nextbook build public   # Build static files to current dir
`, {});

const subCommand = cli.input.shift();

if (subCommand === 'new') {
  if (!cli.input[0]) { cli.showHelp() }
  require('../src/new')(cli.input[0])
}
else if (subCommand === 'serve') {
  require('../src/serve')()
}
else if (subCommand === 'build') {
  require('../src/build')(cli.input[0])
}
else {
  cli.showHelp();
}
