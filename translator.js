var Translator = (function($) {
  var $APIKey = 'trnsl.1.1.20161203T044047Z.97d936ae06a46a69.87123cc0a1fe2d18308f9e7cd42bf952310defa2';

  var translate = function(language, texts, callback) {
    var params = '?key=' + $APIKey + '&lang=' + language;
    for(var i = 0; i < texts.length; i++) {
      params += '&text=' + texts[i];
    };
    $.getJSON("https://translate.yandex.net/api/v1.5/tr.json/translate" + params, {},  callback);
  };

  return {
    translate : translate
  }
})(jQuery);
