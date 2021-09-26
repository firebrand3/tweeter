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
          ${obj.content.text}
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
      alert("tweet is empty")
    }else if (formDataLength > 145) {
      alert("exceeded max charcter limit of 140")
    } else {
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
  });

    loadTweets();
});