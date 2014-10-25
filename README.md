angular-nouislider
==================

Simple angular directive for jquery [nouislider](http://refreshless.com/nouislider/) plugin. Demo is [here](http://vasyabigi.github.io/angular-nouislider/).

### Usage:

- Install: `bower install angular-nouislider`
- Add `jquery`, `angular`, `nouislider` and `angular-nouislider` to your code:

```html
<link rel="stylesheet" href="bower_components/nouislider/jquery.nouislider.css" />
<script src="bower_components/jquery/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/nouislider/jquery.nouislider.js"></script>
<script src="bower_components/nouislider/Link.js"></script>
<script src="bower_components/angular-nouislider/src/nouislider.js"></script>
```

- Add a dependency to the `nouislider` module in your application.

```js
angular.module('MyApp', ['nouislider']);
```

- Define a the slider model in your controller.

```js
$scope.test = {
    range: {
        min: 0,
        '50%': [10,10],
        max: 100
    },
    selected: {
        from: 3,
        to: 6
    }
};
```

- Add a `slider` attribute to your `<div>` tag:

```html
<div slider ng-model="test.single" range="test.range"></div>
<div slider ng-from="test.selected.from" ng-to="test.selected.to" range="test.range" step=5></div>
```

- If you wanna change [callback function](http://refreshless.com/nouislider/slider-events), use `callback` attribute. (`slide` by default.)

```html
<div slider ng-model="test.single" range="test.range" callback='change'></div>
<div slider ng-from="test.from" ng-to="test.to" range="test.range" step=5 callback='set'></div>
```

That's it!

### Screenshot:

![example](https://raw2.github.com/vasyabigi/angular-nouislider/master/example.jpg "angular-nouislider")
