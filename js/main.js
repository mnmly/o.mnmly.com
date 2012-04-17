(function() {

  require.config({
    baseUrl: '/js',
    paths: {
      jquery: "libs/jquery-1.7.2.min",
      zepto: "libs/zepto",
      highlight: "libs/highlight.pack",
      coffee: "libs/coffee-script",
      modernizr: "libs/modernizr.custom",
      rAF: "libs/raf",
      analytics: "libs/analytics",
      socialite: "libs/socialite.min"
    }
  });

  require(['zepto', "scroll", "preview", "mobile", "rAF", "modernizr", "analytics", "socialite"], function($, Scroll, Preview, Mobile) {
    return $(function() {
      var animloop, isIndex, mobile, preview, scroll;
      isIndex = $('body').hasClass('index');
      preview = new Preview;
      Socialite.load();
      if (isIndex) {
        scroll = new Scroll;
        (animloop = function() {
          requestAnimationFrame(animloop);
          return scroll.update();
        })();
      } else {
        $("#top-header").css('opacity', 1);
        $('body').addClass('passed-logo');
      }
      if (Modernizr.touch) {
        return mobile = new Mobile;
      }
    });
  });

}).call(this);
