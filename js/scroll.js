(function() {

  define(['zepto', 'libs/asevented.min', "rAF"], function($) {
    var Scroll;
    return Scroll = (function() {

      Scroll.name = 'Scroll';

      function Scroll() {
        asEvented.call(Scroll.prototype);
        this.lastScrollTop = 0;
      }

      Scroll.prototype.update = function() {
        var direction, scrollTop;
        scrollTop = window.pageYOffset;
        if (scrollTop !== this.lastScrollTop) {
          direction = scrollTop >= this.lastScrollTop ? -1 : 1;
        } else {
          direction = 0;
        }
        this.lastScrollTop = scrollTop;
        if (direction !== 0) {
          return this.trigger('scroll', scrollTop, direction);
        }
      };

      return Scroll;

    })();
  });

}).call(this);
