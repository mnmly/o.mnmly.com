fs = require('fs')
{exec} = require 'child_process'
requirejs = require('requirejs')

task 'build', 'Build project', ->
  exec 'wintersmith build', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

    console.log "====================="
    console.log " Start minifiying js "
    console.log "====================="
  
    config =
      baseUrl: "build/js"
      paths:
        jquery: "libs/jquery-1.7.2.min"
        highlight: "libs/highlight.pack"
        coffee: "libs/coffee-script"
        modernizr: "libs/modernizr.custom"
        rAF: "libs/raf"
      name: "main"
      out: "build/js/main-built.js"

    requirejs.optimize config, (buildResponse) ->
      contents = fs.readFileSync(config.out, "utf8")
      console.log "mmain-built.js has been generated."
