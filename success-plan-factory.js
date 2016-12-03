var SuccessPlanFactory = (function($) {

  var init = function() {
    $('#add-action').on('click', addAction)
    $('#generate-success-plan').on('click', generateYAML);
  };

  var addAction = function() {
    ComponentBuilder.generateComponent();
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

      if(data['action-know-more'][i] !== '') {
        yaml += '  ' + data['action-key'][i] + '_know_more: ' + data['action-know-more'][i] + '\n';
      }
      if(data['action-know-more-cta'][i] !== '') {
        yaml += '  ' + data['action-key'][i] + '_know_more_cta: ' + data['action-know-more-cta'][i] + '\n';
      }
      if(data['action-know-more-cta-url'][i] !== '') {
        yaml += '  ' + data['action-key'][i] + '_know_more_cta_url: ' + data['action-know-more-cta-url'][i] + '\n';
      }
      if(data['action-know-more-video-url'][i] !== '') {
        yaml += '  ' + data['action-key'][i] + '_know_more_video_url: ' + data['action-know-more-video-url'][i] + '\n';
      }
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
