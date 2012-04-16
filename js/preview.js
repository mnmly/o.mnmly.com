(function() {

  define(['jquery', 'coffee', 'highlight'], function($, CoffeeScript) {
    var Preview;
    return Preview = (function() {

      Preview.name = 'Preview';

      function Preview() {
        this.parsePre();
        hljs.tabReplace = '    ';
        hljs.initHighlightingOnLoad();
      }

      Preview.prototype.parsePre = function() {
        return $("pre").each(function() {
          var $compiled, $el, $handle, $original, $wrap, cs;
          $el = $(this);
          if (!$(this).find(".coffeescript")[0]) {
            return;
          }
          try {
            cs = CoffeeScript.compile($el.text(), {
              bare: true
            });
          } catch (e) {
            return;
          }
          $original = $el.clone();
          $compiled = $("<pre />").append($("<code class='javascript' />").text(cs));
          hljs.highlightBlock($compiled.find('code').get(0), '    ');
          $compiled.hide();
          $handle = $("<button />").addClass("handle");
          $handle.attr("title", "Click to toggle between CoffeeScript & JavaScript");
          $handle.click(function() {
            $original.toggle();
            return $compiled.toggle();
          });
          $wrap = $("<div />").addClass("wrap");
          $wrap.append($original);
          $wrap.append($compiled);
          $wrap.append($handle);
          return $el.replaceWith($wrap);
        });
      };

      return Preview;

    })();
  });

}).call(this);
