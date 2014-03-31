angular.module('directives.tooltip', []).directive('nbTooltip', function ($document, $compile) {
  return {

    // create an isolate scope so we don't mess with outside scopes
    scope: true,

    link: function (scope, element, attrs) {
      var tooltip = null;
      var tooltipLinker = $compile('<div class="tooltip">{{ text }}</div>');

      function showTooltip (event) {
        tooltip = tooltipLinker(scope);
        scope.text = attrs.nbTooltip;
        scope.$digest();
        tooltip.css({
          top: event.y + 5 + 'px',
          left: event.x + 5 + 'px'
        });
        $document.find('body').append(tooltip);
      }

      function hideTooltip (event) {
        tooltip.remove();
      }
      element.on('mouseover', showTooltip);
      element.on('mouseout', hideTooltip);

      // remove event listeners we added in this directive
      scope.$on('$destroy', function () {
        element.off('mouseover', showTooltip);
        element.off('mouseout', hideTooltip);
      });
    }
  };
});