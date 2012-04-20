(function() {

  define(['zepto'], function($) {
    var easing, interpolate;
    interpolate = function(source, target, shift) {
      return source + (target - source) * shift;
    };
    easing = function(pos) {
      return (-Math.cos(pos * Math.PI) / 2) + .5;
    };
    return $.scroll = function(endY, duration, easingF) {
      var animate, finishT, startT, startY;
      endY = endY || ($.os.android ? 1 : 0);
      duration = duration || 200;
      (typeof easingF === "function") && (easing = easingF);
      startY = window.pageYOffset;
      startT = Date.now();
      finishT = startT + duration;
      animate = function() {
        var now, shift;
        now = +(new Date());
        shift = (now > finishT ? 1 : (now - startT) / duration);
        window.scrollTo(0, interpolate(startY, endY, easing(shift)));
        return (now > finishT) || setTimeout(animate, 15);
      };
      return animate();
    };
  });

}).call(this);
