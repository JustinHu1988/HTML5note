var pages = document.getElementById("pages"),
	touchStartPostion = {},
	nowClass,
	moveYDestance,
	newInterval,
	pageHeight = $(pages).height(); //直接使用原生.style.height获取不到height值

pages.addEventListener("touchstart", function(e){
	e.preventDefault();
	e.stopPropagation();
	//获取初始touch坐标
	touchStartPostion.x = e.changedTouches[0].clientX;
	touchStartPostion.y = e.changedTouches[0].clientY;
	nowClass = $(".now");
});

pages.addEventListener("touchmove", function(e){
	//纵向跟手移动
	e.preventDefault();
	e.stopPropagation();
	nowClass.css('transform','translateY('+ (e.changedTouches[0].clientY-touchStartPostion.y) + 'px)');
});

var movevh = function(){
			nowClass.css('transform','translateY(' +  moveYDestance +"px");
			nowClass.next().css('transform','translateY(' +  (moveYDestance + pageHeight) +"px");
			nowClass.prev().css('transform','translateY('+ -100 + 'vh)');
			moveYDestance += (pageHeight+1-moveYDestance)/8;
			if(moveYDestance>=pageHeight+1){
							clearInterval(newInterval);
						};
					};

pages.addEventListener("touchend",function(e){
	console.log(e);
	e.preventDefault();
	e.stopPropagation();
	moveYDestance = e.changedTouches[0].clientY - touchStartPostion.y;
	if(moveYDestance>-50){
		newInterval = setInterval(movevh,1000/60);
	}
});


