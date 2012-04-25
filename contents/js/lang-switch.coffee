define ["zepto"], ($)->

  class LangSwitch
    _template = """
      <div id="lang">
        <span><a href="#ja" class="active">JP</a> / <a href="#en">EN</a></span>
	    </div>
    """
    constructor: ->
      return unless $(".body-text").find('.ja, .en').length > 0

      $("aside.meta").append _template
      @bodyText = $(".body-text")
      @bodyText.find("div.ja[data-group^='#']").each (i, el)=>
        $enPart = @bodyText.find("div.en[data-group='#{el.getAttribute( "data-group" )}']")

        if $enPart.length > 0
          $groupSection = $("<section class='lang-wrapper'/>")
          $groupSection.insertBefore el
          $groupSection.append( el ).append($enPart)
