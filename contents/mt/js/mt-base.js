// Generated by CoffeeScript 1.3.1
(function() {

  define(function() {
    var MTBase;
    return MTBase = (function() {

      MTBase.name = 'MTBase';

      MTBase.vendor = (function() {
        var prop, regex, someScript;
        regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;
        someScript = document.getElementsByTagName("script")[0];
        for (prop in someScript.style) {
          if (regex.test(prop)) {
            return prop.match(regex)[0].toLowerCase();
          }
        }
        if ("WebkitOpacity" in someScript.style) {
          return "webkit";
        }
        if ("KhtmlOpacity" in someScript.style) {
          return "khtml";
        }
        return "";
      })();

      function MTBase(el) {
        this.el = el;
        this.setupDOM();
        this.init();
        this.attachEvents();
      }

      MTBase.prototype.init = function() {};

      MTBase.prototype.setupDOM = function() {
        var $container;
        $container = $("<div class='transition-container' />");
        $container.insertBefore(this.el);
        $container.append(this.el);
        return $container.prepend($("<h3/>").text(this.el.data('title')));
      };

      MTBase.prototype.attachEvents = function() {};

      return MTBase;

    })();
  });

}).call(this);
