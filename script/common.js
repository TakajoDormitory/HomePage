//og:urlの値を自動設定
let metaDiscre = document.head.children;
let metaLength = metaDiscre.length;
for(let i = 0;i < metaLength;i++){
	let proper = metaDiscre[i].getAttribute('property');
	if(proper === 'og:url'){
		let dis = metaDiscre[i];
		dis.setAttribute('content',location.href);
	}
}


$(function(){
	$(".btn-gnavi").on("click", function(){
		// ハンバーガーメニューの位置を設定するための変数
		let rightVal = 0;
		if($(this).hasClass("open")) {
			// 「open」クラスを持つ要素はメニューを開いた状態に設定
			rightVal = -300;
			// メニューを開いたら次回クリック時は閉じた状態になるよう設定
			$(this).removeClass("open");
		} else {
			// 「open」クラスを持たない要素はメニューを閉じた状態に設定 (rightVal は0の状態 )
			// メニューを開いたら次回クリック時は閉じた状態になるよう設定
			$(this).addClass("open");
		}

		$("#bar").stop().animate({
			right: rightVal
		}, 200);
	});
});
