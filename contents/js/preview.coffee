define ['zepto'], ($)->
  
  
  class Preview
    constructor: ->
      $(".handle").on 'click', ->
        $wrap = $(this).parents('.wrap')
        $wrap.find('.coffeescript').parent().toggle()
        $wrap.find('.javascript').parent().toggle()
