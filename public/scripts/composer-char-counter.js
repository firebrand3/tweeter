$(document).ready(function () {
  // console.log("counter loaded");

  $("textarea").keydown(function () {
    let count = $(this).val().length;

    if (count <= 140) {
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .removeClass("negative-count") /* removing a new class */ 
        .text(140 - count);
    } else {
      $(this)
        .closest(".new-tweet")
        .find(".counter")
        .addClass("negative-count") /* adding a new class that can be used in new-tweet.css to handle color change of counter*/
        .text(140 - count);
    }
  });
});
