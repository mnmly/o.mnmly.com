(function() {

  define(['jquery'], function() {
    var Mobile;
    return Mobile = (function() {

      Mobile.name = 'Mobile';

      function Mobile() {
        if (window.pageYOffset === 0) {
          setTimeout(function() {
            return window.scrollTo(0, 1);
          }, 0);
        }
        $(".share").addClass('on');
      }

      return Mobile;

    })();
  });

}).call(this);
