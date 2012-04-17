define ['zepto', "swipe"], ($)->
  
  
  class Mobile

    _killAnimationClass = 'kill-animation'
    _animationPropName  = Modernizr.prefixed('animation')
    _animationEndName   = (_animationPropName  + "End")
                                  .replace(/^ms/, "MS")
                                  .replace(/^Webkit/, "webkit")
                                  .replace(/^Moz.*/, "animationend")

    constructor: ->
      @setupSwipe()
      @setupIntroAnimation()
      # Trigger mobile styling
      $(".share").addClass 'on'
    
    setupIntroAnimation: ->

      # 1. White screen
      # 2. Logo rolls in
      # 3. tagline appears
      # 4. wait for n milliseconds
      # 5. pull up header
      # 6. scale up content: done
      
      header           = "header.identity-header"
      logo             = "#logo-outer"
      desc             = "p.desc"
      content          = "#content"

      $animationTarget = $(header).add(logo).add(desc).add(content)

      $animationTarget.addClass _killAnimationClass
      
      # Waits for animation ends
      $animationTarget.on _animationEndName, (e)=>

        e.stopPropagation()
        $target = $(e.target)

        # when #2 finishes...
        if $target.is(logo)
          @triggerAnimation($animationTarget.filter(desc), "fade-in .5s both")

        # when #3 ends
        if $target.is(desc)
          # kick off #4
          @triggerAnimation($animationTarget.filter(header), "slide-up .75s .75s both")
          # kick off #5 right before [.5s] #4 finishes
          @triggerAnimation($animationTarget.filter(content), "fade-scale-up 1.5s 1s both cubic-bezier(0.860, 0.000, 0.070, 1.000)")

      # Currently #1, lets kickoff #2
      @triggerAnimation($animationTarget.filter(logo), 'intro 2s both')
    
    triggerAnimation: ($elem, value)->
      $elem.removeClass(_killAnimationClass).get(0).style[_animationPropName] = value

    waitForAnimation: ->

    setupSwipe: ->
      
      content = document.getElementById('article-list')

      $(content).find('.post').each ->

        $slide = $(this)
        headerHeight = $slide.find('header').outerHeight(true)
        metaHeight   = $slide.find('aside.meta').outerHeight(true)
        bodyHeight   = $slide.find('.article-container').outerHeight(true)
        $slide.data('postHeight', headerHeight + metaHeight + bodyHeight)


      # ### Overriding Swipe
      # In order to attach `willSlideCallback`, not entirely great implementation, tho.
      
      _slide = Swipe::slide
      
      Swipe::slide = (index, duration)->
        @options.willSlideCallback(@slides[index])
        # trigger `slide` method, but with the `this` context
        _slide.bind(@)(index, duration)
      
      @swipe = new Swipe content,

        willSlideCallback: (slide)->
          $slide = $(slide)
          $("#article-list .inner").css
            height: $slide.data("postHeight")
          
        callback: (e, index, slide)->
