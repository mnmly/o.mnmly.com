require.config
  baseUrl: '/js'
  paths:
    jquery: "libs/jquery-1.7.2.min"
    zepto: "libs/zepto"
    highlight: "libs/highlight.pack"
    coffee: "libs/coffee-script"
    modernizr: "libs/modernizr.custom"
    rAF: "libs/raf"
    analytics: "libs/analytics"
    socialite: "libs/socialite.min"
    swipe: "libs/swipe.min"

#if Modernizr.touch
#  # Hide address bar

setTimeout ->
  window.scrollTo 0, 1
, 0

require [
  'zepto',
  "scroll",
  "preview",
  "pjax",
  "mobile"
  "rAF"
  "modernizr"
  "analytics"
  "socialite"
  ], ($, Scroll, Preview, Pjax, Mobile)->
  $ ->

    isIndex = $('body').hasClass 'index'

    preview = new Preview
    pjax    = new Pjax

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
  
    #if Modernizr.touch
    mobile = new Mobile
