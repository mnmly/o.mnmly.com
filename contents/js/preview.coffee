define ['jquery',  'coffee', 'highlight'], ($, CoffeeScript)->
  
  
  class Preview
    constructor: ->
      @parsePre()
      hljs.tabReplace = '    '
      hljs.initHighlightingOnLoad()

    parsePre: ->
      $("pre").each ->
        $el = $(this)

        return  unless $(this).find(".coffeescript")[0]

        try
          cs = CoffeeScript.compile($el.text(), bare: true)
        catch e
          return

        $original = $el.clone()
        $compiled = $("<pre />").append($("<code class='javascript' />").text(cs))
        hljs.highlightBlock( $compiled.find('code').get(0) ,'    ' )
        $compiled.hide()
        $handleWrapper = $("<div class='handle-wrapper'/>")
        $handle = $("<button />").addClass("handle")
        $handle.attr "title", "Click to toggle between CoffeeScript & JavaScript"
        $handle.click ->
          $original.toggle()
          $compiled.toggle()
        $handleWrapper.append $handle
        $wrap = $("<div />").addClass("wrap")
        $wrap.append $original
        $wrap.append $compiled
        $wrap.append $handleWrapper
        $el.replaceWith $wrap
