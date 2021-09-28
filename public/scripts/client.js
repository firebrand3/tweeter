/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(obj) {
const $tweet = `  
  <article>
        <header>
          <div class="profile"><img src=${obj.user.avatars}></div>
          <div class="username">${obj.user.name}</div>
          <div class="userid">${obj.user.handle}</div>
        </header>
        <main class="tweet-body">
        ${escape(obj.content.text)}
        </main>
        <footer>
        <div class="timestamp">${timeago.format(obj.created_at)}</div>
          <div class="tweet-action">
            <i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
          </div>
        </footer>
  </article>
    `;
  console.log($tweet)
  return $tweet;
}


const renderTweets = function(tweets) {
  // $('#tweet-container').replaceWith('<section id ="tweet-container"></section>')
  $('#tweet-container').empty();
  for (obj of tweets) {
    $('#tweet-container').prepend(createTweetElement(obj))
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const errorMessage = tweetLength => {
  if (tweetLength === 'long') {
    $(".error-message").hide();
    $(".error-message").empty();
    $(".error-message").append('<i class="fas fa-exclamation-triangle"></i> << Your tweet is too long, Plz respect arbitrary limit of 140 chars >> <i class="fas fa-exclamation-triangle"></i>')
    $(".error-message").slideDown("slow");
  } else if (tweetLength === 'empty') {
    $(".error-message").hide();
    $(".error-message").empty();
    $(".error-message").append('<i class="fas fa-exclamation-triangle"></i> << Your tweet is empty >> <i class="fas fa-exclamation-triangle"></i>')
    $(".error-message").slideDown("slow");
  } else {
    $(".error-message").hide();
    $(".error-message").empty();
  }
}


$(document).ready(() => {

  // const loadTweets = function() {
  //   $.get("/tweets", function(data) {
  //   console.log(data)
  //   renderTweets(data);
  //   });
  // }
    const loadTweets = function() {
      $.ajax({
        url: "/tweets",
        type: 'GET',
        dataType: 'JSON',
        success: (res) => {
          // console.log(res)
          renderTweets(res);
        },
      error: (error) => {
        alert("Error on tweet!", error);
      }  
      });
    }
  $("form").submit(function(event) {
    event.preventDefault();
    // alert( $( this ).serialize() );
    const formData = $(this).serialize();
    // alert( "Handler for .submit() called." );
    const formDataLength = formData.length

    if (formDataLength === 5) {
      // alert("tweet is empty")
      errorMessage("empty")
    }else if (formDataLength > 145) {
      errorMessage("long")
      // alert("exceeded max charcter limit of 140")
    } else {
      errorMessage();
     // $.post("/tweets", formData)
      $.ajax({
        url: "/tweets",
        type: 'POST',
        data: formData,
      }).then((res) => {
        // renderTweets(res);
        loadTweets(res);
        }); 
      };
      $('textarea').val("")
  });

    loadTweets();
});