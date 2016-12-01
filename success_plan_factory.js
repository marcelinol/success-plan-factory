var SuccessPlanFactory = (function($) {

  $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };

  var init = function() {
    $('#add-action').on('click', addAction)
    $('#generate-success-plan').on('click', generateYAML);
  };

  var addAction = function() {
    var div = document.createElement('div');

    div.className = 'row';
    div.innerHTML = '<p class="text-center lead">Dados da Ação</p>\                   <div class="form-group">\                     <label for="action-title">Título da Ação</label>\                     <input type="text" name="action-title" class="form-control" value="" required="true">\                   </div>\
                   <div class="form-group">\                     <label for="success-plan-key">Chave para essa ação (será usada no código e não pode se repetir)</label>\                     <input type="text" name="action-key" placeholder="action_short_title" class="form-control" required="true" value="short_title">\                   </div>\
                   <div class="form-group">\                     <label for="action-description">Descrição da Ação</label>\                     <input type="text" name="action-description" class="form-control" value="" required="true">\                   </div>\
                   <div class="form-group">\                     <label for="action-know-more">"Saiba Mais" da Ação</label>\                     <input type="text" name="action-know-more" class="more form-control" value="">\                   </div>\
                   <div class="form-group">\                     <label for="action-know-more-cta">Texto do CTA da Ação</label>\                     <input type="text" name="action-know-more-cta" class="form-control" value="">\                   </div>\
                   <div class="form-group">\                     <label for="action-know-more-cta-url">Link do CTA da Ação</label>\                     <input type="text" name="action-know-more-cta-url" class="form-control" value="">\                   </div>\
                   <div class="form-group">\                     <label for="action-know-more-video-url">Link para o vídeo da Ação</label>\                     <input type="text" name="action-know-more-video-url" class="form-control" value="">\                   </div>';

      document.getElementById('form-inputs').appendChild(div);
  };

  var generateYAML = function(e) {
    e.preventDefault();
    var data = $('form').serializeObject();
    var yaml = data['success-plan-key'] + ': ' + data["success-plan-title"] + '\n' +
               data['success-plan-key'] + '_description: ' + data['success-plan-description'] + '\n';
    var actionsLength = data['action-title'].length
    for(var i = 0; i < actionsLength; i++) {
      debugger;
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
