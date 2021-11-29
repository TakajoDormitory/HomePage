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

// indexのページ上部ボタン
let pagetop = $("#page_top");
pagetop.hide();

// トップへ戻るボタン
$(window).scroll(function () {
  if ($(this).scrollTop() > 150) {
    pagetop.fadeIn();
  } else {
    pagetop.fadeOut();
  }
});
pagetop.click(function () {
  $("body,html").animate(
    {
      scrollTop: 0,
    },
    500
  ); //0.5秒でトップへ移動
  return false;
});

// ファイル名を取得
let htmlName = location.href.split("/");
// indexにいるか判定
let onIndex = false;
if (
  htmlName[htmlName.length - 1] == "index.html" ||
  htmlName[htmlName.length - 1] == "index.html#" ||
  htmlName[htmlName.length - 1] == ""
) {
  onIndex = true;
}

// ハンバーガーメニュー
let nav = $("#wrapper .btn-gnavi span");
// videoの範囲を抽出
let videoArea = $("#video-area");
// マウスのY座標を格納する変数
let mouseY = 0;

$(function () {
  $(".btn-gnavi,.fa-search").on("click", function () {
    // ハンバーガーメニューのコンテンツの位置を格納する変数
    let rightVal = 0;
    // 開いた状態であれば閉じる
    if ($(".btn-gnavi").hasClass("open")) {
      // スクロール制限を解除
      $("html").css({ "overflow-y": "visible" });
      // アニメーション速度を遅くする
      nav.css({ transition: "all  1.0s ease" });
      // index.htmlならマウスのY座標を取得、ボタンをフェードイン
      if (onIndex) {
        document.addEventListener("mousemove", function (e) {
          mouseY = e.pageY;
        });
        if (mouseY > videoArea.height() - window.innerHeight * 0.2)
          pagetop.fadeIn();
      } else {
        pagetop.fadeIn();
      }
      // index.htmlではないもしくは
      // index.htmlかつビデオより下なら背景色を変更
      if (!onIndex || (onIndex && mouseY > videoArea.height())) {
        nav.css({ "background-color": "#000" });
      }
      rightVal = -300;
      $(this).removeClass("open");
    }
    // 閉じた状態であれば開く
    else {
      $(".btn-gnavi").addClass("open");
      // searchボタンが押されたときは検索欄にカーソル自動移動
      if ($(this).hasClass("fa-search")) {
        $(".gsc-input").focus();
      }
      // スクロール制限を設定
      $("html").css({ "overflow-y": "hidden" });
      $("#wrapper").css({ "overflow-y": "visible" });
      // アニメーション速度を矢印用に設定
      nav.css({ transition: "all  0.3s ease" });
      // 背景色を白色にする
      nav.css({ "background-color": "#FFF" });
      // ボタンをフェードアウト
      pagetop.fadeOut();
    }

    $("#bar").stop().animate(
      {
        right: rightVal,
      },
      200
    );
  });

  $("#fb-share").attr({
    href: "http://www.facebook.com/share.php?u=" + location.href,
  });

  $("#tw-share").attr({
    href: "https://twitter.com/intent/tweet?text=" + location.href,
  });

  $("#line-share").attr({
    href: "https://line.me/R/msg/text/?" + location.href,
  });
});
