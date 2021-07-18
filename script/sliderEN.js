// 表示する画像の配列
let imgList = [
	"../img/OverView.jpg",
	"../img/BBQ.jpg",
	"../img/CherryBlossom.jpg",
	"../img/soccer.jpg",
	"../img/GetTail.jpg"
];

// 画像とナビの要素を自動で追加
for(let i = 0; i < imgList.length; i++) {
	// li要素を取得
	let slide = document.createElement("li");
	// li要素の中に画像タグを埋め込む
	if(window.innerWidth<1450) slide.innerHTML = "<img width=100% src='" + imgList[i] + "'>";
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
	slideTimer = setTimeout(function(){
		isChanging = false;
	}, 600);
}

//スライド自動送りを開始する関数
function startInterval(){
	Interval=setInterval(function(){
	let index = nowIndex + 1;
	if(index > length){
	  index = 0;
	}
	sliderSlide(index);
},4000);
}

//スライド自動送りを開始
startInterval();

//画像及びナビにホバーで自動送り停止
$(".slider").hover(
	function(){clearInterval(Interval);},
	function(){startInterval();}
);

// ドットナビをクリックした時のイベントを作成
for(let i = 0; i < dotNavigation.length; i++) {
	// データ属性のインデックス番号を元にスライドを行う
	dotNavigation[i].addEventListener("click", function(){
		let index = Number(this.getAttribute("data-nav-index"));
		sliderSlide(index);
	}, false);
}

// 左矢印のナビをクリックした時のイベント
document.getElementById("arrow-prev").addEventListener("click", function(){
	let index = nowIndex - 1;
	if(index < 0){
	  index = length;
	}
	sliderSlide(index);
}, false);
// 右矢印のナビをクリックした時のイベント
document.getElementById("arrow-next").addEventListener("click", function(){
	let index = nowIndex + 1;
	if(index > length){
	  index = 0;
	}
	sliderSlide(index);
}, false);