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
      var callback, fromParsed, parsedValue, slider, toParsed;
      slider = element[0];
      callback = scope.callback ? scope.callback : 'slide';
      if (scope.ngFrom != null && scope.ngTo != null) {
        fromParsed = null;
        toParsed = null;
        noUiSlider.create(slider, {
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
        });
        slider.noUiSlider.on(callback, function () {
          var from, to, _ref;
          _ref = slider.noiSlider.get(), from = _ref[0], to = _ref[1];
          fromParsed = parseFloat(from);
          toParsed = parseFloat(to);
          return scope.$apply(function () {
            scope.ngFrom = fromParsed;
            return scope.ngTo = toParsed;
          });
        });
        scope.$watch('ngFrom', function (newVal, oldVal) {
          if (newVal !== fromParsed) {
            return slider.noUiSlider.set([
              newVal,
              null
            ]);
          }
        });
        return scope.$watch('ngTo', function (newVal, oldVal) {
          if (newVal !== toParsed) {
            return slider.noUiSlider.set([
              null,
              newVal
            ]);
          }
        });
      } else {
        parsedValue = null;
        noUiSlider.create(slider, {
          start: [scope.ngModel || scope.start],
          step: parseFloat(scope.step || 1),
          range: {
            min: [parseFloat(scope.start)],
            max: [parseFloat(scope.end)]
          }
        });
        slider.noUiSlider.on(callback, function () {
          parsedValue = parseFloat(slider.noUiSlider.get());
          return scope.$apply(function () {
            return scope.ngModel = parsedValue;
          });
        });
        return scope.$watch('ngModel', function (newVal, oldVal) {
          if (newVal !== parsedValue) {
            return slider.noUiSlider.set(newVal);
          }
        });
      }
    }
  };
});