define ->

  class Header

    constructor: ->
      @initialAnim   = no
      @isPersist     = no
      @lastScrollTop = 0
      @body          = $('body')
      @topHeader     = $("#top-header")
      @logoOuter     = $("#logo-outer")
      @containerTop  = $('.article-container').offset().top
    
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
                @body.addClass 'passed-logo'
                @isPersist = yes
            unless @body.hasClass 'passed-logo'
              @body.addClass 'passed-logo'
          
        when 1
          # Change the opacity
          if scrollTop < 250
            _opacity = ( 100 - scrollTop ) / 100
            @logoOuter.css 'opacity', _opacity
            unless $("#content").hasClass 'in'
              @body.removeClass 'passed-logo'

