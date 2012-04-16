define ['jquery'], ->

  class Mobile

    constructor: ->

      # Hide address bar
      if window.pageYOffset is 0
        setTimeout ->
          window.scrollTo 0, 1
        , 0

      # Add class to share to activate animation

      $(".share").addClass 'on'
