define ['libs/asevented.min'], ->

  class Pjax
    MORE_SPAN = "<span class=\"more\"></span>"
    constructor: ->

      @pageCache = {}

      historyObj =
        url: document.location.href
        title: document.title
        bodyClass: $('body').attr('class')
      
      history.replaceState(historyObj, document.title, document.location.href)

      asEvented.call(Pjax::)

      @attachEvents()

    updatePage: (data, historyObj)->
      $data = $(data)
      articleIndex = 0
      if historyObj.bodyClass is 'index'
        $fullArticle = $data.find('#article-list')
        $("#content").empty().append $fullArticle
      else
        $afterMore    = $( "<p>" + $data.find('.body-text').html().split(MORE_SPAN)[1] )
        $footer       = $data.find('footer')
        $readMoreLink = $("p.read-more a[href='#{historyObj.url.replace(location.origin, '')}']")
        $targetPost   = $readMoreLink.parents('.article-container')
        articleIndex  = $targetPost.parent().index()
        $readMoreLink.parent().replaceWith $afterMore
        $targetPost.append $footer
        $("#article-list .inner").get(0).style.height = 'auto'
      
      articleData =
        index: articleIndex

      $('body').removeClass().addClass historyObj.bodyClass
      @trigger('load:article', articleData)
      

    loadPage: (title, url, fn = null)=>

      $.get url, (data)=>
        historyObj =
          url: url
          title: title
          bodyClass: data.match(/body class="(\w+)"/)[1]

        @pageCache[url] = data
        @updatePage(data, historyObj)
        fn(historyObj) if fn?
    
    
    attachEvents: ->

      window.addEventListener 'popstate', (e)=>
        if e.state?.url?
          if @pageCache[e.state.url]?
            @updatePage(@pageCache[e.state.url], e.state)
          else
            @loadPage(e.state.url)

      $("body").on "click", "h2>a, .read-more>a", (e)=>

        e.preventDefault()

        url   = e.target.href
        title = e.target.textContent

        @loadPage title, url, (historyObj)->
          history.pushState(historyObj, title, url)

