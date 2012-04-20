(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function() {
    var Header;
    return Header = (function() {

      Header.name = 'Header';

      function Header() {
        this.onScroll = __bind(this.onScroll, this);
        this.initialAnim = false;
        this.isPersist = false;
        this.lastScrollTop = 0;
        this.body = $('body');
        this.topHeader = $("#top-header");
        this.logoOuter = $("#logo-outer");
        if ($('.article-container').length > 0) {
          this.containerTop = $('.article-container').offset().top;
        } else {
          this.containerTop = 0;
        }
      }

      Header.prototype.onScroll = function(scrollTop, direction) {
        var _opacity;
        if (scrollTop > this.containerTop) {
          this.topHeader.addClass('passed-article');
        } else {
          this.topHeader.removeClass('passed-article');
        }
        switch (direction) {
          case -1:
            if (scrollTop < 50) {
              _opacity = (100 - scrollTop * 2) / 100;
              return this.logoOuter.css('opacity', _opacity);
            } else {
              if (!this.initialAnim) {
                this.topHeader.css('opacity', 1);
                this.initialAnim = true;
                if (Modernizr.touch) {
                  this.topHeader.addClass('passed-logo');
                  this.isPersist = true;
                }
              }
              if (!this.topHeader.hasClass('passed-logo')) {
                return this.topHeader.addClass('passed-logo');
              }
            }
            break;
          case 1:
            if (scrollTop < 250) {
              _opacity = (100 - scrollTop) / 100;
              this.logoOuter.css('opacity', _opacity);
              if (!$("#content").hasClass('in')) {
                return this.topHeader.removeClass('passed-logo');
              }
            }
        }
      };

      return Header;

    })();
  });

}).call(this);
