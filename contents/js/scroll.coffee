define ['zepto'], ($)->

  class Scroll

    _calcRotation = (rotation, radius, is3D)->
      xPos = Math.round( -2 * Math.PI * rotation * radius )
      return "translate3d(#{-xPos}px, 0, 0) rotate(#{ rotation * 360 }deg)"
      
    constructor: ->
      @initialAnim   = no
      @isPersist     = no
      @lastScrollTop = 0
      @body          = $('body')
      @topHeader     = $("#top-header")
      @logoOuter     = $("#logo-outer")

    update: ->
      scrollTop = window.pageYOffset
      
      if scrollTop isnt @lastScrollTop
        direction = if scrollTop >= @lastScrollTop then "DOWN" else "UP"
      else
        direction = "STAY"

      if scrollTop < 0
        @logoOuter.css
          "-webkit-animation": "none"
          "-webkit-transform": _calcRotation( -scrollTop / 1500, 40 )

      switch direction

        when "DOWN"
          
          # Change the opacity
          if scrollTop < 50
            _opacity = ( 100 - scrollTop * 2 ) / 100
            @logoOuter.css 'opacity', _opacity
          else
            unless @initialAnim
              @topHeader.css 'opacity', 1 # - _opacity
              @initialAnim = yes
              if Modernizr.touch
                @body.addClass 'passed-logo'
                @isPersist = yes
            unless @body.hasClass 'passed-logo'
              @body.addClass 'passed-logo'
          
        when "UP"
          # Change the opacity
          if scrollTop < 250
            _opacity = ( 100 - scrollTop ) / 100
            @logoOuter.css 'opacity', _opacity
            unless $("#content").hasClass 'in'
              @body.removeClass 'passed-logo'


      @lastScrollTop = scrollTop
