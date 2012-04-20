(function() {

  define(['zepto', 'socialite'], function($) {
    var Social;
    return Social = (function() {
      var COUNTER_URL, _tooltipTmpl;

      Social.name = 'Social';

      COUNTER_URL = "http://counter.mnmly.com/?url=";

      _tooltipTmpl = "<div class=\"tooltip\">\n  <span>$count</span>\n</div>";

      function Social() {
        Socialite.load();
        this.fetchCount();
      }

      Social.prototype.fetchCount = function() {
        var url;
        if (/:8080/.test(location.href)) {
          url = "http://mnmly.com";
        } else {
          url = location.href;
        }
        return $.getJSON(COUNTER_URL + encodeURIComponent(url), function(data) {
          var facebook, googlePlus, map, twitter;
          if (data.status !== 200) {
            return;
          }
          facebook = data.facebook, twitter = data.twitter, googlePlus = data.googlePlus;
          map = {
            t: twitter,
            f: facebook,
            g: googlePlus
          };
          return $('.social li').each(function(i, el) {
            return $(el).prepend(_tooltipTmpl.replace('$count', map[el.className]));
          });
        });
      };

      return Social;

    })();
  });

}).call(this);
