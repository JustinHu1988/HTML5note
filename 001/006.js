var pages = document.getElementById("pages"),
	touchStartPostion = {},
	nowClass,
	moveYDestance,
	pageHeight = $(pages).height(); //直接使用原生.style.height获取不到height值

pages.addEventListener("touchstart", function(e){
	//获取初始touch坐标
	touchStartPostion.x = e.changedTouches[0].clientX;
	touchStartPostion.y = e.changedTouches[0].clientY;
	nowClass = $(".now");
});

pages.addEventListener("touchmove", function(e){
	//纵向跟手移动
	e.preventDefault();
	nowClass.css('transform','translateY('+ (e.changedTouches[0].clientY-touchStartPostion.y) + 'px)');
	console.log($("now").css('transform'));
});

var movevh = function(){
			nowClass.css('transform','translateY(' +  moveYDestance +"px");
			nowClass.next().css('transform','translateY(' +  (moveYDestance + pageHeight) +"px");
			nowClass.prev().css('transform','translateY('+ -100 + 'vh)');
			moveYDestance += (pageHeight+1-moveYDestance)/8;
			if(moveYDestance<pageHeight+1){
							window.setTimeout(movevh, 1000/60, pages, null);
						};
					};

pages.addEventListener("touchend",function(e){
	console.log(e);
	moveYDestance = e.changedTouches[0].clientY - touchStartPostion.y;
	if(moveYDestance>-50){
		movevh();
	}
});


