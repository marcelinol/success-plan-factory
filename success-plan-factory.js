var SuccessPlanFactory = (function($) {

  var init = function() {
    $('#add-action').on('click', function() {
      $('.collapse.in').collapse('hide');
      addAction();
    });
    $('#generate-success-plan').on('click', generateYAML);
  };

  var addAction = function() {
    ComponentBuilder.generateComponent();
  };

  var suffixedValues = [
    'action-know-more',
    'action-know-more-cta',
    'action-know-more-cta-url',
    'action-know-more-video-url'
  ];

  var addSuffixedValues = function(data, dataIndex, yaml) {
    for(var i = 0; i < suffixedValues.length; i++) {
      var currentSuffixedValue = data[suffixedValues[i]][dataIndex]
      if(currentSuffixedValue !== '')
        yaml += '  ' + data['action-key'][dataIndex] + data[suffixedValues[i] + '-suffix'][dataIndex] + ': ' + data['action-know-more'][dataIndex] + '\n';
    }
    return yaml;
  };

  var generateYAML = function(e) {
    e.preventDefault();
    var data = $('form').serializeObject();
    var yaml = data['success-plan-key'] + ': ' + data["success-plan-title"] + '\n' +
               data['success-plan-key'] + '_description: ' + data['success-plan-description'] + '\n';
    var actionsLength = data['action-title'].length
    for(var i = 0; i < actionsLength; i++) {
      yaml += '  ' + data['action-key'][i] + ': ' + data['action-title'][i] + '\n' +
              '  ' + data['action-key'][i] + '_description: ' + data['action-description'][i] + '\n';
      yaml = addSuffixedValues(data, i, yaml)
    }
    $('#yaml').text(yaml);
    window.scrollTo(0,document.body.scrollHeight);
  }

  return {
    init : init
  };
})(jQuery);

$(document).ready(function() {
  SuccessPlanFactory.init();
})
