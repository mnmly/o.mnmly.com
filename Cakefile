fs        = require 'fs'
{exec}    = require 'child_process'
requirejs = require 'requirejs'

task 'build', 'Build project', ->

  exec 'wintersmith build', (err, stdout, stderr) ->

    throw err if err

    console.log stdout + stderr

    console.log "====================="
    console.log " Start minifiying js "
    console.log "====================="
  
    config =
      out: "build/js/main-built.js"
      name: "main"
      baseUrl: "build/js"
      paths:
        rAF: "libs/raf"
        zepto: "libs/zepto"
        coffee: "libs/coffee-script"
        highlight: "libs/highlight.pack"
        modernizr: "libs/modernizr.custom"
        analytics: "libs/analytics"
        socialite: "libs/socialite.min"

    requirejs.optimize config, (buildResponse) ->

      console.log "mmain-built.js has been generated."
