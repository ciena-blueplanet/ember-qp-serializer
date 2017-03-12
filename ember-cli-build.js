/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    snippetPaths: ['snippets'],
    snippetSearchPaths: ['tests/dummy/app']
  })
  app.import('vendor/github-gist.css')
  return app.toTree()
};
