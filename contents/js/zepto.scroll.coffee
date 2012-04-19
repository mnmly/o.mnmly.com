define ['zepto'], ($)->

  interpolate = (source, target, shift) ->
    source + (target - source) * shift

  easing = (pos) ->
    (-Math.cos(pos * Math.PI) / 2) + .5
    

  $.scroll = (endY, duration, easingF) ->
    endY = endY or (if $.os.android then 1 else 0)
    duration = duration or 200
    (typeof easingF is "function") and (easing = easingF)
    startY = window.pageYOffset
    startT = Date.now()
    finishT = startT + duration
    animate = ->
      now = +(new Date())
      shift    = (if (now > finishT) then 1 else (now - startT) / duration)
      window.scrollTo 0, interpolate(startY, endY, easing(shift))
      (now > finishT) or setTimeout(animate, 15)

    animate()
