angular.module('directives.example', []).directive('nbExample', function ($compile) {
  return {

    // create isolate scopes for examples
    scope: {},

    // Only match to element or attribute
    restrict: 'EA',

    // don't process any other directive
    terminal: true,

    // priority higher than other directives
    priority: 1000,

    // compile function - this will return a linking function
    compile: function (templateElement, templateAttributes) {

      /* compile the template. This will return a function that will create
       * real DOM within a scope - kind of like underscore templates return
       * a function that will operate on data
       * We need more control for this template than providing a template
       * attribute to the directive
       */
      var template = $compile('<div><h3>Example:</h3><pre><code></code></pre><div><h3>Output:</h3></div></div>');
      
      // Get the contents of the directive as a string for later use
      var example = templateElement.html();

      // Remove leading whitespaces and replace with a single return per line
      var leadingWhitespace = example.match(/^\s+/)[0];
      example = example.replace(new RegExp(leadingWhitespace, 'g'), "\n").replace("\n", '');
      
      templateElement.empty();

      // return the linking function
      return function link (scope, element, attrs) {

        // evaluate the template using a scope
        var html = angular.element(template(scope));
        html.find('code').addClass(attrs.language).text(example);
        html.find('div').append($compile(example)(scope));
        element.append(html);
      }
    }
  };
});