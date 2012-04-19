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
  "zepto.scroll"
  ], ($, Scroll, Preview, Header, Pjax, Mobile, UpdateMessage)->

  class App

    constructor: ->

      @body    = $('body')

      #@pjax    = new Pjax
      @preview = new Preview
      @header  = new Header
      @scroll  = new Scroll

      if Modernizr.touch
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

      $("#top-header").on 'click tap', (e)->
        return true if e.target.tagName is 'svg'
        e.preventDefault()
        $.scroll(0, 400)
        
      $(".post").on 'click tap', 'a', (e)->
        e.preventDefault()
        $('body').get(0).style.opacity = 0
        setTimeout ->
          if e.target.href?
            location.href = e.target.href
          else
            location.href = "/"
        , 500

    kickOffMonitor: ->
      do animloop = =>
        requestAnimationFrame( animloop )
        @scroll.update()
