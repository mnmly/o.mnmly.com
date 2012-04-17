define ['zepto', "swipe"], ($)->
  
  _slide = Swipe::slide

  Swipe::slide = (index, duration)->
    @options.willSlideCallback(@slides[index])
    _slide.bind(@)(index, duration)
  
  class Mobile

    constructor: ->
      @setupSwipe()
      @waitForAnimation()
    
    waitForAnimation: ->
      animationEndName = (Modernizr.prefixed('animation') + "End").replace(/^ms/, "MS").replace(/^Webkit/, "webkit").replace(/^Moz.*/, "animationend");
      $('p.desc').bind animationEndName, (e)->
        if e.originalEvent.animationName is 'fade-in'
          $('header.identity-header').addClass 'slide-up'
          $('#content').addClass 'in'
      
      # Add class to share to activate animation

      $(".share").addClass 'on'

    setupSwipe: ->
      content = document.getElementById('article-list')
      $(content).find('.post').each ->
        $slide = $(this)
        headerHeight = $slide.find('header').outerHeight(true)
        metaHeight   = $slide.find('aside.meta').outerHeight(true)
        bodyHeight   = $slide.find('.article-container').outerHeight(true)
        $slide.data('postHeight', headerHeight + metaHeight + bodyHeight)
        
        
      @swipe = new Swipe content,
        willSlideCallback: (slide)->
          $slide        = $(slide)
          $("#article-list .inner").css
            height: $slide.data("postHeight")
          
        callback: (e, index, slide)->
          #console.log e
          ###
          if $('body').scrollTop isnt $slide.offset().top
            $('body, html').animate
              scrollTop: $slide.offset().top + 0
            , 200
          ###
