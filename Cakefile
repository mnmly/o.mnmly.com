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
        jquery: "libs/jquery-1.7.2.min"
        zepto: "libs/zepto"
        highlight: "libs/highlight.pack"
        coffee: "libs/coffee-script"
        modernizr: "libs/modernizr.custom"
        analytics: "libs/analytics"
        socialite: "libs/socialite.min"
        swipe: "libs/swipe.min"

    requirejs.optimize config, (buildResponse) ->

      console.log "mmain-built.js has been generated."

task 'deploy', 'Deploy project', ->

  exec 'cd build; git add . ; git commit -am "built"; git push origin gh-pages; cd ..;', (err, stdout, stderr)->

    throw err if err
    console.log stdout + stderr
