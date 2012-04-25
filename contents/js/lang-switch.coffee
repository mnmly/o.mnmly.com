define ["zepto"], ($)->

  ###
    prettty bad code...
  ###
  
  class LangSwitch

    _buttonTmpl = """
      <div id="lang">
        <span><a href="#ja" class="active ignore">JP</a> / <a href="#en" class="ignore">EN</a></span>
	    </div>
    """

    _groupTmpl = """
      <seciton class="lang-group">
        <div class="inner">
          
        </div>
      </section>
    """

    resetHeight: (lang)->

      @bodyText.find('.lang-group').each (i, el)->
        $el = $(el)
        $activeLang =  $el.find('.' + lang)
        if $activeLang.length > 0
          $el.height $activeLang.height()
        else
          $el.height 1

    setLang: (lang)->
      $("#lang").find('.active').removeClass 'active'
      console.log lang
      $("#lang a[href*=#{lang}]").addClass 'active'
      @bodyText.removeClass('ja-enabled').removeClass('en-enabled')
      @bodyText.addClass "#{lang}-enabled"

    constructor: ->
      
      return unless $(".body-text").find('.ja, .en').length > 0
      @bodyText = $(".body-text")
      $("aside.meta").append _buttonTmpl
      
      defaultLang = 'ja'

      if location.hash isnt "" and location.hash is "#en"
        defaultLang = "en"
        @setLang(defaultLang)
          

      @bodyText.addClass "#{defaultLang}-enabled"
      @bodyText.find("div.ja").each (i, el)=>

        $enPart = @bodyText.find("div.en[data-group='#{el.getAttribute( "data-group" )}']")
        $groupSection = $(_groupTmpl)
        $groupSection.insertBefore el
        $groupSection.find('.inner').append( el ).append($enPart.show())
        @resetHeight(defaultLang)


      $("aside.meta").on 'click', 'a', (e)=>
        lang = e.target.getAttribute('href').replace('#', '')
        @setLang(lang)
        @resetHeight(lang)
