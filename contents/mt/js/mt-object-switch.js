// Generated by CoffeeScript 1.3.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['zepto', 'mt-base', 'text!../templates/mt-object-switch.html', 'libs/Tween', 'css!../css/mt-object-switch.css', 'css!../css/app.css'], function($, MTBase, template) {
    var MTObjectSwitch;
    return MTObjectSwitch = (function(_super) {
      var getVendorPrefix, _duration, _istouch, _tapOrClick;

      __extends(MTObjectSwitch, _super);

      MTObjectSwitch.name = 'MTObjectSwitch';

      function MTObjectSwitch() {
        return MTObjectSwitch.__super__.constructor.apply(this, arguments);
      }

      MTObjectSwitch.vendor = (getVendorPrefix = function() {
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

      (function() {
        var lastTime, vendors, x;
        lastTime = 0;
        vendors = ["ms", "moz", "webkit", "o"];
        x = 0;
        while (x < vendors.length && !window.requestAnimationFrame) {
          window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
          window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
          ++x;
        }
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = function(callback, element) {
            var currTime, id, timeToCall;
            currTime = new Date().getTime();
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            id = window.setTimeout(function() {
              return callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
          };
        }
        if (!window.cancelAnimationFrame) {
          return window.cancelAnimationFrame = function(id) {
            return clearTimeout(id);
          };
        }
      })();

      _tapOrClick = __indexOf.call(window, 'ontouchstart') >= 0 ? 'tap' : 'click';

      _istouch = __indexOf.call(window, 'ontouchstart') >= 0;

      _duration = 2500;

      MTObjectSwitch.prototype.init = function() {
        var _this = this;
        this.isAnimating = true;
        this.toBackItem = this.el.find('.a');
        this.toFrontItem = this.el.find('.b').addClass('to-front');
        this.kickOffAnimation();
        return this.el.on(_tapOrClick, '.item', function(e) {
          e.preventDefault();
          if (_this.isAnimating) {
            return _this.clickStack = true;
          } else {
            return _this.setupTWEEN();
          }
        });
      };

      MTObjectSwitch.prototype.kickOffAnimation = function() {
        var animLoop,
          _this = this;
        this.setupTWEEN();
        return (animLoop = function(timestamp) {
          window.requestAnimationFrame(animLoop);
          if (_this.isAnimating) {
            return TWEEN.update();
          }
        })(0);
      };

      MTObjectSwitch.prototype.setupTWEEN = function() {
        var easing, interpolation, that, toBackParams, toFrontParams, tweenToBack, tweenToFront,
          _this = this;
        toBackParams = this.createParams('to-back');
        toFrontParams = this.createParams('to-front');
        interpolation = TWEEN.Interpolation.CatmullRom;
        easing = TWEEN.Easing.Cubic.InOut;
        that = this;
        tweenToBack = new TWEEN.Tween(toBackParams.start).to(toBackParams.end, _duration);
        tweenToBack.onUpdate(function(elapsed, o) {
          var styleObj;
          styleObj = {
            'background-color': "hsl(200, " + this.saturation + "%, " + this.lightness + "%)"
          };
          styleObj["-" + MTObjectSwitch.vendor + "-transform"] = "perspective(1000px) translate3d(" + this.x + "px, 0, " + this.z + "px) rotateY(" + this.rotY + "deg)";
          that.toBackItem.css(styleObj);
          if (elapsed > .5) {
            return that.toBackItem.css('z-index', '0');
          }
        });
        tweenToBack.interpolation(interpolation).easing(easing).start();
        tweenToFront = new TWEEN.Tween(toFrontParams.start).to(toFrontParams.end, _duration);
        tweenToFront.onUpdate(function(elapsed, o) {
          var styleObj;
          styleObj = {
            'background-color': "hsl(200, " + this.saturation + "%, " + this.lightness + "%)"
          };
          styleObj["-" + MTObjectSwitch.vendor + "-transform"] = "perspective(1000px) translate3d(" + this.x + "px, 0, " + this.z + "px) rotateY(" + this.rotY + "deg)";
          that.toFrontItem.css(styleObj);
          if (elapsed > .5) {
            return that.toFrontItem.css('z-index', '1');
          }
        });
        tweenToFront.onComplete(function() {
          _this.toBackItem = _this.el.find(".to-front").removeClass('to-front');
          _this.toFrontItem = _this.el.find('.item').not(_this.toBackItem).addClass('to-front');
          _this.isAnimating = false;
          if (_this.clickStack) {
            _this.setupTWEEN();
            return _this.clickStack = false;
          }
        });
        tweenToFront.interpolation(interpolation).easing(easing).start();
        return this.isAnimating = true;
      };

      MTObjectSwitch.prototype.createParams = function(name) {
        var borderOffset, depth, rotY, sign, xOffset;
        depth = -250;
        rotY = 50;
        xOffset = 125;
        borderOffset = -5;
        sign = 1;
        if (name === 'to-back') {
          sign = -1;
        }
        return {
          start: {
            x: borderOffset,
            z: sign === -1 ? 0 : depth,
            rotY: 0,
            lightness: sign === -1 ? 50 : 90,
            saturation: sign === -1 ? 100 : 0
          },
          end: {
            x: [(sign === -1 ? -xOffset : xOffset), borderOffset],
            z: [sign === -1 ? depth : 0],
            rotY: [(sign === -1 ? rotY : -rotY), 0],
            lightness: sign === -1 ? 90 : 50,
            saturation: sign === -1 ? 0 : 100
          }
        };
      };

      MTObjectSwitch.prototype.setupDOM = function() {
        this.el.append(template);
        return MTObjectSwitch.__super__.setupDOM.apply(this, arguments);
      };

      return MTObjectSwitch;

    })(MTBase);
  });

}).call(this);