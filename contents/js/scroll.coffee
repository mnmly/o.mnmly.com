define ['zepto', 'libs/asevented.min', "rAF"], ($)->

  class Scroll

    constructor: ->
      # Mixin
      asEvented.call(Scroll::)
      @lastScrollTop = 0
    
    update: ->
    
      scrollTop = window.pageYOffset
      
      if scrollTop isnt @lastScrollTop
        direction = if scrollTop >= @lastScrollTop then -1 else 1
      else
        direction = 0
      
      @lastScrollTop = scrollTop

      if direction isnt 0
        @trigger('scroll', scrollTop, direction)
