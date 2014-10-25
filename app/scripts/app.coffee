'use strict'

angular.module('nouislider', [])
  .directive "slider", () ->
    restrict: "A"
    scope:
      range: "="
      step: "@"
      connect: "@"
      callback: "@"
      margin: "@"
      ngModel: "="
      ngFrom: "="
      ngTo: "="

    link: (scope, element, attrs) ->
      slider = $(element)

      callback = if scope.callback then scope.callback else 'slide'

      if scope.ngFrom? and scope.ngTo?
        fromParsed = null
        toParsed = null

        sliderConfig =
          start: [scope.ngFrom or scope.range.min, scope.ngTo or scope.range.max]
          step: parseFloat(scope.step or 1)
          connect: true
          range: scope.range

        if scope.margin
          sliderConfig['margin'] = scope.margin

        slider.noUiSlider(sliderConfig)


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
        sliderConfig =
          start: [scope.ngModel or scope.range.min]
          step: parseFloat(scope.step or 1)
          range: scope.range

        if scope.connect
          sliderConfig['connect'] = scope.connect

        slider.noUiSlider(sliderConfig)

        slider.on callback, ->
          parsedValue = parseFloat slider.val()
          scope.$apply ->
            scope.ngModel = parsedValue

        scope.$watch('ngModel', (newVal, oldVal) ->
          if newVal isnt parsedValue
            slider.val(newVal)
        )
