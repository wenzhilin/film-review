/**
 * Created by 22847 on 2016/3/16.
 */
$(document).ready(function(){     /*背景图片自动切换*/
    $(document).ready(function() {
        $(".box_skitter_large").skitter({
            animation: "random",
            interval: 3000,
            numbers: false,
            numbers_align: "right",
            hideTools: true,
            controls: false,
            focus: false,
            focus_position: true,
            width_label:'340px',
            enable_navigation_keys: true,
            progressbar: false,
            velocity:2
        });
    });
});

$(document).ready(function(){
    $(document).off('click.bs.dropdown.data-api');  });
$(document).ready(function(){             /*下拉划过实现*/
    dropdownOpen();
     });
    function dropdownOpen() {
        var $dropdownLi = $('li.dropdown');
        $dropdownLi.mouseover(function() {
            $(this).addClass('open');
            $("li.dropdown a").css("color","#333");

        });
        $("li.dropdown>ul").mouseover(function() {
            clearInterval(timer);
            $($dropdownLi).addClass('open');
            $("li.dropdown a").css("color","#333");
        });
        $("li.dropdown ").mouseout(function() {
            timer=setTimeout(function(){
                $($dropdownLi ).removeClass('open');
                $("li.dropdown a").css("color","white");
            }, 200);
        });
    }
