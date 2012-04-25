(function() {

  define(["zepto"], function($) {
    /*
        prettty bad code...
    */

    var LangSwitch;
    return LangSwitch = (function() {
      var _buttonTmpl, _groupTmpl;

      LangSwitch.name = 'LangSwitch';

      _buttonTmpl = "      <div id=\"lang\">\n        <span><a href=\"#ja\" class=\"active ignore\">JP</a> / <a href=\"#en\" class=\"ignore\">EN</a></span>\n</div>";

      _groupTmpl = "<seciton class=\"lang-group\">\n  <div class=\"inner\">\n    \n  </div>\n</section>";

      LangSwitch.prototype.resetHeight = function(lang) {
        return this.bodyText.find('.lang-group').each(function(i, el) {
          var $activeLang, $el;
          $el = $(el);
          $activeLang = $el.find('.' + lang);
          if ($activeLang.length > 0) {
            return $el.height($activeLang.height());
          } else {
            return $el.height(1);
          }
        });
      };

      LangSwitch.prototype.setLang = function(lang) {
        $("#lang").find('.active').removeClass('active');
        console.log(lang);
        $("#lang a[href*=" + lang + "]").addClass('active');
        this.bodyText.removeClass('ja-enabled').removeClass('en-enabled');
        return this.bodyText.addClass("" + lang + "-enabled");
      };

      function LangSwitch() {
        var defaultLang,
          _this = this;
        if (!($(".body-text").find('.ja, .en').length > 0)) {
          return;
        }
        this.bodyText = $(".body-text");
        $("aside.meta").append(_buttonTmpl);
        defaultLang = 'ja';
        if (location.hash !== "" && location.hash === "#en") {
          defaultLang = "en";
          this.setLang(defaultLang);
        }
        this.bodyText.addClass("" + defaultLang + "-enabled");
        this.bodyText.find("div.ja").each(function(i, el) {
          var $enPart, $groupSection;
          $enPart = _this.bodyText.find("div.en[data-group='" + (el.getAttribute("data-group")) + "']");
          $groupSection = $(_groupTmpl);
          $groupSection.insertBefore(el);
          $groupSection.find('.inner').append(el).append($enPart.show());
          return _this.resetHeight(defaultLang);
        });
        $("aside.meta").on('click', 'a', function(e) {
          var lang;
          lang = e.target.getAttribute('href').replace('#', '');
          _this.setLang(lang);
          return _this.resetHeight(lang);
        });
      }

      return LangSwitch;

    })();
  });

}).call(this);
