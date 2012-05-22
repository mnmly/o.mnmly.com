define ['zepto', "swipe", 'libs/zepto.fitvids'], ($)->
  
  class Mobile

    _killAnimationClass = 'kill-animation'
    _animationPropName  = Modernizr.prefixed('animation')
    _animationEndName   = (_animationPropName  + "End")
                                  .replace(/^ms/, "MS")
                                  .replace(/^Webkit/, "webkit")
                                  .replace(/^Moz.*/, "animationend")

    constructor: ->

      @setupSwipe()
      
      @setupIntroAnimation() if $('#logo-outer').length > 0
      # Trigger mobile styling
      $(".share").addClass 'on'
      $(".video-container").fitVids()
    
  
    setupIntroAnimation: ->

      # Animation Sequence (Deprecated)
      # ==================
      # 1. Start with white screen
      # 2. Logo rolls in
      # 3. tagline appears
      # 4. stay this state for a bit
      # 5. pull up header
      # 6. scale up content
      # 7. DONE.
      
      header           = "header.identity-header"
      logo             = "#logo-outer"
      desc             = "p.desc"
      content          = "#content"

      $animationTarget = $(header).add(logo).add(desc).add(content)

      #$animationTarget.addClass _killAnimationClass
      
      # Waits for animation ends
      $animationTarget.on _animationEndName, (e)=>

        e.stopPropagation()
        $target = $(e.target)
        console.log e.target
        # when #2 finishes...
        if $target.is(logo)
          console.log "tagline appears"
          @triggerAnimation($animationTarget.filter(desc), "fade-in .5s both")

        # when #3 ends
        else if $target.is(desc)
          # kick off #4
          console.log "stay this state for a bit"
          @triggerAnimation($animationTarget.filter(header), "slide-up .75s .75s both")

          # kick off #5 right before [.5s] #4 finishes
          @triggerAnimation($animationTarget.filter(content), "fade-scale-up 1.5s 1s both cubic-bezier(0.860, 0.000, 0.070, 1.000)")

      # Currently #1, lets kickoff #2
      #@triggerAnimation($animationTarget.filter(logo), 'intro 2s backwards')
    

    triggerAnimation: ($elem, value)->
      $elem.removeClass(_killAnimationClass).get(0).style[_animationPropName] = value
      console.log $elem.get(0).tagName
      console.log $elem.attr('id')
      console.log $elem.attr('class')


    setupSwipe: (sliderIndex = 0)->
      
      content = document.getElementById('article-list')

      $(content).find('.post').each ->

        $slide       = $(this)
        metaHeight   = $slide.find('aside.meta').height()
        bodyHeight   = $slide.find('.article-container').height()
        headerHeight = $slide.find('header').height()
        $slide.data('postHeight', headerHeight + metaHeight + bodyHeight)


      # ### Overriding Swipe
      # In order to attach `willSlideCallback`,
      # not entirely great implementation, tho.
      
      _slide = Swipe::slide
      Swipe::slide = (index, duration)->
        @options.willSlideCallback.bind(@)(@slides[index])
        # trigger `slide` method, but with the `this` context
        _slide.bind(@)(index, duration)
      
      @swipe = new Swipe content,
        startSlide: sliderIndex
        willSlideCallback: (slide)->
          
          @element.style.height = $( slide ).data("postHeight") + 'px'
          
        callback: (e, index, slide)->
