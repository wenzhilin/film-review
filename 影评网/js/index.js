$(document).ready(function() {   /*loading */
        window.setTimeout(function(){
            $("#load").fadeOut();
        }, 3000);
});
$(function() {  /*滚动条实现*/
        // the element we want to apply the jScrollPane
        var $el					= $('#jp').jScrollPane({
                verticalGutter 	: -16
            }),

        // the extension functions and options
            extensionPlugin 	= {

                extPluginOpts	: {
                    // speed for the fadeOut animation
                    mouseLeaveFadeSpeed	: 500,
                    // scrollbar fades out after hovertimeout_t milliseconds
                    hovertimeout_t		: 1000,
                    // if set to false, the scrollbar will be shown on mouseenter and hidden on mouseleave
                    // if set to true, the same will happen, but the scrollbar will be also hidden on mouseenter after "hovertimeout_t" ms
                    // also, it will be shown when we start to scroll and hidden when stopping
                    useTimeout			: true,
                    // the extension only applies for devices with width > deviceWidth
                    deviceWidth			: 980
                },
                hovertimeout	: null, // timeout to hide the scrollbar
                isScrollbarHover: false,// true if the mouse is over the scrollbar
                elementtimeout	: null,	// avoids showing the scrollbar when moving from inside the element to outside, passing over the scrollbar
                isScrolling		: false,// true if scrolling
                addHoverFunc	: function() {

                    // run only if the window has a width bigger than deviceWidth
                    if( $(window).width() <= this.extPluginOpts.deviceWidth ) return false;

                    var instance		= this;

                    // functions to show / hide the scrollbar
                    $.fn.jspmouseenter 	= $.fn.show;
                    $.fn.jspmouseleave 	= $.fn.fadeOut;

                    // hide the jScrollPane vertical bar
                    var $vBar			= this.getContentPane().siblings('.jspVerticalBar').hide();

                    /*
                     * mouseenter / mouseleave events on the main element
                     * also scrollstart / scrollstop - @James Padolsey : http://james.padolsey.com/javascript/special-scroll-events-for-jquery/
                     */
                    $el.bind('mouseenter.jsp',function() {

                        // show the scrollbar
                        $vBar.stop( true, true ).jspmouseenter();

                        if( !instance.extPluginOpts.useTimeout ) return false;

                        // hide the scrollbar after hovertimeout_t ms
                        clearTimeout( instance.hovertimeout );
                        instance.hovertimeout 	= setTimeout(function() {
                            // if scrolling at the moment don't hide it
                            if( !instance.isScrolling )
                                $vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
                        }, instance.extPluginOpts.hovertimeout_t );


                    }).bind('mouseleave.jsp',function() {

                        // hide the scrollbar
                        if( !instance.extPluginOpts.useTimeout )
                            $vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
                        else {
                            clearTimeout( instance.elementtimeout );
                            if( !instance.isScrolling )
                                $vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
                        }

                    });

                    if( this.extPluginOpts.useTimeout ) {

                        $el.bind('scrollstart.jsp', function() {

                            // when scrolling show the scrollbar
                            clearTimeout( instance.hovertimeout );
                            instance.isScrolling	= true;
                            $vBar.stop( true, true ).jspmouseenter();

                        }).bind('scrollstop.jsp', function() {

                            // when stop scrolling hide the scrollbar (if not hovering it at the moment)
                            clearTimeout( instance.hovertimeout );
                            instance.isScrolling	= false;
                            instance.hovertimeout 	= setTimeout(function() {
                                if( !instance.isScrollbarHover )
                                    $vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
                            }, instance.extPluginOpts.hovertimeout_t );

                        });

                        // wrap the scrollbar
                        // we need this to be able to add the mouseenter / mouseleave events to the scrollbar
                        var $vBarWrapper	= $('<div/>').css({
                            position	: 'absolute',
                            left		: $vBar.css('left'),
                            top			: $vBar.css('top'),
                            right		: $vBar.css('right'),
                            bottom		: $vBar.css('bottom'),
                            width		: $vBar.width(),
                            height		: $vBar.height()
                        }).bind('mouseenter.jsp',function() {

                            clearTimeout( instance.hovertimeout );
                            clearTimeout( instance.elementtimeout );

                            instance.isScrollbarHover	= true;

                            // show the scrollbar after 100 ms.
                            // avoids showing the scrollbar when moving from inside the element to outside, passing over the scrollbar
                            instance.elementtimeout	= setTimeout(function() {
                                $vBar.stop( true, true ).jspmouseenter();
                            }, 100 );

                        }).bind('mouseleave.jsp',function() {

                            // hide the scrollbar after hovertimeout_t
                            clearTimeout( instance.hovertimeout );
                            instance.isScrollbarHover	= false;
                            instance.hovertimeout = setTimeout(function() {
                                // if scrolling at the moment don't hide it
                                if( !instance.isScrolling )
                                    $vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
                            }, instance.extPluginOpts.hovertimeout_t );

                        });

                        $vBar.wrap( $vBarWrapper );

                    }

                }

            },

        // the jScrollPane instance
            jspapi 			= $el.data('jsp');

        // extend the jScollPane by merging
        $.extend( true, jspapi, extensionPlugin );
        jspapi.addHoverFunc();
    });
