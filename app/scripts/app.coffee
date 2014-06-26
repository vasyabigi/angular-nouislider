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
      slider = $(element)

      callback = if scope.callback then scope.callback else 'slide'

      range =
        min: [parseFloat scope.start or 0]
        max: [parseFloat scope.end or 100]

      scope.$watch('start', (value) ->
        range.min = [parseFloat value or 0];
        slider.noUiSlider({ range: range }, true)
      )

      scope.$watch('end', (value) ->
        range.max = [parseFloat value or 100];
        slider.noUiSlider({ range: range }, true)
      )

      scope.$watch('step', (value) ->
        slider.noUiSlider({ step: parseFloat value or 1 }, true)
      )

      if scope.ngFrom? and scope.ngTo?
        fromParsed = null
        toParsed = null

        slider.noUiSlider
          start: [scope.ngFrom or scope.start, scope.ngTo or scope.end]
          step: parseFloat(scope.step or 1)
          connect: true
          margin: parseFloat(scope.margin or 0)
          range: range

        slider.on callback, ->
          [from, to] = slider.val()

          fromParsed = parseFloat from
          toParsed = parseFloat to

          scope.$apply(->
            scope.ngFrom = fromParsed
            scope.ngTo = toParsed
          )

        scope.$watch('ngFrom', (newVal, oldVal) ->
          if newVal isnt fromParsed
            slider.val([newVal, null])
        )

        scope.$watch('ngTo', (newVal, oldVal) ->
          if newVal isnt toParsed
            slider.val([null, newVal])
        )
      else
        parsedValue = null

        slider.noUiSlider
          start: [scope.ngModel or scope.start],
          step: parseFloat(scope.step or 1)
          range: range

        slider.on callback, ->
          parsedValue = parseFloat slider.val()
          scope.$apply ->
            scope.ngModel = parsedValue

        scope.$watch('ngModel', (newVal, oldVal) ->
          if newVal isnt parsedValue
            slider.val(newVal)
        )
