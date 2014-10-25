'use strict';
angular.module('nouislider', []).directive('slider', function () {
  return {
    restrict: 'A',
    scope: {
      range: '=',
      step: '@',
      connect: '@',
      callback: '@',
      margin: '@',
      ngModel: '=',
      ngFrom: '=',
      ngTo: '='
    },
    link: function (scope, element, attrs) {
      var callback, fromParsed, parsedValue, slider, sliderConfig, toParsed;
      slider = $(element);
      callback = scope.callback ? scope.callback : 'slide';
      if (scope.ngFrom != null && scope.ngTo != null) {
        fromParsed = null;
        toParsed = null;
        sliderConfig = {
          start: [
            scope.ngFrom || scope.range.min,
            scope.ngTo || scope.range.max
          ],
          step: parseFloat(scope.step || 1),
          connect: true,
          range: scope.range
        };
        if (scope.margin) {
          sliderConfig['margin'] = scope.margin;
        }
        slider.noUiSlider(sliderConfig);
        slider.on(callback, function () {
          var from, to, _ref;
          _ref = slider.val(), from = _ref[0], to = _ref[1];
          fromParsed = parseFloat(from);
          toParsed = parseFloat(to);
          return scope.$apply(function () {
            scope.ngFrom = fromParsed;
            return scope.ngTo = toParsed;
          });
        });
        scope.$watch('ngFrom', function (newVal, oldVal) {
          if (newVal !== fromParsed) {
            return slider.val([
              newVal,
              null
            ]);
          }
        });
        return scope.$watch('ngTo', function (newVal, oldVal) {
          if (newVal !== toParsed) {
            return slider.val([
              null,
              newVal
            ]);
          }
        });
      } else {
        parsedValue = null;
        sliderConfig = {
          start: [scope.ngModel || scope.range.min],
          step: parseFloat(scope.step || 1),
          range: scope.range
        };
        if (scope.connect) {
          sliderConfig['connect'] = scope.connect;
        }
        slider.noUiSlider(sliderConfig);
        slider.on(callback, function () {
          parsedValue = parseFloat(slider.val());
          return scope.$apply(function () {
            return scope.ngModel = parsedValue;
          });
        });
        return scope.$watch('ngModel', function (newVal, oldVal) {
          if (newVal !== parsedValue) {
            return slider.val(newVal);
          }
        });
      }
    }
  };
});  /*
//@ sourceMappingURL=app.js.map
*/