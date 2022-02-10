// Change relative paths between English and Japanese pages
if (htmlName[htmlName.length - 2] == "english") {
  jsonPath = "../../../assets/json/notice.json";
} else {
  jsonPath = "assets/json/notice.json";
}

// Get the window aspect ratio
let screenHeight, screenWidth, widthRaito;
screenHeight = window.innerHeight;
screenWidth = window.innerWidth;
widthRaito = screenWidth / screenHeight;

// Optimize the size of the video
function movieResize() {
  if (screenWidth < 1150) {
    // the height of the video can be half of the window height
    if (widthRaito > 0.8) {
      $("#video-area").css({ height: "56.25vw" });
      $("#video").css({ width: "100vw" });
      $("#video-area h1").css({ top: "40vw" });
    } else {
      $("#video-area").css({ height: "50vh" });
      $("#video").css({ height: "50vh" });
      $("#video-area h1").css({ top: "35vh" });
    }
  }
}

$(function () {
  // Adjust video size when resizing window
  movieResize();
  var timer = "";
  $(window).on("resize", function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      movieResize();
    }, 200);
  });

  // Obtain and display notification information
  $.getJSON(jsonPath, function (data) {
    for (let i = data.length - 1; i >= 0; i--) {
      if (!(data[i].href.slice(0, 4) == "http")) {
        if (htmlName[htmlName.length - 2] == "english") {
          notice_path = "../notice/" + data[i].href + ".html";
        } else {
          notice_path = "pages/notice/" + data[i].href + ".html";
        }
      } else {
        notice_path = data[i].href;
      }
      $("#list").append(
        $(
          "<li><dl><dt>" +
            data[i].date +
            '</dt><dd><a href="' +
            notice_path +
            '">' +
            data[i].title +
            "</a></dd></dl></li>"
        )
      );
    }
  });

  // Change the color of header elements
  let header = $("#header h1,#header i");
  let nav = $("#wrapper .btn-gnavi span");
  $(window).scroll(function () {
    // Hide the button that prompts for scrolling
    if ($(this).scrollTop() > videoArea.height() - window.innerHeight) {
      $(".scroll_down").css({ transition: "all  1.0s ease", opacity: 0 });
    } else {
      $(".scroll_down").css({ opacity: 1 });
    }
    // scrolling below video
    if ($(this).scrollTop() > videoArea.height() - 150) {
      header.css({ transition: "all  1.0s ease", color: "#000" });
      nav.css({ transition: "all  1.0s ease", "background-color": "#000" });
      $("#header").css({
        transition: "all  1.0s ease",
        "background-color": "#FFF",
      });
    } else {
      header.css({ color: "#FFF" });
      nav.css({ "background-color": "#FFF" });
      $("#header").css({ "background-color": "rgba(0,0,0,0)" });
    }
  });

  // Load a youtube iframe when the image is pressed
  $(".youtube").each(function () {
    var iframe = $(this).children("iframe");
    var url = iframe.attr("data-src");
    var id = url.match(/[\/?=]([a-zA-Z0-9_-]{11})[&\?]?/)[1];
    iframe
      .before(
        '<img id="inner-video" src="http://img.youtube.com/vi/' +
          id +
          '/mqdefault.jpg" />'
      )
      .remove();
    $(this).on("click", function () {
      $(this)
        .after(
          '<div class="youtube"><iframe id="inner-video" src="https://www.youtube.com/embed/' +
            id +
            '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
        )
        .remove();
      $("#movie h3").remove();
    });
  });

  // slider
  let imgList;
  if (htmlName[htmlName.length - 2] == "english") {
    imgList = [
      "../../assets/images/OverView.jpg",
      "../../assets/images/EntranceCeremony.JPG",
      "../../assets/images/Firework.JPG",
      "../../assets/images/soccer.jpg",
    ];
  } else {
    imgList = [
      "assets/images/OverView.jpg",
      "assets/images/EntranceCeremony.JPG",
      "assets/images/Firework.JPG",
      "assets/images/soccer.jpg",
    ];
  }

  // add image and navigation buttons
  for (let i = 0; i < imgList.length; i++) {
    // Embed image tags in the li element
    let slide = document.createElement("li");
    if (window.innerWidth < 1450)
      slide.innerHTML = "<img width=100% src='" + imgList[i] + "'>";
    else
      slide.innerHTML =
        "<img width='800px' height='450px' src='" + imgList[i] + "'>";
    // Add the li as a child element
    document.getElementsByClassName("slider-inner")[0].appendChild(slide);

    // get the li element
    let nav = document.createElement("li");
    // Assign a numerical value
    nav.setAttribute("data-nav-index", i);
    // Add the li as a child element
    document.getElementsByClassName("nav")[0].appendChild(nav);
  }

  // Get the number of slides (-1 for processing)
  let length = imgList.length - 1;
  // Store a single element of an image
  let imageSlide = document
    .getElementsByClassName("slider-inner")[0]
    .getElementsByTagName("li");
  // Store one element of the dot navigation
  let dotNavigation = document
    .getElementsByClassName("nav")[0]
    .getElementsByTagName("li");
  // index number
  let nowIndex = 0;
  imageSlide[nowIndex].classList.add("show");
  dotNavigation[nowIndex].classList.add("current");
  // flag that slide is in animation
  let isChanging = false;
  // function called when switching slides
  function sliderSlide(val) {
    if (isChanging === true) {
      return false;
    }
    isChanging = true;
    // Remove the class name from the currently displayed image and nav
    imageSlide[nowIndex].classList.remove("show");
    dotNavigation[nowIndex].classList.remove("current");
    nowIndex = val;
    // Set the current class
    imageSlide[nowIndex].classList.add("show");
    dotNavigation[nowIndex].classList.add("current");
    // Set the status of changing to false
    slideTimer = setTimeout(function () {
      isChanging = false;
    }, 600);
  }

  //start automatic slide feed
  function startInterval() {
    Interval = setInterval(slideRight, 4000);
  }

  //Start automatic slide feed
  startInterval();

  // Automatic feed stop on hover to image and navigation
  $("#slider img").hover(
    function () {
      clearInterval(Interval);
    },
    function () {
      startInterval();
    }
  );

  // Create an event
  for (let i = 0; i < dotNavigation.length; i++) {
    // Slide based on the index number
    dotNavigation[i].addEventListener(
      "click",
      function () {
        let index = Number(this.getAttribute("data-nav-index"));
        sliderSlide(index);
      },
      false
    );
  }

  // Left arrow navigation is clicked
  $("#arrow-prev").on("click", function () {
    clearInterval(Interval);
    slideLeft();
    startInterval();
  });
  // Right arrow navigation is clicked
  $("#arrow-next").on("click", function () {
    clearInterval(Interval);
    slideRight();
    startInterval();
  });

  // Swipe
  // finger touches it
  $("#slider img").on("touchstart", startSwipe);

  // finger moving
  $("#slider img").on("touchmove", Swiping);

  // finger leaves it
  $("#slider img").on("touchend", endSwipe);

  var moveX, posiX;
  // finger leaves it
  function startSwipe(event) {
    // Get the current position of the finger
    posiX = getX(event);
    // Result variable
    moveX = "";
  }

  // finger moving
  function Swiping(event) {
    // Swipe at least 70px from right to left
    if (posiX - getX(event) > 70) {
      moveX = "left";
    }
    // Swipe at least 70px from left to right
    else if (posiX - getX(event) < -70) {
      moveX = "right";
    }
  }

  // finger leaves it
  function endSwipe(event) {
    // moving to the left
    if (moveX == "left") {
      clearInterval(Interval);
      slideRight();
      startInterval();
    }
    // moving to the right
    else if (moveX == "right") {
      clearInterval(Interval);
      slideLeft();
      startInterval();
    }
  }

  // Function to slide to the left
  function slideLeft() {
    let index = nowIndex - 1;
    if (index < 0) {
      index = length;
    }
    sliderSlide(index);
  }

  // Function to slide to the right
  function slideRight() {
    let index = nowIndex + 1;
    if (index > length) {
      index = 0;
    }
    sliderSlide(index);
  }

  //Get the horizontal coordinates
  function getX(event) {
    return event.originalEvent.touches[0].pageX;
  }
});
