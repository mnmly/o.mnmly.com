(function() {

  define(["zepto"], function($) {
    var LangSwitch;
    return LangSwitch = (function() {
      var _template;

      LangSwitch.name = 'LangSwitch';

      _template = "      <div id=\"lang\">\n        <span><a href=\"#ja\" class=\"active\">JP</a> / <a href=\"#en\">EN</a></span>\n</div>";

      function LangSwitch() {
        var _this = this;
        if (!($(".body-text").find('.ja, .en').length > 0)) {
          return;
        }
        $("aside.meta").append(_template);
        this.bodyText = $(".body-text");
        this.bodyText.find("div.ja[data-group^='#']").each(function(i, el) {
          var $enPart, $groupSection;
          $enPart = _this.bodyText.find("div.en[data-group='" + (el.getAttribute("data-group")) + "']");
          if ($enPart.length > 0) {
            $groupSection = $("<section class='lang-wrapper'/>");
            $groupSection.insertBefore(el);
            return $groupSection.append(el).append($enPart);
          }
        });
      }

      return LangSwitch;

    })();
  });

}).call(this);
