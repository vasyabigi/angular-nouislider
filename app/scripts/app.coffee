 'use strict'

 angular.module('nouislider', [])
  .directive "slider", () ->
    restrict: "A"
    scope:
      start: "@"
      step: "@"
      end: "@"
      callback: "@"
      margin: "@"
      ngModel: "="
      ngFrom: "="
      ngTo: "="

    link: (scope, element, attrs) ->
      slider = element[0]

      callback = if scope.callback then scope.callback else 'slide'

      if scope.ngFrom? and scope.ngTo?
        fromParsed = null
        toParsed = null
        opts =
          start: [scope.ngFrom or scope.start, scope.ngTo or scope.end]
          step: parseFloat(scope.step or 1)
          connect: true
          margin: parseFloat(scope.margin or 0)
          range:
            min: [parseFloat scope.start]
            max: [parseFloat scope.end]
        slider = noUiSlider.create slider, opts

        slider.on callback, ->
          [from, to] = slider.get()

          fromParsed = parseFloat from
          toParsed = parseFloat to

          scope.$evalAsync(->
            scope.ngFrom = fromParsed
            scope.ngTo = toParsed
          )

        scope.$watch('ngFrom', (newVal, oldVal) ->
          if newVal isnt fromParsed
            slider.set([newVal, null])
        )

        scope.$watch('ngTo', (newVal, oldVal) ->
          if newVal isnt toParsed
            slider.set([null, newVal])
        )
      else
        parsedValue = null
        opts =
          start: [scope.ngModel or scope.start],
          step: parseFloat(scope.step or 1)
          range:
            min: [parseFloat scope.start]
            max: [parseFloat scope.end]
        slider = noUiSlider.create slider, opts

        slider.on callback, ->
          parsedValue = parseFloat slider.get()
          scope.$evalAsync ->
            scope.ngModel = parsedValue

        scope.$watch('ngModel', (newVal, oldVal) ->
          if newVal isnt parsedValue
            slider.set(newVal)
        )
