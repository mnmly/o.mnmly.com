define ['zepto', 'socialite'], ($)->
  
  class Social

    COUNTER_URL  = "http://counter.mnmly.com/?url="
    _tooltipTmpl = """
      <div class="tooltip">
        <span>$count</span>
      </div>"""

    constructor: ->
      Socialite.load()
      @fetchCount()

    fetchCount: ->

      if /:8080/.test( location.href )
        url = "http://mnmly.com"
      else
        url = location.href

      $.getJSON COUNTER_URL + encodeURIComponent(url), (data)->

        return if data.status isnt 200

        {facebook, twitter, googlePlus} = data

        map =
          t: twitter
          f: facebook
          g: googlePlus

        $('.social li').each (i, el)->
          $(el).prepend _tooltipTmpl.replace('$count', map[el.className])
