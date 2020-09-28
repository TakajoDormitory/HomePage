let v = new URLSearchParams(window.location.search);
v = v.get('search-key');
if(window.location.href="file:///C:/Users/c19ya/main/github/TakajoDormitory/HomePage/index.html"||"file:///C:/Users/c19ya/main/github/TakajoDormitory/HomePage/en/index.html"){
  const urlLists = [
    "index.html",
    "html/contact.html",
    "html/cost.html",
    "html/event.html",
    "html/examinee.html",
    "html/facility.html",
    "html/parent.html",
    "html/purpose.html",
    "html/result.html",
  ];
}
else if(window.location.href="file:///C:/Users/c19ya/main/github/TakajoDormitory/HomePage/en/belonging/index.html"){
  const urlLists = [
    "../index.html",
    "../contact.html",
    "../cost.html",
    "../event.html",
    "../examinee.html",
    "../facility.html",
    "../parent.html",
    "../purpose.html",
    "../result.html",
    ];
}
else if(window.location.href=""){
  const urlLists = [
    "index.html",
    "html/contact.html",
    "html/cost.html",
    "html/event.html",
    "html/examinee.html",
    "html/facility.html",
    "html/parent.html",
    "html/purpose.html",
    "html/result.html",
    ];
}
else{
  const urlLists = [
    "../index.html",
    "contact.html",
    "cost.html",
    "event.html",
    "examinee.html",
    "facility.html",
    "parent.html",
    "purpose.html",
    "result.html",
    ];
}
    $.each(urlLists, function(i){
        $.ajax({
          url　: urlLists[i],
          dataType : 'html',
          success　: function(data){
            if( $(data).find("#article").text().indexOf(v) !== -1){
              $('<li><a href="' + urlLists[i] + '">' +$(data).find("h1").text() + '</a></li>').appendTo('ul');
              }
            },
            error: function(data){
              console.log("error")
            }
          });
    });