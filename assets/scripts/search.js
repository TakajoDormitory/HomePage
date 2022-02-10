let v = new URLSearchParams(window.location.search);
let search = v.get("search-key");

// with and without search terms
found_flag = false;

if (htmlName[htmlName.length - 2] == "english") {
  urlLists = [
    "env.html",
    "contact.html",
    "cost.html",
    "event.html",
    "facility.html",
    "it.html",
    "location.html",
    "meet.html",
    "purpose.html",
    "safety.html",
    "site.html",
    "student.html",
    "studying.html",
  ];
} else {
  urlLists = [
    "endeavors/env.html",
    "endeavors/it.html",
    "endeavors/meet.html",
    "endeavors/safety.html",
    "endeavors/studying.html",
    "contact.html",
    "cost.html",
    "event.html",
    "facility.html",
    "location.html",
    "purpose.html",
    "site.html",
    "student.html",
  ];
}

$.each(urlLists, function (i) {
  $.ajax({
    url: urlLists[i],
    dataType: "html",
    success: function (data) {
      if ($(data).find("p").text().indexOf(search) !== -1) {
        found_flag = true;
        console.log($(data).find("p").text());
        // Generate sentences containing keywords.
        let sentence = "";
        if (htmlName[htmlName.length - 2] == "english") {
          before_sentence = $(data)
            .find("p")
            .text()
            .split("About this site")[0];
        } else {
          before_sentence = $(data)
            .find("p")
            .text()
            .split("このサイトについて")[0];
        }
        for (let i = 0; i < before_sentence.split(search).length; i++) {
          sentence += before_sentence.split(search)[i];
          if (i != $(data).find("p").text().split(search).length - 1)
            sentence += "<span style='font-weight:bold'>" + search + "</span>";
        }
        // Extract title information
        for (let i = 47; i < $(data).length; i++) {
          if ($(data)[i].toString() == "[object HTMLTitleElement]") {
            title_index = i;
            break;
          }
        }
        found_flag = true;
        $(
          '<div class="result-box"><a href="' +
            urlLists[i] +
            '"><p class="box-title">' +
            $(data)[title_index].innerHTML.split("|")[0] +
            "</p></a><br><p>" +
            sentence +
            "</p></div>"
        ).appendTo("#result");
      }
    },
    error: function (data) {
      console.log("error");
    },
  });
});
