var SuccessPlanFactory = (function($) {

  var init = function() {
    $('#add-action').on('click', function() {
      $('.collapse.in').collapse('hide');
      addAction();
    });
    $('#generate-success-plan').on('click', function(e) {
      e.preventDefault();
      var data = $('form').serializeObject();
      generateYAML(data, '#yaml-pt');
      generateTranslatedYAML('en');
      generateTranslatedYAML('es');
    });
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

  var toTranslate = [
    'success-plan-title',
    'success-plan-description',
    'action-title',
    'action-description',
    'action-know-more',
    'action-know-more-cta'
  ];


  var generateTranslatedYAML = function(language) {
    var formData = $('form').serializeObject();
    var texts = [];
    $.each(toTranslate, function(index, value) {
      var array = formData[value];
      for(var x = 0; x < array.length; x++) {
        array[x] = value + 'Ω ' + array[x]
      };
      texts = texts.concat(array);
    });
    Translator.translate('pt-' + language, texts, function(data) {
      $.each(toTranslate, function(index, value) {
        formData[value] = '';
      });
      $.each(data.text, function(index, text) {
        var info = text.split('Ω ')[0];
        var translatedText = text.split('Ω ')[1];
        if(formData[info] === '') {
          formData[info] = translatedText;
        } else {
          formData[info] = [formData[info]].concat([translatedText])
        }
      });

      generateYAML(formData, '#yaml-' + language)
    });
  };

  var generateYAML = function(data, componentId) {
    var yaml = data['success-plan-key'] + ': ' + data["success-plan-title"] + '\n' +
               data['success-plan-key'] + '_description: ' + data['success-plan-description'] + '\n';
    var actionsLength = data['action-title'].length
    for(var i = 0; i < actionsLength; i++) {
      yaml += '  ' + data['action-key'][i] + ': ' + data['action-title'][i] + '\n' +
              '  ' + data['action-key'][i] + '_description: ' + data['action-description'][i] + '\n';
      yaml = addSuffixedValues(data, i, yaml)
    }
    $(componentId).text(yaml);
    window.scrollTo(0,document.body.scrollHeight);
  }

  return {
    init : init
  };
})(jQuery);

$(document).ready(function() {
  SuccessPlanFactory.init();
})
