/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Create HTML elements to display tweets
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
  // console.log($tweet);
  return $tweet;
};

// Loops through all the tweets and creates HTML code for each by calling createTweetElement function
const renderTweets = function(tweets) {
  // $('#tweet-container').replaceWith('<section id ="tweet-container"></section>')
  $('#tweet-container').empty();
  for (tweet of tweets) {
    $('#tweet-container').prepend(createTweetElement(tweet));
  }
};

// Function to prevent "Cross-Site Scripting" (XSS)
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create HTML elements to display errors
const errorMessage = tweetLength => {
  if (tweetLength === 'long') {
    $(".error-message").hide();
    $(".error-message").empty();
    $(".error-message").append('<i class="fas fa-exclamation-triangle"></i> << Your tweet is too long, Plz respect arbitrary limit of 140 chars >> <i class="fas fa-exclamation-triangle"></i>');
    $(".error-message").slideDown("slow");
  } else if (tweetLength === 'empty') {
    $(".error-message").hide();
    $(".error-message").empty();
    $(".error-message").append('<i class="fas fa-exclamation-triangle"></i> << Your tweet is empty >> <i class="fas fa-exclamation-triangle"></i>');
    $(".error-message").slideDown("slow");
  } else {
    $(".error-message").hide();
    $(".error-message").empty();
  }
};

// Ensure page is ready then run any script
$(document).ready(() => {

  // Function to manage textarea for longer tweets
  $("textarea").on("input", function() {
    this.style.height = this.scrollHeight + "px";
  });

  // Function that uses GET method to load tweets using renderTweets and createTweetElement function
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
        console.log("Error on tweet!", error);
      }
    });
  };
  // Defines whats happens after clicking the TWEET button
  $("form").submit(function(event) {
    event.preventDefault();
    // Serialize and decode tweet text espacially blank spaces
    const formData = decodeURIComponent($(this).serialize());

    const formDataLength = formData.length;

    if (formDataLength === 5) {
      errorMessage("empty");
    } else if (formDataLength > 145) {
      errorMessage("long");
    } else {
      // POST the new tweet after validating tweet length
      errorMessage();
      $.ajax({
        url: "/tweets",
        type: 'POST',
        data: formData,
        success: (res) => {
          loadTweets(res);  
        },
        error: (error) => {
          console.log("Error on tweet!", error);
        }
      });
      // .then((res) => {
      //   loadTweets(res);
      // })
      $('textarea').val("");
      $('.counter').val(140)
    }
  });
  loadTweets();
});