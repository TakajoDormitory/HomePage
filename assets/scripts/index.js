// お知らせ機能
// htmlNameはcommon.jsで定義済み
// 英語ページと日本語ページで相対パス変更
if (htmlName[htmlName.length - 2] == "english") {
  jsonPath = "../../../assets/json/notice.json";
} else {
  jsonPath = "assets/json/notice.json";
}

// ウィンドウ縦横比の取得
let screenHeight, screenWidth, widthRaito;
screenHeight = window.innerHeight;
screenWidth = window.innerWidth;
widthRaito = screenWidth / screenHeight;

// トップ動画のサイズの最適化
function movieResize() {
  // 1150px以下の場合
  if (screenWidth < 1150) {
    // 横が縦の約16/(9*2) (動画の縦幅がウィンドウ縦幅の半分でOK)以上の場合
    if (widthRaito > 0.8) {
      $("#video-area").css({ height: "56.25vw" });
      $("#video").css({ width: "100vw" });
      $("#video-area h1").css({ top: "40vw" });
    } else {
      $("#video-area").css({ height: "50vh" });
      $("#video").css({ height: "50vh" });
      $("#video-area h1").css({ top: "35vh" });
    }
  }
}

$(function () {
  movieResize();
  // ウィンドウリサイズ時に動画のサイズを調整
  var timer = "";
  $(window).on("resize", function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      movieResize();
    }, 200);
  });

  // notice.jsonからお知らせ情報を取得、表示
  $.getJSON(jsonPath, function (data) {
    for (let i = data.length - 1; i >= 0; i--) {
      // お知らせのリンク
      // httpから始まっていなかったら相対パス
      if (!(data[i].href.slice(0, 4) == "http")) {
        // 英語ページと日本語ページで相対パス変更
        if (htmlName[htmlName.length - 2] == "english") {
          notice_path = "../notice/" + data[i].href + ".html";
        } else {
          notice_path = "pages/notice/" + data[i].href + ".html";
        }
      } else {
        notice_path = data[i].href;
      }
      $("#list").append(
        $(
          "<li><dl><dt>" +
            data[i].date +
            '</dt><dd><a href="' +
            notice_path +
            '">' +
            data[i].title +
            "</a></dd></dl></li>"
        )
      );
    }
  });

  // ヘッダーの要素の色の変更
  let header = $("#header h1,#header i");
  let nav = $("#wrapper .btn-gnavi span");
  $(window).scroll(function () {
    // スクロールを促すボタンを非表示
    if ($(this).scrollTop() > videoArea.height() - window.innerHeight) {
      $(".scroll_down").css({ transition: "all  1.0s ease", opacity: 0 });
    }
    // スクロールを促すボタンを表示
    else {
      $(".scroll_down").css({ opacity: 1 });
    }
    // ビデオより下にスクロールしたとき色を黒,アニメーション速度初期化
    if ($(this).scrollTop() > videoArea.height() - 150) {
      header.css({ transition: "all  1.0s ease", color: "#000" });
      nav.css({ transition: "all  1.0s ease", "background-color": "#000" });
      $("#header").css({
        transition: "all  1.0s ease",
        "background-color": "#FFF",
      });
    }
    // それ以外は色を白
    else {
      header.css({ color: "#FFF" });
      nav.css({ "background-color": "#FFF" });
      $("#header").css({ "background-color": "rgba(0,0,0,0)" });
    }
  });

  // 画像が押されたらyoutubeのiframeを読み込む
  $(".youtube").each(function () {
    var iframe = $(this).children("iframe");
    var url = iframe.attr("data-src");
    var id = url.match(/[\/?=]([a-zA-Z0-9_-]{11})[&\?]?/)[1];
    iframe
      .before(
        '<img id="inner-video" src="http://img.youtube.com/vi/' +
          id +
          '/mqdefault.jpg" />'
      )
      .remove();
    $(this).on("click", function () {
      $(this)
        .after(
          '<div class="youtube"><iframe id="inner-video" src="https://www.youtube.com/embed/' +
            id +
            '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
        )
        .remove();
      $("#movie h3").remove();
    });
  });

  // スライダー処理
  // 表示する画像の配列を作成
  let imgList;
  if (htmlName[htmlName.length - 2] == "english") {
    imgList = [
      "../../assets/images/OverView.jpg",
      "../../assets/images/EntranceCeremony.JPG",
      "../../assets/images/Firework.JPG",
      "../../assets/images/soccer.jpg",
    ];
  } else {
    imgList = [
      "assets/images/OverView.jpg",
      "assets/images/EntranceCeremony.JPG",
      "assets/images/Firework.JPG",
      "assets/images/soccer.jpg",
    ];
  }

  // 画像とナビの要素を自動で追加
  for (let i = 0; i < imgList.length; i++) {
    // li要素を取得
    let slide = document.createElement("li");
    // li要素の中に画像タグを埋め込む
    if (window.innerWidth < 1450)
      slide.innerHTML = "<img width=100% src='" + imgList[i] + "'>";
    else
      slide.innerHTML =
        "<img width='800px' height='450px' src='" + imgList[i] + "'>";
    // li要素をクラス名「slider-inner」の子要素として追加
    document.getElementsByClassName("slider-inner")[0].appendChild(slide);

    // li要素を取得
    let nav = document.createElement("li");
    // プロパティ「data-nav-index」に数値を割り振る
    nav.setAttribute("data-nav-index", i);
    // li要素をクラス名「nav」の子要素として追加
    document.getElementsByClassName("nav")[0].appendChild(nav);
  }

  // スライドの数を取得(処理のために-1する)
  let length = imgList.length - 1;
  // クラス名「imageSlide」に画像の1枚の要素を格納
  let imageSlide = document
    .getElementsByClassName("slider-inner")[0]
    .getElementsByTagName("li");
  // クラス名「dotNavigation」にドットナビの1つの要素を格納
  let dotNavigation = document
    .getElementsByClassName("nav")[0]
    .getElementsByTagName("li");
  // 「現在○○枚目のスライドを表示している」というインデックス番号を格納する変数
  let nowIndex = 0;
  // 現在表示されている画像とドットナビにクラス名を付ける
  imageSlide[nowIndex].classList.add("show");
  dotNavigation[nowIndex].classList.add("current");
  // スライドがアニメーション中か判断するフラグ
  let isChanging = false;
  // スライド切り替え時に呼び出す関数
  function sliderSlide(val) {
    if (isChanging === true) {
      return false;
    }
    isChanging = true;
    // 現在表示している画像とナビからクラス名を削除
    imageSlide[nowIndex].classList.remove("show");
    dotNavigation[nowIndex].classList.remove("current");
    nowIndex = val;
    // 次に表示するスライドとナビにカレントクラスを設定
    imageSlide[nowIndex].classList.add("show");
    dotNavigation[nowIndex].classList.add("current");
    // アニメーションが終わるタイミングでisChangingのステータスをfalseに
    slideTimer = setTimeout(function () {
      isChanging = false;
    }, 600);
  }

  //スライド自動送りを開始する関数
  function startInterval() {
    Interval = setInterval(slideRight, 4000);
  }

  //スライド自動送りを開始
  startInterval();

  //画像及びナビにホバーで自動送り停止
  $("#slider img").hover(
    function () {
      clearInterval(Interval);
    },
    function () {
      startInterval();
    }
  );

  // ドットナビをクリックした時のイベントを作成
  for (let i = 0; i < dotNavigation.length; i++) {
    // データ属性のインデックス番号を元にスライドを行う
    dotNavigation[i].addEventListener(
      "click",
      function () {
        let index = Number(this.getAttribute("data-nav-index"));
        sliderSlide(index);
      },
      false
    );
  }

  // 左矢印のナビをクリックした時のイベント
  $("#arrow-prev").on("click", function () {
    clearInterval(Interval);
    slideLeft();
    startInterval();
  });
  // 右矢印のナビをクリックした時のイベント
  $("#arrow-next").on("click", function () {
    clearInterval(Interval);
    slideRight();
    startInterval();
  });

  // スワイプ
  // 指が触れたらstartSwipeを実行
  $("#slider img").on("touchstart", startSwipe);

  // 指が動いたらSwipingを実行
  $("#slider img").on("touchmove", Swiping);

  // 指が離れたらendSwipeを実行
  $("#slider img").on("touchend", endSwipe);

  var moveX, posiX;
  // 指が触れた時の処理
  function startSwipe(event) {
    // 現在の座標を取得
    posiX = getX(event);

    // 結果の変数を初期化
    moveX = "";
  }

  // 指が動いている時の処理
  function Swiping(event) {
    // 右から左へ70px以上スワイプ
    if (posiX - getX(event) > 70) {
      moveX = "left";
    }
    // 左から右へ70px以上スワイプ
    else if (posiX - getX(event) < -70) {
      moveX = "right";
    }
  }

  // 指が離れたときの処理
  function endSwipe(event) {
    // 左へ移動していた場合
    if (moveX == "left") {
      clearInterval(Interval);
      slideRight();
      startInterval();
    }
    // 右へ移動した場合
    else if (moveX == "right") {
      clearInterval(Interval);
      slideLeft();
      startInterval();
    }
  }

  // 左へスライドする関数
  function slideLeft() {
    let index = nowIndex - 1;
    if (index < 0) {
      index = length;
    }
    sliderSlide(index);
  }

  // 右へスライドする関数
  function slideRight() {
    let index = nowIndex + 1;
    if (index > length) {
      index = 0;
    }
    sliderSlide(index);
  }

  //横方向の座標を取得
  function getX(event) {
    return event.originalEvent.touches[0].pageX;
  }
});
