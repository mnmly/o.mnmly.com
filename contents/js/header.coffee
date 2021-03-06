define ->

  class Header

    constructor: ->
      @initialAnim   = no
      @isPersist     = no
      @lastScrollTop = 0
      @body          = $('body')
      @topHeader     = $("#top-header")
      @logoOuter     = $("#logo-outer")
      
      if $('.article-container').length > 0
        @containerTop  = $('.article-container').offset().top
      else
        @containerTop  = 0


    onScroll: (scrollTop, direction)=>
      
      if scrollTop > @containerTop
        @topHeader.addClass 'passed-article'
      else
        @topHeader.removeClass 'passed-article'
          
      switch direction
        when -1
          # Change the opacity
          if scrollTop < 50
            _opacity = ( 100 - scrollTop * 2 ) / 100
            @logoOuter.css 'opacity', _opacity
          else
            unless @initialAnim
              @topHeader.css 'opacity', 1 # - _opacity
              @initialAnim = yes
              if Modernizr.touch
                @topHeader.addClass 'passed-logo'
                @isPersist = yes
            unless @topHeader.hasClass 'passed-logo'
              @topHeader.addClass 'passed-logo'
          
        when 1
          # Change the opacity
          if scrollTop < 250
            _opacity = ( 100 - scrollTop ) / 100
            @logoOuter.css 'opacity', _opacity
            unless $("#content").hasClass 'in'
              @topHeader.removeClass 'passed-logo'

