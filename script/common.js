//og:urlの値を自動設定
let metaDiscre = document.head.children;
let metaLength = metaDiscre.length;
for (let i = 0; i < metaLength; i++) {
  let proper = metaDiscre[i].getAttribute("property");
  if (proper === "og:url") {
    let dis = metaDiscre[i];
    dis.setAttribute("content", location.href);
  }
}


// ハンバーガーメニュー
let nav = $("#wrapper .btn-gnavi span");
// ファイル名を取得
let htmlName = location.href.split('/');
let videoArea;
// index.htmlならvideoの範囲を抽出
if (htmlName[htmlName.length - 1] == 'index.html') {
  videoArea = $("#video-area");
}
// マウスのY座標を格納する変数
let mouseY = 0;

$(function () {
  $('.btn-gnavi').add('.fa-search').on("click", function () {
    // ハンバーガーメニューのコンテンツの位置を格納する変数
    let rightVal = 0;
    // 開いた状態であれば閉じる
    if ($(this).hasClass("open")) {
      // アニメーション速度を遅くする
      nav.css({ transition: "all  1.0s ease" });
      // index.htmlならマウスのY座標を取得
      if (htmlName[htmlName.length - 1] == 'index.html') {
        document.addEventListener('mousemove', function (e) {
          mouseY = e.pageY;
        });
      }
      // index.htmlではないもしくは
      // index.htmlかつビデオより下なら背景色を変更
      if (htmlName[htmlName.length - 1] != 'index.html' || (htmlName[htmlName.length - 1] == 'index.html' && mouseY > videoArea.height() - 150)) {
        nav.css({ "background-color": "#000" });
      }
      rightVal = -300;
      $(this).removeClass("open");
      // スクロール制限を解除
      $('body').css({ 'overflow': 'scroll' });
      $('#wrapper').css({ 'overflow': 'scroll' });
    }
    // 開いた状態であれば閉じる
    else {
      $(this).addClass("open");
      // アニメーション速度を矢印用に設定
      nav.css({ transition: "all  0.3s ease" });
      // 背景色を白色にする
      nav.css({ "background-color": "#FFF" });
      // スクロール制限を設定
      $('body').css({ 'overflow': 'hidden' });
      $('#wrapper').css({ 'overflow': 'scroll' });
    }

    $("#bar").stop().animate(
      {
        right: rightVal,
      },
      200
    );
  });

  $('.fb-like').attr({
    'data-href': location.href
  });

  $('.line-it-button').attr({
    'data-url': location.href
  })
});