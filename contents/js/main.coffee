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

require ['app', 'update-message'], (App, UpdateMessage)->

  return new UpdateMessage unless ( Modernizr.cssanimations and Modernizr.csstransforms3d )

  $ ->
    window.app = new App
