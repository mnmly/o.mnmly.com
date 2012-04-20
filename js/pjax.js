(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['libs/asevented.min'], function() {
    var Pjax;
    return Pjax = (function() {
      var MORE_SPAN;

      Pjax.name = 'Pjax';

      MORE_SPAN = "<span class=\"more\"></span>";

      function Pjax() {
        this.loadPage = __bind(this.loadPage, this);

        var historyObj;
        this.pageCache = {};
        historyObj = {
          url: document.location.href,
          title: document.title,
          bodyClass: $('body').attr('class')
        };
        history.replaceState(historyObj, document.title, document.location.href);
        asEvented.call(Pjax.prototype);
        this.attachEvents();
      }

      Pjax.prototype.updatePage = function(data, historyObj) {
        var $afterMore, $data, $footer, $fullArticle, $readMoreLink, $targetPost, articleData, articleIndex;
        $data = $(data);
        articleIndex = 0;
        if (historyObj.bodyClass === 'index') {
          $fullArticle = $data.find('#article-list');
          $("#content").empty().append($fullArticle);
        } else {
          $afterMore = $("<p>" + $data.find('.body-text').html().split(MORE_SPAN)[1]);
          $footer = $data.find('footer');
          $readMoreLink = $("p.read-more a[href='" + (historyObj.url.replace(location.origin, '')) + "']");
          $targetPost = $readMoreLink.parents('.article-container');
          articleIndex = $targetPost.parent().index();
          $readMoreLink.parent().replaceWith($afterMore);
          $targetPost.append($footer);
          $("#article-list .inner").get(0).style.height = 'auto';
        }
        articleData = {
          index: articleIndex
        };
        $('body').removeClass().addClass(historyObj.bodyClass);
        return this.trigger('load:article', articleData);
      };

      Pjax.prototype.loadPage = function(title, url, fn) {
        var _this = this;
        if (fn == null) {
          fn = null;
        }
        return $.get(url, function(data) {
          var historyObj;
          historyObj = {
            url: url,
            title: title,
            bodyClass: data.match(/body class="(\w+)"/)[1]
          };
          _this.pageCache[url] = data;
          _this.updatePage(data, historyObj);
          if (fn != null) {
            return fn(historyObj);
          }
        });
      };

      Pjax.prototype.attachEvents = function() {
        var _this = this;
        window.addEventListener('popstate', function(e) {
          var _ref;
          if (((_ref = e.state) != null ? _ref.url : void 0) != null) {
            if (_this.pageCache[e.state.url] != null) {
              return _this.updatePage(_this.pageCache[e.state.url], e.state);
            } else {
              return _this.loadPage(e.state.url);
            }
          }
        });
        return $("body").on("click", "h2>a, .read-more>a", function(e) {
          var title, url;
          e.preventDefault();
          url = e.target.href;
          title = e.target.textContent;
          return _this.loadPage(title, url, function(historyObj) {
            return history.pushState(historyObj, title, url);
          });
        });
      };

      return Pjax;

    })();
  });

}).call(this);
