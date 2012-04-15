async       = require 'async'
jade        = require 'jade'
fs          = require 'fs'
path        = require 'path'
moment      = require 'moment'


module.exports = (wintersmith, callback) ->

  class JadeMomentTemplate extends wintersmith.TemplatePlugin

    constructor: (@fn) ->

    render: (locals, callback) ->
      locals.moment = moment
      try
        callback null, new Buffer @fn(locals)
      catch error
        callback error

  JadeMomentTemplate.fromFile = (filename, base, callback) ->
    fullpath = path.join base, filename
    async.waterfall [
      (callback) ->
        fs.readFile fullpath, callback
      (buffer, callback) ->
        try
          rv = jade.compile buffer.toString(),
            filename: fullpath
          callback null, new JadeMomentTemplate rv
        catch error
          callback error
    ], callback

  wintersmith.registerTemplatePlugin '**/*.jade', JadeMomentTemplate

  callback() # tell the plugin manager we are done
