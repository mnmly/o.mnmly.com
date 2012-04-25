$             = require 'jquery'
fs            = require 'fs'
jade          = require 'jade'
path          = require 'path'
async         = require 'async'
moment        = require 'moment'
CoffeeScript  = require 'coffee-script'
{ Highlight } = require("highlight")


module.exports = (wintersmith, callback) ->

  class ExJadeTemplate extends wintersmith.TemplatePlugin

    constructor: (@fn) ->

    render: (locals, callback) ->
      locals.moment = moment
      html = @fn(locals)
      html = @compileJSText(html)
      html = @wrapLanguage(html)
      try
        callback null, new Buffer html
      catch error
        callback error

    wrapLanguage: (html)->
      html = html.replace(/<\!\-\- (ja|en)(#\d+)? \-\->/g, '<div class="$1" data-group="$2">')
                 .replace(/<\!\-\- \/(ja|en) \-\->/g, '</div>')
      html.replace('class="en"','class="en" style="display: none;"')

    compileJSText: (html)->
      
      $html = $(html)
      html = html.replace /<pre>([\S\s]*?)<\/pre>/g, (a, g)->
        return "<pre>#{g}</pre>" unless /class="coffeescript"/g.test(g)
        $el = $(g)
        _pattern = /(\s|\))\-/g
        # Compiles coffee to js for preview
        try
          js = CoffeeScript.compile($el.text().replace(_pattern, '$1->'), bare: true)
        catch e
          return "<div class='error'>#{e}</div><pre>#{ g }</pre>"
        
        # Highlight js as well
        highlightedJS = Highlight(js)
        
        g = """
          <div class="wrap">
            <div class='handle-wrapper'>
              <button class="handle" title="Click to toggle between CoffeeScript & JavaScript"></button>
            </div>
            <pre>#{g}</pre>
            <pre style="display:none;"><code class='javascript'>#{highlightedJS.replace(/^\n/, '')}</code></pre>
          </div>
        """
        return g

  ExJadeTemplate.fromFile = (filename, base, callback) ->
    fullpath = path.join base, filename
    async.waterfall [
      (callback) ->
        fs.readFile fullpath, callback
      (buffer, callback) ->
        try
          rv = jade.compile buffer.toString(),
            filename: fullpath
          callback null, new ExJadeTemplate rv
        catch error
          callback error
    ], callback

  wintersmith.registerTemplatePlugin '**/*.jade', ExJadeTemplate

  callback() # tell the plugin manager we are done
