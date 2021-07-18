$(function(){
    $.getJSON("json/notice.json",function(data){
        console.log(data);
        for(let i=data.length-1;i>=0;i--){
        $("#list").append($('<li><dl><dt>'+data[i].date+'</dt><dd><a href="html/notice/'+data[i].href+'.html">'+data[i].title+'</a></dd></dl></li>'));
    }
});

// トップへ戻るボタン
let pagetop = $('#page_top');   
pagetop.hide();
$(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
        pagetop.fadeIn();
    }
    else {
        pagetop.fadeOut();
    }
});
pagetop.click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500); //0.5秒でトップへ移動
    return false;
});

// header
let header = $('#header');
let videoArea= $('#video-area');
$(window).scroll(function () {
    if ($(this).scrollTop() > videoArea.height()-150) {
        header.css({'background-color':'rgba(0, 0, 0, 0.75)','transition':'0.5s'});
    }
    else {
        header.css({'background-color':'rgba(0, 0, 0, 0)'});
    }
});
});