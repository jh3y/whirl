#(cs)spinner


###Pure CSS loading animations with minimal effort!

![alt tag](https://raw.github.com/jh3y/-cs-spinner/master/images/csspinner.gif)

#### Demo
[here](http://jh3y.github.io/-cs-spinner).

#### Usage
1. Include the [stylesheet](https://raw2.github.com/jh3y/-cs-spinner/master/csspinner.css)(tweaking where necessary).
2. Add and remove appropriate classes to your elements when necessary to show loading(using js).


That's it!

```html
	<div class="csspinner duo">
		This content is taking ages to load.
	</div>
```

####options
From using the demo you can work out which classes you need to add to your elements in order to show the loading animation you want.

By default, you will always need `csspinner`.

Then there are;

* `traditional`
* `duo`
* `double-up`
* `sphere`
* `sphere-vertical`
* `bar`
* `bar-follow`
* `line`
* `line grow`
* `line back-and-forth`
* `shadow`
* `shadow oval`/`shadow oval left`
* `shadow oval right`

There is also `no-overlay` which will hide the overlay which is added by default. 

#### Tweaking/Developing
I am fully aware that my styling of these animations aren't to everyones tastes and also that sometimes positioning won't be suitable etc. therefore it is likely you'll have to tweak the stylesheet to get the colors you want etc.

I've provided both LESS and SASS/SCSS versions of the file and have provided variables that can be easily changed where I think makes sense in this first run of creating (cs)spinner. Of course, feel free to submit an issue or send me a message if you feel something could be much better.

#### How does this work?
Not surprisingly it's real simple! :)

(cs)spinner makes use of CSS pseudo elements. It uses `:before` to provide an overlay effect if required and `:after` to show the animated spinner/bar etc.

making use of pseudo elements means that we can add (cs)spinner loading animations to any existing element on our page without being intrusive just by adding some classes as long as the elements pseudo elements aren't currently in use.

#### Contributing

Any suggestions, improvements or issues are welcome. :)

@jh3y

#### License

MIT

Copyright (c) 2014 [@jh3y](https://github.com/jh3y)
