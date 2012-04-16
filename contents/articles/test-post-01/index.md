title: Demo Post No1
date: 2012-05-02 12:00
template: article.jade

今回は`require.js`を使って`AMD`の説明をしていきたいと思います。

### AMDって？
[CommonJS Wiki]より引用すると:

>The Asynchronous Module Definition API specifies a mechanism for defining modules such that the module and its dependencies can be asynchronously loaded. This is particularly well suited for the browser environment where synchronous loading of modules incurs performance, usability, debugging, and cross-domain access problems. 

つまり簡単にいえば、**依存関係のあるモジュール(ファイル)をうまく管理する仕組み**みたいなものです。

### 使い方
まずモジュールの定義の方法

```coffeescript
define ->

  class Person
    
    _state =
      STOP: "stop"
      RUN: "run"
      WALK: "walk"
    
    constructor: (@state = null)->
      
      
      @state = _state.STOP unless @checkState(@state)
      
      console.log "App init"
      
      run: ->
        @state = _state.RUN
       
      walk: ->
        @state = _state.WALK
      
      checkState: (stateName)->
        for key, val of _state
          if stateName is val
            return yes
        return no
```
 
このモジュールを使うには、

```coffeescript

	require ['person'], (Person)->
   
      runner = new Person('run')
 	  
 	  console.log runner.state # => run```

[CommonJS Wiki]: http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition
