define ['libs/asevented.min'], ->

  class Pjax


    constructor: ->

      @pageCache = {}

      historyObj =
        url: document.location.href
        title: document.title
        bodyClass: $('body').attr('class')
      
      history.replaceState(historyObj, document.title, document.location.href)

      asEvented.call(Pjax::)

      @attachEvents()

    updatePage: (data)->
      $fullArticle = $( data ).find('.post')
      $("#content").empty().append $fullArticle
      @trigger('load:article', data)
      

    loadPage: (title, url, fn = null)=>

      $.get url, (data)=>
        historyObj =
          url: url
          title: title
          bodyClass: $('body').attr('class')

        @pageCache[url] = data
        @updatePage(data)
        fn(historyObj) if fn?
      
    attachEvents: ->

      window.addEventListener 'popstate', (e)=>
        if e.state?.url?
          if @pageCache[e.state.url]?
            @updatePage(@pageCache[e.state.url])
          else
            @loadPage(e.state.url)

      $("body").on "click", "h2>a, .read-more>a", (e)=>

        e.preventDefault()

        url = e.target.href
        title = e.target.textContent

        @loadPage title, url, (historyObj)->
          history.pushState(historyObj, title, url)

