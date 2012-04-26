// Generated by CoffeeScript 1.3.1
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['zepto', 'mt-base', 'text!../templates/mt-popup.html', 'css!../css/mt-popup.css', 'css!../css/app.css'], function($, MTBase, template) {
    var MTPopup;
    return MTPopup = (function(_super) {

      __extends(MTPopup, _super);

      MTPopup.name = 'MTPopup';

      function MTPopup() {
        this.expandOrCloseItem = __bind(this.expandOrCloseItem, this);
        return MTPopup.__super__.constructor.apply(this, arguments);
      }

      MTPopup.prototype.init = function() {
        return this.positionAbsolute();
      };

      MTPopup.prototype.attachEvents = function() {
        var tapOrClick;
        tapOrClick = __indexOf.call(window, 'ontouchstart') >= 0 ? 'tap' : 'click';
        return this.el.on(tapOrClick, '.item', this.expandOrCloseItem);
      };

      MTPopup.prototype.expandOrCloseItem = function(e) {
        var $item;
        e.preventDefault();
        e.stopPropagation();
        $item = $(e.target);
        if ($item.hasClass('selected')) {
          $item.removeClass('selected').addClass('back');
          setTimeout(function() {
            return $item.removeClass('back');
          }, 500);
          return this.el.removeClass('on-selected');
        } else {
          $item.addClass('selected');
          return this.el.addClass('on-selected');
        }
      };

      MTPopup.prototype.positionAbsolute = function() {
        var containerLeft, containerTop, style, styleText;
        style = document.createElement('style');
        style.type = 'text/css';
        document.head.appendChild(style);
        containerTop = this.el.get(0).offsetTop;
        containerLeft = this.el.get(0).offsetLeft;
        styleText = "";
        this.el.find('.item').each(function(i, el) {
          var left, top;
          left = el.offsetLeft;
          top = el.offsetTop;
          styleText += "#mt-popup li:nth-child(" + (i + 1) + "){\n  top: " + top + "px;\n  left: " + left + "px;\n}";
          return setTimeout(function() {
            el.style['margin'] = '0';
            return el.style['position'] = 'absolute';
          }, 0);
        });
        return style.innerHTML = styleText;
      };

      MTPopup.prototype.setupDOM = function() {
        this.el.append(template);
        return MTPopup.__super__.setupDOM.apply(this, arguments);
      };

      return MTPopup;

    })(MTBase);
  });

}).call(this);
