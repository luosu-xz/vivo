$(function(){
    var Top = $('.nav').offset().top;
    $(document).on('scroll',function(){
            if($(document).scrollTop() > Top){
                $('.nav').css({
                    "position":"fixed",
                    "top":0,
                    "backgroundColor":"white",
                })
            }else{
                $('.nav').css({
                    "position":"static"
                })
            }
        }
    )
})
$(function(){
    // 将第二个导航条隐藏
    // $('.nav').hide();
    // $('.banner ul ').mouseover(function(){
    //     $('.nav').slideDown();
    // })
    // $('.nav li').mouseout(function(){
    //     $('.nav').hide();
    // })
   
    $('.person').on("mouseover",function(){
        $('.page').slideDown();
        $('.page').show();
    })
    $('.page').on("mouseout",function(){
        $('.page').hide();
    })


})


window.onload = function() {
    var swiper = new Swiper('.swiper-container',{
		autoplay:3000,
		speed:1000,
		autoplayDisableOnInteraction : false,
		loop:true,
		centeredSlides : true,
		slidesPerView:2,
        pagination : '.swiper-pagination',
		paginationClickable:true,
		prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
		onInit:function(swiper){
			swiper.slides[2].className="swiper-slide swiper-slide-active";//第一次打开不要动画
			},
        breakpoints: { 
                668: {
                    slidesPerView: 1,
                 }
            }
		});
		}
