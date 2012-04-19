# Require.js
require.config
  baseUrl: '/js'
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

setTimeout ->
  window.scrollTo 0, 1
, 0

require [
  'zepto',
  "scroll",
  "preview",
  "header",
  "pjax",
  "mobile"
  "update-message"
  "rAF"
  "modernizr"
  "analytics"
  "socialite"
  ], ($, Scroll, Preview, Header, Pjax, Mobile, UpdateMessage)->

  return new UpdateMessage unless ( Modernizr.cssanimations and Modernizr.csstransforms3d )

  $ ->

    isIndex = $('body').hasClass 'index'

    preview = new Preview
    pjax    = new Pjax

    pjax.bind "load:article", (data)->
      # Swap top-header's title
      $("#top-header h5").text $(data).find('.title').text()
      Socialite.load()
      

    # init socialite
    Socialite.load()
    
    header = new Header
    scroll = new Scroll

    scroll.bind "scroll", header.onScroll

    do animloop = ->
      requestAnimationFrame( animloop )
      scroll.update()

    unless isIndex
      $("#top-header").css('opacity', 1)
      $('body').addClass('passed-logo')
  
    #if Modernizr.touch
    mobile = new Mobile
    