$(document).ready(function(){ /*浮动框划过实现*/
   $(".grade-title-bottom").mouseover(function(){
       $(".grade-hide").show();
   });
    $(".grade-hide").mouseover(function(){
        clearInterval(timer);
        $(this).show();
    });
    $(".grade-hide").mouseout(function(){
        timer=setTimeout(function(){
            $(".grade-hide").hide();
        },200);
    });
});
$(document).ready(function(){
   $(".score-total i").click(function(){
      if($(".score-total i").className="passive"){
          $(".score-total i").removeClass("passive").addClass("active");
          $(".score-ul li").css("background","white");
          $(".point-1 dd").css("background","white");
          $(".score-detail").hide();
          $(".point-1 span").html("0");
          $(".score-point>span").hide();
      }else{
          $(".score-total i").removeClass("active").addClass("passive");
      }
   });
});
$(document).ready(function(){  /*实现评分功能*/
    $(".score-ul> li").mouseover(function(){
       $(this).css("background-color","#679c21");
        $(this).prevAll().css("background-color","#679c21");
        $(this).nextAll().css("background-color","#fff");
        var index=$(this).index();
        if (index<9){
            $(".score-point >span").text(index+1+".0");
        }else {
            $(".score-point >span").text("10");
        }
        if(index<10){
            $(".score-tip >p").text("很完美,绝对不能错过");
        }
        if(index<8){
            $(".score-tip >p").text("很好,公认的佳作");
        }
        if(index<6.5){
            $(".score-tip >p").text("一般，不妨一看");
        }
        if(index<5){
            $(".score-tip >p").text("平庸之作，不看也罢");
        }
        if(index<2){
            $(".score-tip >p").text("很差，完全是浪费时间");
        }

        $(".score-total >i").removeClass("active").addClass("passive");
        $(".score-point >span").show();
        $(".score-tip").show(100);

    });
    $(".score-ul >li").click(function(){
        $(this).css("background-color","#679c21");
        $(this).prevAll().css("background-color","#679c21");
        $(this).nextAll().css("background-color","#fff");
        $(".score-point >span").show();
        $(".score-tip").hide();
    });

    $(".score-ul >li").mouseout(function(){
        $(".score-tip").hide();
    });
    $(".score-ul >i").click(function(){
        if($(this).is(".active")){
            $(this).removeClass("active");
            $(this).addClass("passive");
            $(".score-ul >li").css("background-color","#fff")
        }else{
            $(this).removeClass("passive");
            $(this).addClass("active");
            $(".score-ul >li").css("background-color","#fff")
        }
    });
    $(".score-total >span").off().toggler(
        function(){
            $(".score-detail").show(1000);
        },
        function() {
            $(".score-detail").hide(1000);
        }
    );
    $(".point-1 dd").each(function(index){
        $(this).mousemove(function(){
            id=index+1;
            var obj=$(this).parent().parent().children(".total")
            var v=0;
            if(id<=10){
                id=id;
            } else if(id>10 && id<=20){
                id=id-10;
            }else if(id>20 && id<=30){
                id=id-20;
            }else if(id>30 && id<=40){
                id=id-30;
            }else if(id>40 && id<=50){
                id=id-40;
            }else if(id>50 && id<=60){
                id=id-50;
            }else if(id>60 && id<=70){
                id=id-60;
            }
            obj.text(id);
            $(this).css("background-color","#679c21");
            $(this).prevAll().css("background-color","#679c21");
            $(this).nextAll().css("background-color","#fff");
        });
    });
    $(".point-1 dd").mousemove(function(){
        var v = parseInt($(".total").eq(0).text())+parseInt($(".total").eq(1).text())+
            parseInt($(".total").eq(2).text())+parseInt($(".total").eq(3).text())+
            parseInt($(".total").eq(4).text())+parseInt($(".total").eq(5).text());
        var point=v/6;
        var point=Math.round(point*Math.pow(10,1))/Math.pow(10,1);
        var num=point;
        var re = /^-?\d+$/;
        if(re.test(point)&&point!=10){
            $(".score-point span").css("display","block").text(point +".0");
        }else {
            $(".score-point span").css("display","block").text(point );
        }

        if(point<=1){
            $(".score-ul >li").eq(0).css("background-color","#679c21");
            $(".score-ul >li").eq(0).prevAll().css("background-color","#679c21");
            $(".score-ul >li").eq(0).nextAll().css("background-color","#fff");
        }else if(point<=2 && point>1){
            $(".score-ul >li").eq(1).css("background-color","#679c21");
            $(".score-ul >li").eq(1).prevAll().css("background-color","#679c21");
            $(".score-ul >li").eq(1).nextAll().css("background-color","#fff");
        }else if(point<=3 && point>2){
            $(".score-ul >li").eq(2).css("background-color","#679c21");
            $(".score-ul >li").eq(2).prevAll().css("background-color","#679c21");
            $(".score-ul >li").eq(2).nextAll().css("background-color","#fff");
        }else if(point<=4 && point>3){
            $(".score-ul >li").eq(3).css("background-color","#679c21");
            $(".score-ul >li").eq(3).prevAll().css("background-color","#679c21");
            $(".score-ul >li").eq(3).nextAll().css("background-color","#fff");
        }else if(point<=5 && point>4){
            $(".score-ul >li").eq(4).css("background-color","#679c21");
            $(".score-ul >li").eq(4).prevAll().css("background-color","#679c21");
            $(".score-ul >li").eq(4).nextAll().css("background-color","#fff");
        }else if(point<=6 && point>5){
            $(".score-ul >li").eq(5).css("background-color","#679c21");
            $(".score-ul >li").eq(5).prevAll().css("background-color","#679c21");
            $(".score-ul >li").eq(5).nextAll().css("background-color","#fff");
        }else if(point<=7 && point>6){
            $(".score-ul >li").eq(6).css("background-color","#679c21");
            $(".score-ul >li").eq(6).prevAll().css("background-color","#679c21");
            $(".score-ul >li").eq(6).nextAll().css("background-color","#fff");
        }else if(point<=8 && point>7){
            $(".score-ul >li").eq(7).css("background-color","#679c21");
            $(".score-ul >li").eq(7).prevAll().css("background-color","#679c21");
            $(".score-ul >li").eq(7).nextAll().css("background-color","#fff");
        }else if(point<=9 && point>8){
            $(".score-ul >li").eq(8).css("background-color","#679c21");
            $(".score-ul >li").eq(8).prevAll().css("background-color","#679c21");
            $(".score-ul >li").eq(8).nextAll().css("background-color","#fff");
        }else if(point<=10 && point>9){
            $(".score-ul >li").eq(9).css("background-color","#679c21");
            $(".score-ul >li").eq(9).prevAll().css("background-color","#679c21");
            $(".score-ul >li").eq(9).nextAll().css("background-color","#fff");
        }
    });
    $(".btn-blue").click(function(){
        $(".score-detail").hide(1000);
    });
    $(".btn-gray").click(function(){
        $(".score-detail").hide(1000);
        $(".point-1 dd").css("background","white");
        $(".score-detail").hide();
        $(".point-1 span").html("0");
    });
});

$(document).ready(function(){    /*头像切换功能*/
    $(".user-head img").click(function(){
        var activeImage = $(this).parent().children("img.img-active");
        activeImage.removeClass("img-active");
        if(activeImage.next().length > 0){
            activeImage.next().addClass("img-active");
        } else {
            $(".user-head img:first-child").addClass("img-active");
        }
        return false;
    });
});

