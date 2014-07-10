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
      connect: '@',
      orientation: '@',
      lowerTooltipTarget: '=',
      lowerTooltipMethod: '&',
      lowerTooltipFormat: '=',
      upperTooltipTarget: '=',
      upperTooltipMethod: '&',
      upperTooltipFormat: '=',
      direction: '@',
      ngModel: '=',
      ngFrom: '=',
      ngTo: '='
    },
    link: function (scope, element, attrs) {
      var callback, config, fromParsed, parsedValue, setupTooltip, slider, toParsed;
      slider = $(element);
      callback = scope.callback ? scope.callback : 'slide';
      setupTooltip = function (target, method, format, config, handle) {
        var atLeastOne, linkConfig;
        linkConfig = {};
        atLeastOne = false;
        if (target) {
          linkConfig.target = target;
          atLeastOne = true;
        }
        if (method && method()) {
          linkConfig.method = method();
          atLeastOne = true;
        }
        if (format) {
          linkConfig.format = format;
          atLeastOne = true;
        }
        if (atLeastOne) {
          if (!config.serialization) {
            config.serialization = {};
          }
          return config.serialization[handle || 'lower'] = [$.Link(linkConfig)];
        }
      };
      if (scope.ngFrom != null && scope.ngTo != null) {
        fromParsed = null;
        toParsed = null;
        config = {
          start: [
            scope.ngFrom || scope.start,
            scope.ngTo || scope.end
          ],
          step: parseFloat(scope.step || 1),
          connect: true,
          margin: parseFloat(scope.margin || 0),
          orientation: scope.orientation || 'horizontal',
          direction: scope.direction || 'ltr',
          range: {
            min: [parseFloat(scope.start)],
            max: [parseFloat(scope.end)]
          }
        };
        setupTooltip(scope.lowerTooltipTarget, scope.lowerTooltipMethod, scope.lowerTooltipFormat, config);
        setupTooltip(scope.upperTooltipTarget, scope.upperTooltipMethod, scope.upperTooltipFormat, config, 'upper');
        slider.noUiSlider(config);
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
        config = {
          start: [scope.ngModel || scope.start],
          step: parseFloat(scope.step || 1),
          connect: scope.connect || false,
          orientation: scope.orientation || 'horizontal',
          direction: scope.direction || 'ltr',
          range: {
            min: [parseFloat(scope.start)],
            max: [parseFloat(scope.end)]
          }
        };
        setupTooltip(scope.lowerTooltipTarget, scope.lowerTooltipMethod, scope.lowerTooltipFormat, config);
        slider.noUiSlider(config);
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