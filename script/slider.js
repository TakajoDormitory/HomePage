// 表示する画像の配列を作成
let imgList;
// htmlNameはcommon.jsで定義済み
if (htmlName[htmlName.length - 2] == 'en') {
	imgList = [
		"../img/OverView.jpg",
		"../img/EntranceCeremony.JPG",
		"../img/Firework.JPG",
		"../img/soccer.jpg",
	];
}
else {
	imgList = [
		"img/OverView.jpg",
		"img/EntranceCeremony.JPG",
		"img/Firework.JPG",
		"img/soccer.jpg",
	];
}

// 画像とナビの要素を自動で追加
for (let i = 0; i < imgList.length; i++) {
	// li要素を取得
	let slide = document.createElement("li");
	// li要素の中に画像タグを埋め込む
	if (window.innerWidth < 1450) slide.innerHTML = "<img width=100% src='" + imgList[i] + "'>";
	else slide.innerHTML = "<img width='800px' height='450px' src='" + imgList[i] + "'>";
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
let imageSlide = document.getElementsByClassName("slider-inner")[0].getElementsByTagName("li");
// クラス名「dotNavigation」にドットナビの1つの要素を格納
let dotNavigation = document.getElementsByClassName("nav")[0].getElementsByTagName("li");
// 「現在○○枚目のスライドを表示している」というインデックス番号を格納する変数
let nowIndex = 0;
// 現在表示されている画像とドットナビにクラス名を付ける
imageSlide[nowIndex].classList.add("show");
dotNavigation[nowIndex].classList.add("current");
// スライドがアニメーション中か判断するフラグ
let isChanging = false;
// スライドのsetTimeoutを管理するタイマー
let slideTimer;
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
	Interval = setInterval(function () {
		let index = nowIndex + 1;
		if (index > length) {
			index = 0;
		}
		sliderSlide(index);
	}, 4000);
}

//スライド自動送りを開始
startInterval();

//画像及びナビにホバーで自動送り停止
$("#slider").hover(
	function () { clearInterval(Interval); },
	function () { startInterval(); }
);

// ドットナビをクリックした時のイベントを作成
for (let i = 0; i < dotNavigation.length; i++) {
	// データ属性のインデックス番号を元にスライドを行う
	dotNavigation[i].addEventListener("click", function () {
		let index = Number(this.getAttribute("data-nav-index"));
		sliderSlide(index);
	}, false);
}

// 左矢印のナビをクリックした時のイベント
document.getElementById("arrow-prev").addEventListener("click", function () {
	let index = nowIndex - 1;
	if (index < 0) {
		index = length;
	}
	sliderSlide(index);
}, false);
// 右矢印のナビをクリックした時のイベント
document.getElementById("arrow-next").addEventListener("click", function () {
	let index = nowIndex + 1;
	if (index > length) {
		index = 0;
	}
	sliderSlide(index);
}, false);


// スワイプ
$(document).ready(function () {
	// 指が触れたらstartSwipeを実行
	$("#slider").on("touchstart", startSwipe);

	// 指が動いたらSwipingを実行
	$("#slider").on("touchmove", Swiping);

	// 指が離れたらendSwipeを実行
	$("#slider").on("touchend", endSwipe);

	let moveX, posiX;


	// 指が触れた時の処理
	function startSwipe(event) {
		// 現在の座標を取得
		posiX = getX(event);

		// 結果の変数を初期化
		moveX = '';
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
			let index = nowIndex + 1;
			if (index > length) {
				index = 0;
			}
			sliderSlide(index);
		}
		// 右へ移動した場合
		else if (moveX == "right") {
			let index = nowIndex - 1;
			if (index < 0) {
				index = length;
			}
			sliderSlide(index);
		}

	}

	//横方向の座標を取得
	function getX(event) {
		return (event.originalEvent.touches[0].pageX);
	}

});