$(document).ready(function(){    /*输入框鼠标事件*/
    $("#titleName").bind("focus",function(){
        if($(this).val()=="请输入标题"){
            $(this).val("");
        }
        $(this).css("color","#000")
    });
    $("#titleName").bind("blur",function(){
        if($(this).val()==""){
            $(this).val("请输入标题");
        }
        $(this).css("color","#a5a5a5");
    });
    $("#conBox").bind("focus",function(){
        if($(this).val()=="请输入评论内容"){
            $(this).val("");
        }
        $(this).css("color","#000")
    });
    $("#conBox").bind("blur",function(){
        if($(this).val()==""){
            $(this).val("请输入评论内容");
        }
        $(this).css("color","#a5a5a5");
    });
    $("#conBox").bind("input propertychange", function() {    /*实现监听input事件的字数*/
        var maxLength=140;
        var textLength=$("#conBox").val().length;
        var lessLength=maxLength-textLength;
        if(textLength<=maxLength){
            $(".maxNum").html(lessLength)
        };
    });

    $("#sendBtn").bind("click",function(){
        if($("#titleName").val()=="请输入标题"&&($("#conBox").val()=="请输入评论内容")){
            $("#msgBox .tips").text("标题和内容不能为空").css("display","block");
            $("#titleName").css("background","red");
            $("#conBox").css({"background":"red","color":"#ffff00"});
            $("#titleName").focus();
            timer=setTimeout(function(){
                $("#msgBox .tips").text("").css("display","none");
                $("#titleName").css("background","white");
                $("#conBox").css({"background":"white","color":"#a5a5a5"});
            },3000);
        }
        else if($("#titleName").val()=="请输入标题") {
            $("#msgBox .tips").text("标题不能为空").css("display", "block");
            $("#titleName").css("background", "red");
            $("#titleName").focus();
            timer = setTimeout(function () {
                $("#msgBox .tips").text("").css("display", "none");
                $("#titleName").css("background", "white");
            }, 3000);
        }
        else if($("#conBox").val()=="请输入评论内容") {
            $("#msgBox .tips").text("评论内容不能为空").css("display", "block");
            $("#conBox").css("background", "red");
            $("#conBox").focus();
            timer = setTimeout(function () {
                $("#msgBox .tips").text("").css("display", "none");
                $("#conBox").css("background", "white");
            }, 3000);
        }

        else{
            var $titleName=$("#titleName").val();
            var $conBox=$("#conBox").val();
            var $point=$(".score-point span").text();
            var re = /^-?\d+$/;
            var num=$(".img-active").attr("title");
            var user="user-"+num;
            var className=$(".score-total> i").attr("class");

            var dates=new Date();
            var years=dates.getFullYear();
            var month=dates.getMonth()+1;
            var days=dates.getDate();
            var hours=dates.getHours();
            var minutes=dates.getMinutes();
            var seconds=dates.getSeconds();
            var timeTable=years+"年"+(month<10 ? "0" + month : month)+"月"+(days<10 ? "0" + days : days)+"日"
                +(hours<10 ? "0" + hours : hours)+":"+(minutes<10 ? "0" + minutes : minutes)+":"
                +(seconds<10 ? "0" + seconds : seconds);
            if(className=="active"){  /*插入html的数字的类型会被强制改掉 坑*/
                var $newMsg="<li class='event'>" +
                    "<input name='tl-group' type='radio'>" +
                    "<label></label>" +
                    "<div class='thumb "+user+"'>" +
                    "<span>"
                    + timeTable+
                    "</span>" +
                    "</div><div class='content-perspective'>" +
                    "<div class='content'><div class='content-inner'><h3>"
                    +$titleName+
                    "</h3><small>想看</small><p>"
                    +$conBox+
                    "</p></div></div></div></li>";
            }else if(re.test($point)&&$point!=10){
                var $newMsg="<li class='event'>" +
                    "<input name='tl-group' type='radio'>" +
                    "<label></label>" +
                    "<div class='thumb "+user+"'>" +
                    "<span>"
                    + timeTable+
                    "</span>" +
                    "</div><div class='content-perspective'>" +
                    "<div class='content'><div class='content-inner'><h3>"
                    +$titleName+
                    "</h3><small>看过 - 评分</small><i>" +
                    +$point+
                    "<span>.0</span>"+
                    "</i><p>"
                    +$conBox+
                    "</p></div></div></div></li>";
            }else {
                var $newMsg = "<li class='event'>" +
                    "<input name='tl-group' type='radio'>" +
                    "<label></label>" +
                    "<div class='thumb "+user+"'>" +
                    "<span>"
                    + timeTable +
                    "</span>" +
                    "</div><div class='content-perspective'>" +
                    "<div class='content'><div class='content-inner'><h3>"
                    + $titleName +
                    "</h3><small>看过 - 评分</small><i>"
                    +$point +
                    "</i><p>"
                    + $conBox +
                    "</p></div></div></div></li>";
            }
            $.ajax({
                url:"",
                data:$newMsg,
                success:function(data){
                    $(".timeline").append($newMsg);
                    $("#titleName").val("请输入标题");
                    $("#conBox").val("请输入评论内容");
                    $(".maxNum").html("140");
                }
            });
        }
    });
});
$(document).ready(function(){  /*底部火箭特效 回到顶部*/
    $(window).scroll(function() {
        if($(window).scrollTop() >= 1400){
            $('.actGotop').fadeIn(300);
        }else{
            $('.actGotop').fadeOut(300);
        }
    });
    $('.actGotop').click(function(){
        $('html,body').animate({scrollTop: '0px'}, 800);});
});

