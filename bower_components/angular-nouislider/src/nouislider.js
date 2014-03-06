'use strict';
angular.module('nouislider', []).directive('slider', function () {
  return {
    restrict: 'A',
    scope: {
      start: '@',
      step: '@',
      end: '@',
      ngModel: '=',
      ngFrom: '=',
      ngTo: '='
    },
    link: function (scope, element, attrs) {
      var fromParsed, parsedValue, slider, toParsed;
      slider = $(element);
      if (scope.ngFrom != null && scope.ngTo != null) {
        fromParsed = null;
        toParsed = null;
        slider.noUiSlider({
          range: [
            scope.start,
            scope.end
          ],
          start: [
            scope.ngFrom || scope.start,
            scope.ngTo || scope.end
          ],
          step: scope.step || 1,
          connect: true,
          slide: function () {
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
          }
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
        slider.noUiSlider({
          range: [
            scope.start,
            scope.end
          ],
          start: scope.ngModel || scope.start,
          step: scope.step || 1,
          handles: 1,
          slide: function () {
            parsedValue = slider.val();
            return scope.$apply(function () {
              return scope.ngModel = parseFloat(parsedValue);
            });
          }
        });
        return scope.$watch('ngModel', function (newVal, oldVal) {
          if (newVal !== parsedValue) {
            return slider.val(newVal);
          }
        });
      }
    }
  };
});