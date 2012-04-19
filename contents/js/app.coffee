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

      $('.fade-pane').addClass 'in'

      if Modernizr.touch
        @mobile  = new Mobile
      
      @initPage()
      @setTargetBlank()
      @attachEvents()
      @kickOffMonitor()
    
    initPage: ->
      Socialite.load()
  
    setTargetBlank: ->
      $('.post a').each ->
        $link     = $(this)
        targetURL = $link.attr('href')
        if targetURL.charAt(0) is '/' or targetURL.search(document.location.origin) > -1
          $link.addClass 'mine'
        else
          $link.attr('target', '_blank')
      
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
        target = e.target
        return yes if target.tagName in [ 'svg', 'g', 'rect', 'a' ]
        e.preventDefault()
        $.scroll(0, 400)
        
      $(".post").on 'click tap', 'a', (e)->

        return true if target.getAttribute('target') is "_blank"

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
