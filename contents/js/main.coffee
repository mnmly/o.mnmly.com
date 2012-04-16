require.config
  baseUrl: '/js'
  paths:
    jquery: "libs/jquery-1.7.2.min"
    highlight: "libs/highlight.pack"
    coffee: "libs/coffee-script"
    modernizr: "libs/modernizr.custom"
    rAF: "libs/raf"
    analytics: "libs/g-analytics"
    socialite: "libs/socialite.min"

require [
  'jquery',
  "scroll",
  "preview",
  "mobile"
  "rAF"
  "modernizr"
  "analytics"
  "socialite"
  ], ($, Scroll, Preview, Mobile)->

  $ ->

    isIndex = $('body').hasClass 'index'

    preview = new Preview
    
    # init socialite
    Socialite.load()
    
    if isIndex
      scroll = new Scroll
      do animloop = ->
        requestAnimationFrame( animloop )
        scroll.update()
    else
      $("#top-header").css('opacity', 1)
      $('body').addClass('passed-logo')
  
    if Modernizr.touch
      mobile = new Mobile
