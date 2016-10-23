'use strict';
angular.module('nouislider', []).directive('slider', function () {
  return {
    restrict: 'A',
    scope: {
      start: '@',
      step: '@',
      end: '@',
      callback: '@',
      margin: '@',
      ngModel: '=',
      ngFrom: '=',
      ngTo: '='
    },
    link: function (scope, element, attrs) {
      var callback, fromParsed, opts, parsedValue, slider, toParsed;
      slider = element[0];
      callback = scope.callback ? scope.callback : 'slide';
      if (scope.ngFrom != null && scope.ngTo != null) {
        fromParsed = null;
        toParsed = null;
        opts = {
          start: [
            scope.ngFrom || scope.start,
            scope.ngTo || scope.end
          ],
          step: parseFloat(scope.step || 1),
          connect: true,
          margin: parseFloat(scope.margin || 0),
          range: {
            min: [parseFloat(scope.start)],
            max: [parseFloat(scope.end)]
          }
        };
        slider = noUiSlider.create(slider, opts);
        slider.on(callback, function () {
          var from, to, _ref;
          _ref = slider.get(), from = _ref[0], to = _ref[1];
          fromParsed = parseFloat(from);
          toParsed = parseFloat(to);
          return scope.$evalAsync(function () {
            scope.ngFrom = fromParsed;
            return scope.ngTo = toParsed;
          });
        });
        scope.$watch('ngFrom', function (newVal, oldVal) {
          if (newVal !== fromParsed) {
            return slider.set([
              newVal,
              null
            ]);
          }
        });
        return scope.$watch('ngTo', function (newVal, oldVal) {
          if (newVal !== toParsed) {
            return slider.set([
              null,
              newVal
            ]);
          }
        });
      } else {
        parsedValue = null;
        opts = {
          start: [scope.ngModel || scope.start],
          step: parseFloat(scope.step || 1),
          range: {
            min: [parseFloat(scope.start)],
            max: [parseFloat(scope.end)]
          }
        };
        slider = noUiSlider.create(slider, opts);
        slider.on(callback, function () {
          parsedValue = parseFloat(slider.get());
          return scope.$evalAsync(function () {
            return scope.ngModel = parsedValue;
          });
        });
        return scope.$watch('ngModel', function (newVal, oldVal) {
          if (newVal !== parsedValue) {
            return slider.set(newVal);
          }
        });
      }
    }
  };
});  /*
//@ sourceMappingURL=app.js.map
*/