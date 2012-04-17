(function() {

  define(['zepto'], function($) {
    var Preview;
    return Preview = (function() {

      Preview.name = 'Preview';

      function Preview() {
        $(".handle").on('click', function() {
          var $wrap;
          $wrap = $(this).parents('.wrap');
          $wrap.find('.coffeescript').parent().toggle();
          return $wrap.find('.javascript').parent().toggle();
        });
      }

      return Preview;

    })();
  });

}).call(this);
