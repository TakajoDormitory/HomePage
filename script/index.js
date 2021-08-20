// htmlNameはcommon.jsで定義済み
if (htmlName[htmlName.length - 2] == 'en') {
    jsonPath = '../json/notice.json';
}
else {
    jsonPath = 'json/notice.json';
}

$(function () {
    // notice.jsonからお知らせ情報を取得
    $.getJSON(jsonPath, function (data) {
        for (let i = data.length - 1; i >= 0; i--) {
            $("#list").append($('<li><dl><dt>' + data[i].date + '</dt><dd><a href="html/notice/' + data[i].href + '.html">' + data[i].title + '</a></dd></dl></li>'));
        }
    });

    // トップへ戻るボタン
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            pagetop.fadeIn();
        }
        else {
            pagetop.fadeOut();
        }
    }); pagetop.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500); //0.5秒でトップへ移動
        return false;
    });

    // ヘッダーの要素の色の変更
    let header = $('#header h1,#header i');
    let nav = $('#wrapper .btn-gnavi span');
    $(window).scroll(function () {
        // ビデオより下にスクロールしたとき色を黒
        if ($(this).scrollTop() > videoArea.height() - 150) {
            header.css({ 'transition': 'all  1.0s ease', 'color': '#000' });
            nav.css({ 'transition': 'all  1.0s ease', 'background-color': '#000' });
            $('#header').css({ 'transition': 'all  1.0s ease', 'background-color': '#FFF' });
        }
        // それ以外は色を白
        else {
            header.css({ 'color': '#FFF' });
            nav.css({ 'background-color': '#FFF' });
            $('#header').css({ 'background-color': 'rgba(0,0,0,0)' });
        }
    });

    // 画像が押されたらyoutubeのiframeを読み込む
    $('.youtube').each(function () {
        var iframe = $(this).children('iframe');
        var url = iframe.attr('data-src');
        var id = url.match(/[\/?=]([a-zA-Z0-9_-]{11})[&\?]?/)[1];
        iframe.before('<img id="inner-video" src="http://img.youtube.com/vi/' + id + '/mqdefault.jpg" />').remove();
        $(this).on('click', function () {
            $(this).after('<div class="youtube"><iframe id="inner-video" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>').remove();
            $('#movie h3').remove();
        });
    });
});