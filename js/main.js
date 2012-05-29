(function() {

  require.config({
    baseUrl: '/js',
    paths: {
      rAF: "libs/raf",
      jquery: "libs/jquery-1.7.2.min",
      zepto: "libs/zepto",
      highlight: "libs/highlight.pack",
      coffee: "libs/coffee-script",
      modernizr: "libs/modernizr.custom",
      analytics: "libs/analytics",
      socialite: "libs/socialite.min",
      swipe: "libs/swipe.min",
      order: "libs/rjs-plugins/order"
    },
    priority: ['order']
  });

  setTimeout(function() {
    return window.scrollTo(0, 1);
  }, 0);

  require(['app', 'update-message'], function(App, UpdateMessage) {
    if (!(Modernizr.cssanimations && (Modernizr.csstransforms3d || /Chrome/.test(navigator.userAgent)))) {
      return new UpdateMessage;
    }
    return $(function() {
      return window.app = new App;
    });
  });

}).call(this);
