(function() {

  define(['zepto', "scroll", "preview", "lang-switch", "header", "pjax", "social", "mobile", "update-message", "modernizr", "analytics", "zepto.scroll"], function($, Scroll, Preview, LangSwitch, Header, Pjax, Social, Mobile, UpdateMessage) {
    var App;
    return App = (function() {

      App.name = 'App';

      function App() {
        this.body = $('body');
        this.preview = new Preview;
        this.header = new Header;
        this.scroll = new Scroll;
        if ($(".index").length === 0) {
          this.langSwith = new LangSwitch;
        }
        $('.fade-pane').addClass('in');
        if (Modernizr.touch) {
          this.mobile = new Mobile;
        }
        this.initSocial();
        this.setTargetBlank();
        this.attachEvents();
        this.kickOffMonitor();
        if ((typeof MNMLY !== "undefined" && MNMLY !== null ? MNMLY.onScriptLoaded : void 0) != null) {
          MNMLY.onScriptLoaded();
        }
      }

      App.prototype.initSocial = function() {
        var social;
        if ($(".social").length === 0) {
          return;
        }
        return social = new Social;
      };

      App.prototype.setTargetBlank = function() {
        return $('.post a:not(.ignore)').each(function() {
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

        var _this = this;
        this.scroll.bind("scroll", this.header.onScroll);
        $("#top-header").on('click tap', function(e) {
          var target, _ref;
          target = e.target;
          if ((_ref = target.tagName) === 'svg' || _ref === 'g' || _ref === 'rect' || _ref === 'a') {
            return _this.fadeOutScene('/');
          }
          e.preventDefault();
          return $.scroll(0, 400);
        });
        return $(".post").on('click tap', 'a:not(.ignore)', function(e) {
          var url;
          if (e.target.getAttribute('target') === "_blank") {
            return true;
          }
          e.preventDefault();
          if (e.target.href != null) {
            url = e.target.href;
          } else {
            url = '/';
          }
          return _this.fadeOutScene(url);
        });
      };

      App.prototype.fadeOutScene = function(url) {
        $('body').get(0).style.opacity = 0;
        return setTimeout(function() {
          return location.href = url;
        }, 500);
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
