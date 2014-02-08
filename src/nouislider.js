'use strict';
angular.module('nouislider', []);
'use strict';
angular.module('nouislider').directive('slider', function () {
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
      var slider;
      slider = $(element);
      if (scope.ngFrom != null && scope.ngTo != null) {
        return slider.noUiSlider({
          range: [
            scope.start,
            scope.end
          ],
          start: [
            scope.ngFrom || scope.start,
            scope.ngTo || scope.end
          ],
          connect: true
        }).change(function (ev) {
          var from, to, _ref;
          _ref = $(ev.target).val(), from = _ref[0], to = _ref[1];
          return scope.$apply(function () {
            scope.ngFrom = parseInt(from, 10);
            return scope.ngTo = parseInt(to, 10);
          });
        });
      } else {
        return slider.noUiSlider({
          range: [
            scope.start,
            scope.end
          ],
          start: scope.ngModel || scope.start,
          step: scope.step,
          handles: 1
        }).change(function (ev) {
          return scope.$apply(function () {
            return scope.ngModel = parseInt($(ev.target).val(), 10);
          });
        });
      }
    }
  };
});