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
let htmlName = location.href.split('/').pop();
// index.htmlならvideoの範囲を抽出
if (htmlName == 'index.html') let videoArea = $("#video-area");
$(function () {
  $(".btn-gnavi", ".fa-search").on("click", function () {
    // ハンバーガーメニューのコンテンツの位置を格納する変数
    let rightVal = 0;
    // 既に開いた状態であれば閉じる
    if ($(this).hasClass("open")) {
      // アニメーション速度を遅くする
      nav.css({ transition: "all  1.0s ease" });
      // index.htmlなら背景色を変更
      if (htmlName != 'index.html' || (htmlName == 'index.html' && $(this).scrollTop() > videoArea.height() - 150)) {
        nav.css({ "background-color": "#000" });
      }
      rightVal = -300;
      $(this).removeClass("open");
    } else {
      $(this).addClass("open");
      // アニメーション速度を矢印用に設定
      nav.css({ transition: "all  0.3s ease" });
      // 背景色を白色にする
      nav.css({ "background-color": "#FFF" });
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