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
        slider.noUiSlider(
          range: [scope.start, scope.end]
          start: [scope.ngFrom or scope.start, scope.ngTo or scope.end]
          connect: true
        ).change((ev) ->
          [from, to] = $(ev.target).val()
          scope.$apply(->
            scope.ngFrom = parseInt from, 10
            scope.ngTo = parseInt to, 10
          )
        )
      else
        slider.noUiSlider(
          range: [scope.start, scope.end],
          start: scope.ngModel or scope.start,
          step: scope.step,
          handles: 1
        ).change((ev) ->
          scope.$apply(->
            scope.ngModel = parseInt $(ev.target).val(), 10
          )
        )
