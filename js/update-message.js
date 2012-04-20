(function() {

  define(['zepto'], function($) {
    var UpdateMessage;
    return UpdateMessage = (function() {

      UpdateMessage.name = 'UpdateMessage';

      function UpdateMessage() {
        var $updateMessage;
        $updateMessage = $("<div id='update-message'></div>");
        $updateMessage.css({
          "background-image": "url(/images/update.png)",
          "background-repeat": "no-repeat",
          "width": 279,
          "height":  238,
          "margin": "0 auto",
          "margin-top": ($(window).height() - 238) / 2 - 30
        });
        $("body").empty().append($updateMessage);
        $(window).resize(function() {
          return $updateMessage.css('margin-top', ($(window).height() - 238) / 2 - 30);
        });
      }

      return UpdateMessage;

    })();
  });

}).call(this);
