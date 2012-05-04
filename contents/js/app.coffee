define [
  'zepto',
  "scroll",
  "preview",
  "lang-switch",
  "header",
  "social"
  "mobile"
  "update-message"
  "modernizr"
  "analytics"
  "zepto.scroll"
  ], ($, Scroll, Preview, LangSwitch, Header, Social, Mobile, UpdateMessage)->

  class App

    constructor: ->
      @body     = $('body')

      @preview   = new Preview
      @header    = new Header
      @scroll    = new Scroll

      if $(".index").length is 0
        @langSwith = new LangSwitch

      $('.fade-pane').addClass 'in'

      if Modernizr.touch
        @mobile  = new Mobile
      
      @initSocial()
      @setTargetBlank()
      @attachEvents()
      @kickOffMonitor()

      if MNMLY?.onScriptLoaded?
        MNMLY.onScriptLoaded()
    
    initSocial: ->
      return if $(".social").length is 0
      social = new Social

  
    setTargetBlank: ->

      $('.post a:not(.ignore)').each ->

        $link     = $(this)
        targetURL = $link.attr('href')
        if targetURL.charAt(0) is '/' or targetURL.search(document.location.origin) > -1
          $link.addClass 'mine'
        else
          $link.attr('target', '_blank')
      
    attachEvents: ->
      
      @scroll.bind "scroll", @header.onScroll

      $("#top-header").on 'click tap', (e)=>
        target = e.target
        return @fadeOutScene('/') if target.tagName in [ 'svg', 'g', 'rect', 'a' ]
        e.preventDefault()
        $.scroll(0, 400)
        
      $(".post").on 'click tap', 'a:not(.ignore)', (e)=>

        return true if e.target.getAttribute('target') is "_blank"

        e.preventDefault()
        if e.target.href?
          url = e.target.href
        else
          url = '/'
        @fadeOutScene(url)

    fadeOutScene: (url)->
      $('body').get(0).style.opacity = 0
      setTimeout ->
        location.href = url
      , 500
      
    kickOffMonitor: ->
      do animloop = =>
        requestAnimationFrame( animloop )
        @scroll.update()
