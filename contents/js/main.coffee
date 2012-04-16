require.config
  baseUrl: '/js'
  paths:
    jquery: "libs/jquery-1.7.2.min"
    highlight: "libs/highlight.pack"
    coffee: "libs/coffee-script"
    modernizr: "libs/modernizr.custom"
    rAF: "libs/raf"

require [
  'jquery',
  "scroll",
  "preview",
  "mobile"
  "rAF"
  "modernizr"
  ], ($, Scroll, Preview, Mobile)->

  $ ->
    scroll  = new Scroll
    preview = new Preview
    #ticker = new Ticker
    do animloop = ->
      requestAnimationFrame( animloop )
      scroll.update()

    if Modernizr.touch
      mobile = new Mobile
