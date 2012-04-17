define ['zepto'], ($)->

  class UpdateMessage

    constructor: ->
      $updateMessage = $( "<div id='update-message'></div>" )
      $updateMessage.css
        "background-image": "url(/images/update.png)"
        "background-repeat": "no-repeat"
        "width": 279
        "height": 238
        "margin": "0 auto"
        "margin-top": ( $(window).height() - 238 ) / 2 - 30

      $("body").empty().append $updateMessage

      $(window).resize ->
        $updateMessage.css('margin-top',( $(window).height() - 238 ) / 2 - 30 )
