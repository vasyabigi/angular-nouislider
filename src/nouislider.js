'use strict';
angular.module('nouislider', []).directive('slider', function () {
  return {
    restrict: 'A',
    scope: {
      start: '@',
      step: '@',
      end: '@',
      callback: '@',
      ngModel: '=',
      ngFrom: '=',
      ngTo: '='
    },
    link: function (scope, element, attrs) {
      var callback, config, fromParsed, parsedValue, slider, toParsed;
      slider = $(element);
      callback = scope.callback ? scope.callback : 'slide';
      if (attrs.ngFrom && attrs.ngTo) {
        fromParsed = null;
        toParsed = null;
        config = {
          range: {
            'min': parseFloat(scope.start, 10),
            'max': parseFloat(scope.end, 10)
          },
          start: [
            scope.ngFrom || parseFloat(scope.start, 10),
            scope.ngTo || parseFloat(scope.end, 10)
          ],
          step: parseFloat(scope.step, 10) || 1,
          connect: true
        };
        config[callback] = function () {
          var from, to, _ref;
          _ref = slider.val(), from = _ref[0], to = _ref[1];
          fromParsed = parseFloat(from);
          toParsed = parseFloat(to);
          scope.values = [
            fromParsed,
            toParsed
          ];
          return scope.$apply(function () {
            scope.ngFrom = fromParsed;
            return scope.ngTo = toParsed;
          });
        };
        slider.noUiSlider(config);
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
        config = {
          range: {
            'min': parseFloat(scope.start, 10),
            'max': parseFloat(scope.end, 10)
          },
          start: scope.ngModel || parseFloat(scope.start, 10),
          step: parseFloat(scope.step, 10) || 1,
          handles: 1
        };
        config[callback] = function () {
          parsedValue = slider.val();
          return scope.$apply(function () {
            return scope.ngModel = parseFloat(parsedValue);
          });
        };
        slider.noUiSlider(config);
        return scope.$watch('ngModel', function (newVal, oldVal) {
          if (newVal !== parsedValue) {
            return slider.val(newVal);
          }
        });
      }
    }
  };
});
