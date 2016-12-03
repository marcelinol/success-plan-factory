var ComponentBuilder = (function($) {

  var generateComponentProperties = function(properties) {
    return {
      textInputLabel: {
        tag: 'label',
        properties: {
          for: properties.labelName,
          text: properties.labelText
        }
      },
      textInput: {
        tag: 'input',
        properties: {
          type: 'text',
          name: properties.textInputName,
          class: 'form-control',
          placeholder: properties.textInputPlaceholder
        }
      },
      hiddenInput: {
        tag: 'input',
        properties: {
          type: 'hidden',
          name: properties.textInputName + '-suffix',
          class: '',
          value: properties.hiddenInputValue,
          placeholder: ''
        }
      }
    }
  };

  var $components = {
    actionTitle: generateComponentProperties({
      labelName: 'action-title',
      labelText: 'Título da Ação',
      textInputName: 'action-title',
      textInputPlaceholder: '',
      hiddenInputValue: ''
    }),
    actionKey: generateComponentProperties({
      labelName: 'action-key',
      labelText: 'Chave para essa ação (será usada no código e não pode se repetir)',
      textInputName: 'action-key',
      textInputPlaceholder: 'short_title',
      hiddenInputValue: ''
    }),
    actionDescription: generateComponentProperties({
      labelName: 'action-description',
      labelText: 'Descrição da Ação',
      textInputName: 'action-description',
      textInputPlaceholder: '',
      hiddenInputValue: '_description'
    }),
    actionKnowMore: generateComponentProperties({
      labelName: 'action-know-more',
      labelText: '"Saiba Mais" da Ação',
      textInputName: 'action-know-more',
      textInputPlaceholder: '',
      hiddenInputValue: '_know_more'
    }),
    actionKnowMoreCTA: generateComponentProperties({
      labelName: 'action-know-more-cta',
      labelText: 'Texto do CTA da Ação',
      textInputName: 'action-know-more-cta',
      textInputPlaceholder: '',
      hiddenInputValue: '_know_more_cta'
    }),
    actionKnowMoreCTAURL: generateComponentProperties({
      labelName: 'action-know-more-cta-url',
      labelText: 'Link do CTA da Ação',
      textInputName: 'action-know-more-cta-url',
      textInputPlaceholder: '',
      hiddenInputValue: '_know_more_cta_url'
    }),
    actionKnowMoreVideoURL: generateComponentProperties({
      labelName: 'action-know-more-video-url',
      labelText: 'Link para o vídeo da Ação',
      textInputName: 'action-know-more-video-url',
      textInputPlaceholder: '',
      hiddenInputValue: '_know_more_video_url'
    })
  };

  var generateElement = function(tag, properties) {
    var element = $("<" + tag + "/>");
    $.each(properties, function(attrName, attrValue) {
      if(attrName == 'text')
        element.text(attrValue)
      else
        element.attr(attrName, attrValue);
    });
    return element;
  };

  var generateComponent = function() {
    var mainDiv = generateElement('div', { class: 'row' })
    var componentTitle = generateElement('p', {
       class: 'text-center lead',
       text: 'Dados da Ação'
    });
    componentTitle.appendTo(mainDiv);
    var componentsLength = Object.keys($components).length;
    $.each($components, function(component, elements) {
      var div = generateElement('div', { class: 'form-group' })
      $.each(elements, function(element, elementProperties) {
        var element = generateElement(elementProperties.tag, elementProperties.properties);
        element.appendTo(div);
      });
      div.appendTo(mainDiv);
    });
    mainDiv.appendTo(document.getElementById('form-inputs'));
  };

  return {
    generateComponent : generateComponent
  };

})(jQuery);
