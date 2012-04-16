(function() {

  require.config({
    baseUrl: '/js',
    paths: {
      jquery: "libs/jquery-1.7.2.min",
      highlight: "libs/highlight.pack",
      coffee: "libs/coffee-script",
      modernizr: "libs/modernizr.custom",
      rAF: "libs/raf"
    }
  });

  require(['jquery', "scroll", "preview", "mobile", "rAF", "modernizr"], function($, Scroll, Preview, Mobile) {
    return $(function() {
      var animloop, mobile, preview, scroll;
      scroll = new Scroll;
      preview = new Preview;
      (animloop = function() {
        requestAnimationFrame(animloop);
        return scroll.update();
      })();
      if (Modernizr.touch) {
        return mobile = new Mobile;
      }
    });
  });

}).call(this);
