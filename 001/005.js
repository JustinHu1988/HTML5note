	var pages = document.getElementById('pages');
	var $pages = jQuery(pages);
	var secLen = $('section').length;


	var mc = new Hammer(pages);
	mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

	var deltaX = 0;
	var deltaY = 0;

	mc.on("panup pandown", function(e){
		var dX = deltaX + (e.deltaX);
		var dY = deltaY + (e.deltaY);
		console.log(e.deltaY);
		var pageHeight = $pages.height();
		$('section').each(function(){
				if ($(this).hasClass("now")) {
					$(this).css('transform','translateY('+ e.deltaY + 'px)');
					$(this).next().css('transform','translateY('+ (e.deltaY + pageHeight) + 'px)');
					$(this).prev().css('transform','translateY('+ (e.deltaY - pageHeight) + 'px)');
					console.log(e.deltaY);
				}
		})
	});

	mc.on("panend", function(e){
		$('section').each(function(){
			if ($(this).hasClass("now")) {
				var pageHeight = $pages.height();
				if(e.deltaY<=30 && e.deltaY>=-30){
					var translateNow = parseInt($pages.css('transform'));
					$(this).css('transform','translateY('+ 0 + 'vh)');
					$(this).next().css('transform','translateY('+ 100 + 'vh)');
					$(this).prev().css('transform','translateY('+ -100 + 'vh)');
				} else if (e.deltaY<-30) {
					var _this = $(this);
					var j = -e.deltaY;
					if($(this).index()<secLen-1){
					var movevh = function(){
						_this.css('transform','translateY(' +  -j +"px");
						_this.next().css('transform','translateY(' +  (-j + pageHeight) +"px");
						_this.prev().css('transform','translateY('+ -100 + 'vh)');
						j += Math.ceil((pageHeight+1-j)/8);
						if(j<pageHeight+1){
							setTimeout(movevh, 1000/60);
							console.log(j);
						};
					};
					setTimeout(movevh, 1000);
					setTimeout(function(){
						_this.addClass("prev").removeClass("now");
						_this.next().addClass("now").removeClass("next");
					}, 400);

					return false;
					} else if($(this).index() == secLen-1){
						$(this).css('transform','translateY('+ 0 + 'vh)');
						$(this).prev().css('transform','translateY('+ -100 + 'vh)');
					}
				} else if (e.deltaY>30) {
					var _this = $(this);
					var k = e.deltaY;
					console.log(k);
					if($(this).index()>0){
						var movevh1 = function(){
						_this.css('transform','translateY(' +  k +"px");
						_this.prev().css('transform','translateY(' +  (k - pageHeight) +"px");
						_this.next().css('transform','translateY('+ 100 + 'vh)');
						k += Math.ceil((pageHeight+1-k)/8);
						if(k<pageHeight+1){
							setTimeout(movevh1, 1000/60);
							console.log(k);
						};
						};
						setTimeout(movevh1, 1000);
						setTimeout(function(){
							_this.addClass("next").removeClass("now");
							_this.prev().addClass("now").removeClass("prev");
						}, 400);
						
						return false;
					} else if($(this).index() == 0){
						$(this).css('transform','translateY('+ 0 + 'vh)');
						$(this).next().css('transform','translateY('+ 100 + 'vh)');
					}
				}
			}
		})
	})