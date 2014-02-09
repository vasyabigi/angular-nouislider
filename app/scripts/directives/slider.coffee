"use strict"

angular.module("nouislider")
  .directive "slider", () ->
    restrict: "A"
    scope:
      start: "@"
      step: "@"
      end: "@"
      ngModel: "="
      ngFrom: "="
      ngTo: "="

    link: (scope, element, attrs) ->
      slider = $(element)

      if scope.ngFrom? and scope.ngTo?
        fromParsed = null
        toParsed = null

        slider.noUiSlider(
          range: [scope.start, scope.end]
          start: [scope.ngFrom or scope.start, scope.ngTo or scope.end]
          step: scope.step or 1
          connect: true
        ).change((ev) ->
          [from, to] = slider.val()

          fromParsed = parseInt from, 10
          toParsed = parseInt to, 10

          scope.values = [fromParsed, toParsed]

          scope.$apply(->
            scope.ngFrom = fromParsed
            scope.ngTo = toParsed
          )
        )

        scope.$watch('ngFrom', (newVal, oldVal) ->
          if newVal isnt fromParsed
            slider.val([newVal, null])
        )

        scope.$watch('ngTo', (newVal, oldVal) ->
          if newVal isnt toParsed
            toParsed = newVal
            slider.val([null, newVal])
        )
      else
        parsedValue = null

        slider.noUiSlider(
          range: [scope.start, scope.end],
          start: scope.ngModel or scope.start,
          step: scope.step or 1
          handles: 1
        ).change((ev) ->
          parsedValue = slider.val()

          scope.$apply(->
            scope.ngModel = parseInt parsedValue, 10
          )
        )

        scope.$watch('ngModel', (newVal, oldVal) ->
          if newVal isnt parsedValue
            parsedValue = newVal
            slider.val(newVal)
        )
