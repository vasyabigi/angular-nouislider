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
      var callback, fromParsed, parsedValue, range, slider, toParsed;
      slider = $(element);
      callback = scope.callback ? scope.callback : 'slide';
      range = {
        min: [parseFloat(scope.start || 0)],
        max: [parseFloat(scope.end || 100)]
      };
      scope.$watch('start', function (value) {
        range.min = [parseFloat(value || 0)];
        return slider.noUiSlider({ range: range }, true);
      });
      scope.$watch('end', function (value) {
        range.max = [parseFloat(value || 100)];
        return slider.noUiSlider({ range: range }, true);
      });
      scope.$watch('step', function (value) {
        return slider.noUiSlider({ step: parseFloat(value || 1) }, true);
      });
      if (scope.ngFrom != null && scope.ngTo != null) {
        fromParsed = null;
        toParsed = null;
        slider.noUiSlider({
          start: [
            scope.ngFrom || scope.start,
            scope.ngTo || scope.end
          ],
          step: parseFloat(scope.step || 1),
          connect: true,
          margin: parseFloat(scope.margin || 0),
          range: range
        });
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
        slider.noUiSlider({
          start: [scope.ngModel || scope.start],
          step: parseFloat(scope.step || 1),
          range: range
        });
        slider.on(callback, function () {
          parsedValue = parseFloat(slider.val());
          return scope.$apply(function () {
            return scope.ngModel = parsedValue;
          });
        });
        return scope.$watch('ngModel', function (newVal, oldVal) {
          if (newVal !== parsedValue) {
            parsedValue = null;
            return slider.val(newVal);
          }
        });
      }
    }
  };
});  /*
//@ sourceMappingURL=app.js.map
*/
