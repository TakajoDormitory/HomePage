function TextTypingAnime(ClassName) {
  ClassName = "." + ClassName;
  $(ClassName).each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var thisChild = "";
    if (scroll >= elemPos - windowHeight) {
      thisChild = $(this).children(); //Get the span tag
      //Add processing for each of the elements in the span tag.
      thisChild.each(function (i) {
        var time = 100;
        //specify a delay to show the time difference, and fadeIn after that time
        $(this)
          .delay(time * i)
          .fadeIn(time);
      });
    } else {
      thisChild = $(this).children();
      thisChild.each(function () {
        $(this).stop(); //stop the delay process
        $(this).css("display", "none"); //span tag hidden
      });
    }
  });
}

// Hide until screen is loaded
$("#container").css("opacity", "0");
// when the screen is loaded
$(window).on("load", function () {
  // Display
  $("#container").css("opacity", "1");
  //Add a span tag
  var element = $(".TextTyping");
  element.each(function () {
    var text = $(this).html();
    var textbox = "";
    text.split("").forEach(function (t) {
      if (t !== " ") {
        textbox += '<span class="typed">' + t + "</span>";
      } else {
        textbox += t;
      }
    });
    $(this).html(textbox);
  });

  // Call a function for animation
  TextTypingAnime("TextTyping");
});
