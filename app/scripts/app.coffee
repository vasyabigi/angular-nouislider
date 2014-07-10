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
      connect: "@"
      orientation: "@"
      lowerTooltipTarget: '='
      lowerTooltipMethod: '&'
      lowerTooltipFormat: '='
      upperTooltipTarget: '='
      upperTooltipMethod: '&'
      upperTooltipFormat: '='
      direction: "@"
      ngModel: "="
      ngFrom: "="
      ngTo: "="

    link: (scope, element, attrs) ->
      slider = $(element)

      callback = if scope.callback then scope.callback else 'slide'

      setupTooltip = (target, method, format, config, handle) ->
        linkConfig = {}
        atLeastOne = false
        if target
            linkConfig.target = target
            atLeastOne = true
        if method and method()
            linkConfig.method = method()
            atLeastOne = true
        if format
            linkConfig.format = format
            atLeastOne = true
        if atLeastOne
            if !config.serialization
                config.serialization = {}
            config.serialization[handle or 'lower'] = [$.Link(linkConfig)]

      if scope.ngFrom? and scope.ngTo?
        fromParsed = null
        toParsed = null

        config = {
          start: [scope.ngFrom or scope.start, scope.ngTo or scope.end]
          step: parseFloat(scope.step or 1)
          connect: true
          margin: parseFloat(scope.margin or 0)
          orientation: scope.orientation or "horizontal"
          direction: scope.direction or "ltr"
          range:
            min: [parseFloat scope.start]
            max: [parseFloat scope.end]
        }
        setupTooltip(scope.lowerTooltipTarget, scope.lowerTooltipMethod, scope.lowerTooltipFormat, config)
        setupTooltip(scope.upperTooltipTarget, scope.upperTooltipMethod, scope.upperTooltipFormat, config, 'upper')

        slider.noUiSlider config

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

        config = {
          start: [scope.ngModel or scope.start],
          step: parseFloat(scope.step or 1)
          connect: scope.connect or false
          orientation: scope.orientation or "horizontal"
          direction: scope.direction or "ltr"
          range:
            min: [parseFloat scope.start]
            max: [parseFloat scope.end]
        }

        setupTooltip(scope.lowerTooltipTarget, scope.lowerTooltipMethod, scope.lowerTooltipFormat, config)

        slider.noUiSlider config

        slider.on callback, ->
          parsedValue = parseFloat slider.val()
          scope.$apply ->
            scope.ngModel = parsedValue

        scope.$watch('ngModel', (newVal, oldVal) ->
          if newVal isnt parsedValue
            slider.val(newVal)
        )
