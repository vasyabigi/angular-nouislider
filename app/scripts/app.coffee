'use strict'

angular.module('nouislider', [])
  .directive "slider", () ->
    restrict: "A"
    scope:
      start: "@"
      step: "@"
      end: "@"
      callback: "@"
      ngModel: "="
      ngFrom: "="
      ngTo: "="

    link: (scope, element, attrs) ->
      slider = $(element)

      callback = if scope.callback then scope.callback else 'slide'

      if scope.ngFrom? and scope.ngTo?
        fromParsed = null
        toParsed = null

        config =
          range: [scope.start, scope.end]
          start: [scope.ngFrom or scope.start, scope.ngTo or scope.end]
          step: scope.step or 1
          connect: true

        config[callback] = ->
          [from, to] = slider.val()

          fromParsed = parseFloat from
          toParsed = parseFloat to

          scope.values = [fromParsed, toParsed]

          scope.$apply(->
            scope.ngFrom = fromParsed
            scope.ngTo = toParsed
          )

        slider.noUiSlider(config)

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

        config =
          range: [scope.start, scope.end],
          start: scope.ngModel or scope.start,
          step: scope.step or 1
          handles: 1

        config[callback] = ->
          parsedValue = slider.val()

          scope.$apply(->
            scope.ngModel = parseFloat parsedValue
          )

        slider.noUiSlider(config)

        scope.$watch('ngModel', (newVal, oldVal) ->
          if newVal isnt parsedValue
            slider.val(newVal)
        )
