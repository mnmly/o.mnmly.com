(function() {

  define(['zepto', "scroll", "preview", "header", "pjax", "social", "mobile", "update-message", "modernizr", "analytics", "zepto.scroll"], function($, Scroll, Preview, Header, Pjax, Social, Mobile, UpdateMessage) {
    var App;
    return App = (function() {

      App.name = 'App';

      function App() {
        this.body = $('body');
        this.preview = new Preview;
        this.header = new Header;
        this.scroll = new Scroll;
        $('.fade-pane').addClass('in');
        if (Modernizr.touch) {
          this.mobile = new Mobile;
        }
        this.initSocial();
        this.setTargetBlank();
        this.attachEvents();
        this.kickOffMonitor();
      }

      App.prototype.initSocial = function() {
        var social;
        if ($(".social").length === 0) {
          return;
        }
        return social = new Social;
      };

      App.prototype.setTargetBlank = function() {
        return $('.post a').each(function() {
          var $link, targetURL;
          $link = $(this);
          targetURL = $link.attr('href');
          if (targetURL.charAt(0) === '/' || targetURL.search(document.location.origin) > -1) {
            return $link.addClass('mine');
          } else {
            return $link.attr('target', '_blank');
          }
        });
      };

      App.prototype.attachEvents = function() {
        /*
              @pjax.bind "load:article", (articleData)=>
                { index } =  articleData
                # Swap top-header's title
                $("#top-header h5").text $(".post").eq(index).find('.title').text()
                Socialite.load()
                @mobile.setupSwipe(index)
        */
        this.scroll.bind("scroll", this.header.onScroll);
        $("#top-header").on('click tap', function(e) {
          var target, _ref;
          target = e.target;
          if ((_ref = target.tagName) === 'svg' || _ref === 'g' || _ref === 'rect' || _ref === 'a') {
            return true;
          }
          e.preventDefault();
          return $.scroll(0, 400);
        });
        return $(".post").on('click tap', 'a', function(e) {
          if (target.getAttribute('target') === "_blank") {
            return true;
          }
          e.preventDefault();
          $('body').get(0).style.opacity = 0;
          return setTimeout(function() {
            if (e.target.href != null) {
              return location.href = e.target.href;
            } else {
              return location.href = "/";
            }
          }, 500);
        });
      };

      App.prototype.kickOffMonitor = function() {
        var animloop,
          _this = this;
        return (animloop = function() {
          requestAnimationFrame(animloop);
          return _this.scroll.update();
        })();
      };

      return App;

    })();
  });

}).call(this);
