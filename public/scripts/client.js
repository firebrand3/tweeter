/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(obj) {
// const $tweet = $(`<article class="tweet">Hello world</article>`);
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


// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


const renderTweets = function(tweets) {
  for (obj of tweets) {
    $('#tweet-container').append(createTweetElement(obj))
  }
}


// $('#tweet-container').append($(`<article class="tweet">Hello world</article>`))
$(document).ready(() => {
  // const loadTweets = $.get("/tweets", function(data) {
    // alert(loadTweets);
    const loadTweets = $.ajax("/tweets", { method: 'GET' })
    .then(function (data) {
      // console.log('Success: ', data);
      renderTweets(data);
    });
    // renderTweets(data)
  // })
  

  $("form").submit(function(event) {
    event.preventDefault();
    // alert( $( this ).serialize() );
    const formData = $(this).serialize();
    // alert( "Handler for .submit() called." );
    const formDataLength = formData.length
    console.log(formDataLength)

    if (formDataLength === 5) {
      alert("tweet is empty")
    }else if (formDataLength > 145) {
      alert("exceeded max charcter limit of 140")
    } else {
      const posting = $.post("/tweets", formData)
      // console.log(posting)
      // renderTweets(posting);
    //  
    }
    
  });

});