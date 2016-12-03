var ComponentBuilder = (function($) {

  var $components = {
    actionTitle: {
      divClass: 'form-group',
      labelName: 'action-title',
      labelText: 'Título da Ação',
      inputType: 'text',
      inputName: 'action-title',
      inputClass: 'form-control',
      inputPlaceholder: ''
    },
    actionKey: {
      divClass: 'form-group',
      labelName: 'action-key',
      labelText: 'Chave para essa ação (será usada no código e não pode se repetir)',
      inputType: 'text',
      inputName: 'action-key',
      inputClass: 'form-control',
      inputPlaceholder: 'short_title'
    },
    actionDescription: {
      divClass: 'form-group',
      labelName: 'action-description',
      labelText: 'Descrição da Ação',
      inputType: 'text',
      inputName: 'action-description',
      inputClass: 'form-control',
      inputPlaceholder: ''
    },
    actionKnowMore: {
      divClass: 'form-group',
      labelName: 'action-know-more',
      labelText: '"Saiba Mais" da Ação',
      inputType: 'text',
      inputName: 'action-know-more',
      inputClass: 'form-control',
      inputPlaceholder: ''
    },
    actionKnowMoreCTA: {
      divClass: 'form-group',
      labelName: 'action-know-more-cta',
      labelText: 'Texto do CTA da Ação',
      inputType: 'text',
      inputName: 'action-know-more-cta',
      inputClass: 'form-control',
      inputPlaceholder: ''
    },
    actionKnowMoreCTAURL: {
      divClass: 'form-group',
      labelName: 'action-know-more-cta-url',
      labelText: 'Link do CTA da Ação',
      inputType: 'text',
      inputName: 'action-know-more-cta-url',
      inputClass: 'form-control',
      inputPlaceholder: ''
    },
    actionKnowMoreVideoURL: {
      divClass: 'form-group',
      labelName: 'action-know-more-video-url',
      labelText: 'Link para o vídeo da Ação',
      inputType: 'text',
      inputName: 'action-know-more-video-url',
      inputClass: 'form-control',
      inputPlaceholder: ''
    }
  };

  var generateDiv = function(klass) {
    return $("<div/>").attr('class', klass);
  };

  var generateText = function(klass, text) {
    return $("<p/>")
      .attr('class', klass)
      .text(text);
  };

  var generateInput = function(type, name, klass, placeholder) {
    return $("<input/>")
      .attr('type', type)
      .attr('name', name)
      .attr('class', klass)
      .attr('placeholder', placeholder);
  };

  var generateLabel = function(name, text) {
    return $("<label/>")
      .attr('for', name)
      .text(text);
  };

  var generateActionTitleFormGroup = function() {
    var div = generateDiv('form-group');
    var label = generateLabel('action-title', 'Título da Ação');
    var input = generateTextInput('action-title');
    label.appendTo(div);
    input.appendTo(div);
    div.appendTo(document.getElementById('form-inputs'));
  };

  var generateComponent = function() {
    var mainDiv = generateDiv('row');
    var componentTitle = $("<p/>").attr('class', 'text-center lead').text('Dados da Ação');
    componentTitle.appendTo(mainDiv);
    var componentsLength = Object.keys($components).length;
    $.each($components, function(component, properties) {
      var div = generateDiv(properties.divClass);
      var label = generateLabel(properties.labelName, properties.labelText);
      var input = generateInput(properties.inputType, properties.inputName, properties.inputClass, properties.inputPlaceholder);
      label.appendTo(div);
      input.appendTo(div);
      div.appendTo(mainDiv);
    });
    mainDiv.appendTo(document.getElementById('form-inputs'));
  };

  return {
    generateComponent : generateComponent
  };

})(jQuery);
