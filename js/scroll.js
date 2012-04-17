(function() {

  define(['zepto'], function($) {
    var Scroll;
    return Scroll = (function() {
      var _calcRotation;

      Scroll.name = 'Scroll';

      _calcRotation = function(rotation, radius, is3D) {
        var xPos;
        xPos = Math.round(-2 * Math.PI * rotation * radius);
        return "translate3d(" + (-xPos) + "px, 0, 0) rotate(" + (rotation * 360) + "deg)";
      };

      function Scroll() {
        this.initialAnim = false;
        this.lastScrollTop = 0;
        this.body = $('body');
        this.topHeader = $("#top-header");
        this.logoOuter = $("#logo-outer");
      }

      Scroll.prototype.update = function() {
        var direction, scrollTop, _opacity;
        scrollTop = window.pageYOffset;
        if (scrollTop !== this.lastScrollTop) {
          direction = scrollTop >= this.lastScrollTop ? "DOWN" : "UP";
        } else {
          direction = "STAY";
        }
        if (scrollTop < 0) {
          this.logoOuter.css({
            "-webkit-animation": "none",
            "-webkit-transform": _calcRotation(-scrollTop / 1500, 40)
          });
        }
        switch (direction) {
          case "DOWN":
            if (scrollTop < 50) {
              _opacity = (100 - scrollTop * 2) / 100;
              this.logoOuter.css('opacity', _opacity);
            } else {
              if (!this.initialAnim) {
                this.topHeader.css('opacity', 1);
                this.initialAnim = true;
              }
              if (!this.body.hasClass('passed-logo')) {
                this.body.addClass('passed-logo');
              }
            }
            break;
          case "UP":
            if (scrollTop < 250) {
              _opacity = (100 - scrollTop) / 100;
              this.logoOuter.css('opacity', _opacity);
              this.body.removeClass('passed-logo');
            }
        }
        return this.lastScrollTop = scrollTop;
      };

      return Scroll;

    })();
  });

}).call(this);
