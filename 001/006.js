var pages = document.getElementById("pages"),
	touchStartPostion = {},
	nowClass;

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

pages.addEventListener("touchend",function(e){
	console.log(e);
	if(e.changedTouches[0].clientY<touchStartPostion.y-50){
		$(".now").css('transform','translateY(0px)');
	}
});


//

var titleSlogan = document.getElementById("title-slogan");
var thisNowTop;

titleSlogan.addEventListener("touchstart", function(e){
	//获取初始touch坐标
	e.stopPropagation();

	touchStartPostion.x = e.changedTouches[0].clientX;
	touchStartPostion.y = e.changedTouches[0].clientY;

	thisNowTop = parseFloat($(this).css('top'));
});

titleSlogan.addEventListener("touchmove", function(e){
	//纵向跟手移动
	e.preventDefault();
	//阻止冒泡
	e.stopPropagation();

	
	$(this).css('top', (e.changedTouches[0].clientY-touchStartPostion.y + thisNowTop) +"px");
	console.log(thisNowTop);
});

titleSlogan.addEventListener("touchend",function(e){
	console.log(e);
	if(e.changedTouches[0].clientY<touchStartPostion.y-50){
		$(this).css('transform','translateY(0px)');
	}
});