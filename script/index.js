// お知らせ

$.getJSON('json/notice.json')
    .done(function (data) {
        console.log("GetData!");
        console.log(data);
        $.each(data,function(value){
            $("#notice .list").append('<li><dl><dt>'+value.date+'</dt><dd><a href="html/notice/'+value.href+'.html">'+value.title+'</a></dd></dl></li>');
        });
});

// topボタン
$(function() {
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
});
