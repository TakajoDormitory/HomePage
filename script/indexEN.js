


// 以下、お知らせ用

$.getJSON('json/notice.json')
    .done(function (data) {
        $.each(data,function(value){
            $("#notice .list").append('<li><dl><dt>'+value.date+'</dt><dd>'+value.title+'</dd></dl></li>');
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