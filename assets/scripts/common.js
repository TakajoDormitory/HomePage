// autoset the value of og:url
let metaDiscre = document.head.children;
let metaLength = metaDiscre.length;
for (let i = 0; i < metaLength; i++) {
  let proper = metaDiscre[i].getAttribute("property");
  if (proper === "og:url") {
    let dis = metaDiscre[i];
    dis.setAttribute("content", location.href);
  }
}

// back to top
let pagetop = $("#page_top");
pagetop.hide();

// get the file name
let htmlName = location.href.split("/");
// determine index
let onIndex = false;
if (
  htmlName[htmlName.length - 1] == "index.html" ||
  htmlName[htmlName.length - 1] == "index.html#" ||
  htmlName[htmlName.length - 1] == ""
) {
  onIndex = true;
}

let nav = $("#wrapper .btn-gnavi span");
let videoArea = $("#video-area");
// mouse Y coordinate
let mouseY = 0;

$(function () {
  // Back to Top Button
  $(window).scroll(function () {
    // Display when the scroll position reaches 150
    if ($(this).scrollTop() > 150) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    // 0.5 seconds to top
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });

  // humberger menu
  $(".btn-gnavi,.fa-search").on("click", function () {
    // content location
    let rightVal = 0;
    // if it's open, close it.
    if ($(".btn-gnavi").hasClass("open")) {
      // remove scroll restriction
      $("html").css({ "overflow-y": "visible" });
      // slow down the animation speed
      nav.css({ transition: "all  1.0s ease" });
      // get Y coordinate of mouse, fade in button
      if (onIndex) {
        document.addEventListener("mousemove", function (e) {
          mouseY = e.pageY;
        });
        if (mouseY > videoArea.height() - window.innerHeight * 0.2)
          pagetop.fadeIn();
      } else {
        pagetop.fadeIn();
      }
      if (!onIndex || (onIndex && mouseY > videoArea.height())) {
        nav.css({ "background-color": "#000" });
      }
      rightVal = -300;
      $(this).removeClass("open");
    }
    // if it's close, open it.
    else {
      $(".btn-gnavi").addClass("open");
      // cursor move to the search field
      if ($(this).hasClass("fa-search")) {
        $("#input").focus();
      }
      // set scroll restriction
      $("html").css({ "overflow-y": "hidden" });
      $("#wrapper").css({ "overflow-y": "visible" });
      nav.css({ transition: "all  0.3s ease" });
      // change backgroundcolor to white
      nav.css({ "background-color": "#FFF" });
      // fadeout button
      pagetop.fadeOut();
    }

    $("#bar").stop().animate(
      {
        right: rightVal,
      },
      200
    );
  });

  // autoset location link
  $("#fb-share").attr({
    href: "http://www.facebook.com/share.php?u=" + location.href,
  });

  $("#tw-share").attr({
    href:
      "https://twitter.com/intent/tweet?text=" +
      document.title.split("|")[0] +
      " " +
      location.href,
  });

  $("#line-share").attr({
    href:
      "https://line.me/R/msg/text/?" +
      document.title +
      "%0D%0A" +
      location.href,
  });

  // autoset copyright year
  $("#copyright").html(
    "&copy; 2020-" +
      new Date().getFullYear() +
      " TakajoDormitory All Rights Reserved."
  );
});
