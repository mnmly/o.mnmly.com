title: Google HTML/CSS Styleguide
date: 2012-04-25 9:00
template: link.jade
type: link
link: http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml

GoogleのHTML/CSSのスタイルガイド。

良い例と悪い例が並列してあって説明もされている。マークアップ書き始めの人にはいい感じのまとめ。

でも「これ知らんかったぁ…」とか「こっちの方がいいんやぁ…」っていうんがちらほら。

### [Protocol](http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml#Protocol)
なんとなぁーく知ってたけど理由が今いちわからなかったのが`Protocol`。`http:`とか`https:`とかのことで、このStyleguide的にはそれは省いている。これで`Mixed content issues`が解消されてファイルサイズがほんの少し縮小されるらしい。(`Mixed content issue`が何のことかはわからないです :D)

	<!-- Not recommended -->
	<script src="http://o.mnmly.com/js/main.js"></script>

	<!-- Recommended -->
	<script src="//o.mnmly.com/js/main.js"></script>


でも[HTML5を使おう！](http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml?showone=Document_type#Document_type)と書いている一方でこのStyleguideそのものは`xml`で書かれている感がGoogleっぽい :P

個人的には[Github](https://github.com)の[Styleguide](https://github.com/styleguide/)の方が見やすくて好き。

<small>(via [@jsgoodies](https://twitter.com/jsgoodies/status/195130038964862976))</small>