var ComponentBuilder = (function($) {
  var $actionsCounter = 0;

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

  var generateActionHeader = function() {
    var actionId, upperDiv, componentTitle, collapseLink, mainDiv;
    actionId = 'action-' + $actionsCounter;
    upperDiv = generateElement('div', { class: 'panel panel-default' })
    componentTitle = generateElement('div', {
       class: 'panel-heading lead',
    });
    collapseLink = generateElement('a', {
      href: '#' + actionId,
      'data-toggle': 'collapse',
      text: 'Ação ' + $actionsCounter
    });
    collapseLink.appendTo(componentTitle);
    componentTitle.appendTo(upperDiv);
    mainDiv = generateElement('div', { id: actionId , class: 'panel-body collapse in' })
    mainDiv.appendTo(upperDiv);
    return [upperDiv, mainDiv]
  };

  var generateComponent = function() {
    var header, upperDiv, mainDiv, componentsLength, element;
    header = generateActionHeader();
    upperDiv = header[0];
    mainDiv = header[1];
    componentsLength = Object.keys($components).length;
    $.each($components, function(component, elements) {
      div = generateElement('div', { class: 'form-group' })
      $.each(elements, function(element, elementProperties) {
        element = generateElement(elementProperties.tag, elementProperties.properties);
        element.appendTo(div);
      });
      div.appendTo(mainDiv);
    });
    upperDiv.appendTo(document.getElementById('form-inputs'));
    $actionsCounter++;
  };

  return {
    generateComponent : generateComponent
  };

})(jQuery);