$(document).ready(function() {        /*排行榜功能的实现*/
    $("#ranking-nav li:eq(0)").hover(function(){
        $("#china-ranking").css("display","block");
        $("#movie-ranking").css("display","none");
        $("#america-ranking").css("display","none");
        $("#ranking-nav li:eq(1)").css("background-color","white");
        $("#ranking-nav li:eq(2)").css("background-color","white");
        $("#ranking-nav li:eq(0)").css("background-color","#e7e7e7");
    });
    $("#ranking-nav li:eq(1)").hover(function(){
        $("#china-ranking").css("display","none");
        $("#movie-ranking").css("display","none");
        $("#america-ranking").css("display","block");
        $("#ranking-nav li:eq(0)").css("background-color","white");
        $("#ranking-nav li:eq(2)").css("background-color","white");
        $("#ranking-nav li:eq(1)").css("background-color","#e7e7e7");
    });
    $("#ranking-nav li:eq(2)").hover(function(){
        $("#china-ranking").css("display","none");
        $("#america-ranking").css("display","none");
        $("#movie-ranking").css("display","block");
        $("#ranking-nav li:eq(1)").css("background-color","white");
        $("#ranking-nav li:eq(0)").css("background-color","white");
        $("#ranking-nav li:eq(2)").css("background-color","#e7e7e7");
    });
    $(".ranking-content tr").find("img").eq(0).show(100);
    $(".ranking-content tr").hover(function () {
        $(this).find("img").show(100);
        $(this).siblings().find("img").hide(100);
    });
});

$(document).ready(function(){  /*实现点击上下切换*/
    $(".movie-btn-down").click(function(){
        var top=$(".movie-left-content ul").position().top-33;
        var height=$(".movie-left-content li").height()+10;
        var num=top-2*height+"px";
        var maxHeightnum=0-6*height;
        var maxTopnum=-10-7*height;
        var maxTop=-10-7*height+"px";
       if(top>maxHeightnum&&top<=30){     /*注意带px的不能比较*/
           $(".movie-left-content> ul").stop().animate({top:num},300);    /*加上stop防止多次点击bug*/
       }
       else if(top<maxHeightnum&&top>maxTopnum){
            $(".movie-left-content> ul").stop().animate({top:maxTop},300);
        }
    });
    $(".movie-btn-top").click(function(){
        var top=$(".movie-left-content ul").position().top-33;
        var height=$(".movie-left-content li").height()+10;
        var num=top+2*height+"px";
        var maxHeightnum=-4*height;
        var maxTop="0px";
        if(top<=maxHeightnum){     /*注意带px的不能比较*/
            $(".movie-left-content> ul").stop().animate({top:num},300);    /*加上stop防止多次点击bug*/
        }
        else if(top>maxHeightnum){
            $(".movie-left-content> ul").stop().animate({top:maxTop},300);
        }
    });
});

$(document).ready(function(){
    var bgPic=["images/top-content-bg/1.jpg","images/top-content-bg/2.jpg","images/top-content-bg/3.jpg"];
    var picNum=$(".img-responsive").attr("alt");
    function timer(){
         timer=setInterval(function(){
             $(".img-responsive").attr("src",bgPic[picNum%3])
             $(".img-responsive").attr("alt",picNum%3);
            picNum++;
        },6000);
    }
    timer();
    $(".index-turn-left").click(function(){/*背景图片左右切换*/
        clearInterval(timer);
        var index=$(".img-responsive").attr("alt");
        if(index>=0){
            $(".img-responsive").attr("src",bgPic[index]);
            index--;
            $(".img-responsive").attr("alt",index);
        }else{
            index=2
            $(".img-responsive").attr("src",bgPic[index]);
            index--;
            $(".img-responsive").attr("alt",index);
        }
        timer=setInterval(function(){
            $(".img-responsive").attr("src",bgPic[picNum%3])
            $(".img-responsive").attr("alt",picNum%3);
            picNum++;
        },6000);
    });
    $(".index-turn-right").click(function(){/*背景图片左右切换*/
        clearInterval(timer);
        var index=$(".img-responsive").attr("alt");
        if(index<3){
            $(".img-responsive").attr("src",bgPic[index]);
            index++;
            $(".img-responsive").attr("alt",index);
        }else{
            index=0;
            $(".img-responsive").attr("src",bgPic[index]);
            index++;
            $(".img-responsive").attr("alt",index);
        }
        timer=setInterval(function(){
            $(".img-responsive").attr("src",bgPic[picNum%3]);
            $(".img-responsive").attr("alt",picNum%3);
            picNum++;
        },6000);
    });
});

$(document).ready(function(){  /*底部火箭特效 回到顶部*/
    var width = $(window).width();
    if (width >= 992) {
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 1400) {
                $('.actGotop').fadeIn(300);
            } else {
                $('.actGotop').fadeOut(300);
            }
        });
        $('.actGotop').click(function () {
            $('html,body').animate({scrollTop: '0px'}, 800);
        }
        );
    }
    else {
        return 0;
    }
});

$(document).ready(function () {
    $(window).resize(function () {
        var max_height=500;
        var true_height=$(".img-responsive").height();
        var a=max_height/true_height;
        var b=300/a;
        var c=104/a;
        var ture=b+"px";
        var d=c+"px";
        var e=-300/a;
        var f=e+"px";
        var g=-350/a;
        var h=g+"px";
        $(".content-main-images").height(ture);
        $(".btn-turn").height(d);
        $(".content-comment").css("margin-top",f);
        $(".container1").css("margin-top",h);
    });
});