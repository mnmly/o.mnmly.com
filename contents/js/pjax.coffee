define ->
  class Pjax
    constructor: ->
      @attachEvents()

    attachEvents: ->

      $("article h2 a").on "click", (e)=>
        e.preventDefault()
        $el = $(e.target)
        url = $el.attr('href')
        @updateHistory(url)
        $.get url, (data)->
          console.log data
          $fullArticle = $( data ).find('.post')
          $("#content").empty().append $fullArticle

    updateHistory: (url)->
      
