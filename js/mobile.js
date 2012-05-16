(function() {

  define(['zepto', "swipe", 'libs/zepto.fitvids'], function($) {
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
        $(".video-container").fitVids();
      }

      Mobile.prototype.setupIntroAnimation = function() {
        var $animationTarget, content, desc, header, logo,
          _this = this;
        header = "header.identity-header";
        logo = "#logo-outer";
        desc = "p.desc";
        content = "#content";
        $animationTarget = $(header).add(logo).add(desc).add(content);
        return $animationTarget.on(_animationEndName, function(e) {
          var $target;
          e.stopPropagation();
          $target = $(e.target);
          console.log(e.target);
          if ($target.is(logo)) {
            console.log("tagline appears");
            return _this.triggerAnimation($animationTarget.filter(desc), "fade-in .5s both");
          } else if ($target.is(desc)) {
            console.log("stay this state for a bit");
            _this.triggerAnimation($animationTarget.filter(header), "slide-up .75s .75s both");
            return _this.triggerAnimation($animationTarget.filter(content), "fade-scale-up 1.5s 1s both cubic-bezier(0.860, 0.000, 0.070, 1.000)");
          }
        });
      };

      Mobile.prototype.triggerAnimation = function($elem, value) {
        $elem.removeClass(_killAnimationClass).get(0).style[_animationPropName] = value;
        console.log($elem.get(0).tagName);
        console.log($elem.attr('id'));
        return console.log($elem.attr('class'));
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
