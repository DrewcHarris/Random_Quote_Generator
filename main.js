$(document).ready(function() {

  var quote;
  var author;

  function getNewQuote() {
    $.ajax({
      url: 'http://api.forismatic.com/api/1.0/',
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data: {
        method: 'getQuote',
        lang: 'en',
        format: 'jsonp'
      },
      success: function(response){
        quote = ('\"' +  response.quoteText + '\"' + " ");
        author = response.quoteAuthor;
        $('#instructions').text('');
        $('#quote').text(quote );
        if (author) {
          $('#author').text('--' + author);
          author = ('--' + author)
        } else {
          $('#author').text('--unknown');
          author = ('--unknown');
        }
      }
    });
    $('#tweetQuoteButton').prop('disabled', false);
  }

  $('#getQuoteButton').on('click', function(event) {
    event.preventDefault();
    getNewQuote();
  });

  $('#tweetQuoteButton').on('click', function(event) {
    event.preventDefault();
    window.open('https://twitter.com/intent/tweet/?text=' + encodeURIComponent(quote + author));
  });

});
