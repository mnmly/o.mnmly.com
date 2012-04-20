(function() {

  define(['zepto', "swipe"], function($) {
    var Mobile;
    return Mobile = (function() {
      var _animationEndName, _animationPropName, _killAnimationClass;

      Mobile.name = 'Mobile';

      _killAnimationClass = 'kill-animation';

      _animationPropName = Modernizr.prefixed('animation');

      _animationEndName = (_animationPropName + "End").replace(/^ms/, "MS").replace(/^Webkit/, "webkit").replace(/^Moz.*/, "animationend");

      function Mobile() {
        this.setupSwipe();
        if ($('#logo-outer').length > 0) {
          this.setupIntroAnimation();
        }
        $(".share").addClass('on');
      }

      Mobile.prototype.setupIntroAnimation = function() {
        var $animationTarget, content, desc, header, logo,
          _this = this;
        header = "header.identity-header";
        logo = "#logo-outer";
        desc = "p.desc";
        content = "#content";
        $animationTarget = $(header).add(logo).add(desc).add(content);
        $animationTarget.addClass(_killAnimationClass);
        $animationTarget.on(_animationEndName, function(e) {
          var $target;
          e.stopPropagation();
          $target = $(e.target);
          if ($target.is(logo)) {
            return _this.triggerAnimation($animationTarget.filter(desc), "fade-in .5s both");
          } else if ($target.is(desc)) {
            _this.triggerAnimation($animationTarget.filter(header), "slide-up .75s .75s both");
            return _this.triggerAnimation($animationTarget.filter(content), "fade-scale-up 1.5s 1s both cubic-bezier(0.860, 0.000, 0.070, 1.000)");
          }
        });
        return this.triggerAnimation($animationTarget.filter(logo), 'intro 2s both');
      };

      Mobile.prototype.triggerAnimation = function($elem, value) {
        return $elem.removeClass(_killAnimationClass).get(0).style[_animationPropName] = value;
      };

      Mobile.prototype.setupSwipe = function(sliderIndex) {
        var content, _slide;
        if (sliderIndex == null) {
          sliderIndex = 0;
        }
        content = document.getElementById('article-list');
        $(content).find('.post').each(function() {
          var $slide, bodyHeight, headerHeight, metaHeight;
          $slide = $(this);
          metaHeight = $slide.find('aside.meta').height();
          bodyHeight = $slide.find('.article-container').height();
          headerHeight = $slide.find('header').height();
          return $slide.data('postHeight', headerHeight + metaHeight + bodyHeight);
        });
        _slide = Swipe.prototype.slide;
        Swipe.prototype.slide = function(index, duration) {
          this.options.willSlideCallback.bind(this)(this.slides[index]);
          return _slide.bind(this)(index, duration);
        };
        return this.swipe = new Swipe(content, {
          startSlide: sliderIndex,
          willSlideCallback: function(slide) {
            return this.element.style.height = $(slide).data("postHeight") + 'px';
          },
          callback: function(e, index, slide) {}
        });
      };

      return Mobile;

    })();
  });

}).call(this);
