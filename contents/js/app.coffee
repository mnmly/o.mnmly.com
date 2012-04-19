define [
  'zepto',
  "scroll",
  "preview",
  "header",
  "pjax",
  "mobile"
  "update-message"
  "modernizr"
  "analytics"
  "socialite"
  ], ($, Scroll, Preview, Header, Pjax, Mobile, UpdateMessage)->

  class App

    constructor: ->

      @body    = $('body')

      #@pjax    = new Pjax
      @preview = new Preview
      @header  = new Header
      @scroll  = new Scroll

      #if Modernizr.touch
      @mobile  = new Mobile
      
      @initPage()
      @attachEvents()
      @kickOffMonitor()
    
    initPage: ->
      Socialite.load()

    attachEvents: ->
      ###
      @pjax.bind "load:article", (articleData)=>
        { index } =  articleData
        # Swap top-header's title
        $("#top-header h5").text $(".post").eq(index).find('.title').text()
        Socialite.load()
        @mobile.setupSwipe(index)
      ###
      @scroll.bind "scroll", @header.onScroll

    kickOffMonitor: ->
      do animloop = =>
        requestAnimationFrame( animloop )
        @scroll.update()
