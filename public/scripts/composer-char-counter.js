$(document).ready(function () {
  // console.log("counter loaded");

  $("textarea").keyup(function () {
    let count = $(this).val().length;

    if (count <= 140) {
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .removeClass("negative-count") /* removing a new class */ 
        .text(140 - count);
        // $(".error-message").hide();
        // $(".error-message").empty();
        $(".error-message").slideUp("slow");
    } else {
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .addClass("negative-count") /* adding a new class that can be used in new-tweet.css to handle color change of counter*/
        .text(140 - count);
        $(".error-message").empty();
        $(".error-message").append('<i class="fas fa-exclamation-triangle"></i> << Your tweet is too long, Plz respect arbitrary limit of 140 chars >> <i class="fas fa-exclamation-triangle"></i>')
        $(".error-message").slideDown("slow");
    }
  });
});
