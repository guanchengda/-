// JavaScript Document

response('page1280', 'page1366', 'page1440', 'page1920');
$(function () {
    //	loading调用
    //	$('body').loadImg({
    //		percenBar : '.percent-bar',				//loading元素
    //		delayHide : 500,									//进度条消失延迟时间
    //		defPic 		: false,								//补位图
    //		preload 	:	false,								//是否预加载
    //		callBack : function(rate,tote){
    //			//$('#container').css({'filter':blur((10-rate)+'px')});
    //			$('.percent-bar').css({'opacity':rate/tote}).find('p').animate({width:rate/tote*100+'%'},10).text(rate+'/'+tote);
    //		}
    //	});	

    //	start 首页 block4 为添加新皮肤 20190124
    $('.home .block4 .scrolllist li').each(function (idx, elm) {
        $(this).addClass('l' + idx);
    });

    $('.block3 path').attr('stroke', '#de504d');
    //	end 首页 block4 为添加新皮肤 20190124

    var sto_nav;
    //导航
    $(".nav li").hover(
        function () {
            //if(!$(this).index()){return ;}
            clearTimeout(sto_nav);
            $(".nav li").removeClass("cur");
            $(".nav_child .child").removeClass("now");
            var child = $(".nav_child .child").eq($(this).index()).children();
            if (child.children().size() > 0) {
                $(this).addClass("cur");
                $(".nav_child .child").stop(true, true).eq($(this).index()).addClass("now");
                child.css({
                    marginLeft: ($(this).offset().left + ($(this).width() / 2)) - (child.width() /
                        2)
                });
                //console.log(($(this).offset().left+($(this).width()/2)));
                //console.log((child.width()/2));
            }
        },
        function () { //console.log(1);
            sto_nav = setTimeout(function () {
                $(".nav li").removeClass("cur");
                $(".nav_child .child").removeClass("now");
            }, 200);
        }
    );
    $(".nav_child .child").hover(
        function () {
            clearTimeout(sto_nav);
            $(this).addClass("now");
        },
        function () {
            $(this).removeClass("now");
            $(".nav li").removeClass("cur");
        }
    );



    $(function () {

        //	pc端调用窗口滚动条
        if (isPC()) {
            niceScroll();
        }
    })
    $(window).on('load', function () {
        //添加二级导航最后一项的class
        $('#header .nav_child .child p:last-child').addClass('last');



        //返回顶部
        $(".gotop").click(function () {
            //$($.browser.webkit?"body":"html").animate({scrollTop:0},400+$(window).scrollTop()*0.3);
            $("html,body").animate({
                scrollTop: 0
            }, 400 + $(window).scrollTop() * 0.3);
        });

        //返回顶部按钮显隐
        $(window).scroll(function () {
            if ($(window).scrollTop() > $('#header').height() + $('#container .wrap .block1').height()) {
                if (!$(".sidebar").is(':visible')) {
                    $(".sidebar").fadeIn(200);
                };
            } else {
                $(".sidebar").fadeOut(200);
            }
        });

        //footer置底
        bottomFooter();

        $(window).on('resize', function () {
            //footer置底
            bottomFooter();
            response('page1280', 'page1366', 'page1440', 'page1920');
            //$('.focus').height($('.focus').width()/1572*738);
        });


        //鼠标滑过图片缩放效果
        $('.scaleimg').hover(function () {
            if (!$(this).children('img').is(':animated')) {
                $(this).children('img').animate({
                    width: '110%',
                    marginTop: '-5%',
                    marginLeft: '-5%'
                }, 100);
            }
        }, function () {
            $(this).children('img').animate({
                width: '100%',
                marginTop: '0',
                marginLeft: '0'
            }, 100);
        });

        /* 下拉框滚动条 */
        $('.selectWarp .options').mCustomScrollbar({
            theme: "dark-thin",
            scrollbarPosition: 'inside',
            autoHideScrollbar: true,
            autoExpandScrollbar: true,
            advanced: {
                autoExpandHorizontalScroll: true
            }
        });

        /*下拉框*/
        $('.selectWarp').each(function () {
            var obj = $(this);
            var selectBtn = obj.children('.selectBtn');
            var option = obj.children('.options');

            obj.on('click', '.selectBtn', function () {
                $(this).siblings('.options').slideToggle(200, function () {
                    option.mCustomScrollbar('update');
                });
                if (!$(this).hasClass('down')) {
                    selectBtn.addClass('down');
                } else {
                    selectBtn.removeClass('down');
                }
            });

            obj.on('click', 'li', function () {
                var text = $(this).text();
                selectBtn.removeClass('down').children('.value').text(text);
                option.slideUp(100, function () {
                    option.mCustomScrollbar('update');
                });
            });

            obj.mouseleave(function () {
                selectBtn.removeClass('down');
                option.slideUp(100, function () {
                    option.mCustomScrollbar('update');
                });
            });
        });

        $('.close, .overlay').on('click', function () {
            $(this).parents('.popWindow').fadeOut(100);
        });
    });


    /*var sto_sc=0;
    $(".scbtn a").hover(function(){
    	$(".scbtn .search").fadeIn(200);
    	if(sto_sc==0){
    		sto_sc=setTimeout(function(){
    			$(".scbtn .search").fadeOut(200);
    			sto_sc=0;
    		},4000);
    	}
    	
    });*/
    $("#header .scbtn").bind('click', function (e) {
        e.stopPropagation();
        $(".scbtn .search").toggle();
    });
    $("#header .search").bind('click', function (e) {
        e.stopPropagation();
    });
    // 火狐右键修复
    // $(window).bind('click',function(){
    // 	$(".scbtn .search").hide();
    // });

    $("#header .lang").hover(function () {
        $('#header .language').fadeIn(200);
        $('#header .loginbox,#header .search').hide();
    });

    $("#header .login").hover(function () {
        $('#header .loginbox').fadeIn(200);
        $('#header .search,#header .language').hide();
    });

    /*$(window).click(function(){
    	$(".scbtn .search").fadeOut(200);
    });
    $(".scbtn .search").click(function(event){
    	clearTimeout(sto_sc);
    	sto_sc=0;
    	event.stopPropagation();
    });

    $("#header .scbtn").mouseleave(function(){
    	$(".scbtn .search").fadeOut(200);
    });*/

    $("#header .lang").mouseleave(function () {
        $('#header .language').fadeOut(200);
    });

    $("#header .login").mouseleave(function () {
        $('#header .loginbox').fadeOut(200);
    });
    //计数增长
    //numGrow($('#bread .cur'),1000,10);

    ///

    //浏览建议 start
    $("#footer .jy").bind("click", function () {
        $("#footer .proposal").animate({
            bottom: 0,
        });
        return false;
    });

    $("#footer .proposal").bind("mouseout", function (e) {
        $(this).animate({
            bottom: '-60px',
        });
    });
    //浏览建议	end
});

/* Function */

//	响应式函数
function response() {
    var ww = $(window).width();
    var bd = $('html');
    if (ww <= 1280 && !bd.hasClass(arguments[0])) {
        bd.attr('class', '').addClass(arguments[0]);
    } else if (ww > 1280 && ww <= 1366 && !bd.hasClass(arguments[1])) {
        bd.attr('class', '').addClass(arguments[1]);
    } else if (ww > 1366 && ww <= 1440 && !bd.hasClass(arguments[2])) {
        bd.attr('class', '').addClass(arguments[2]);
    } else if (ww > 1440 && ww <= 1600 && !bd.hasClass(arguments[2])) {
        bd.attr('class', '').addClass(arguments[2]);
    } else if (ww > 1600 && !bd.hasClass(arguments[3])) {
        bd.attr('class', '').addClass(arguments[3]);
    }
}

//	判断客户端是否为PC
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};

//	窗口滚动条
function niceScroll() {
    var htmlNs = $("html").niceScroll({
        zindex: 9999,
        cursorwidth: 10,
        cursorborder: 0,
        cursoropacitymin: 0.3,
        cursoropacitymax: 0.8,
        horizrailenabled: false
    });
    htmlNs.cursor.css({
        width: 5
    });
    var objNs = (htmlNs.ispage) ? htmlNs.rail : htmlNs.win;
    objNs.hover(function () {
        htmlNs.state = true;
        htmlNs.cursor.stop().animate({
            width: 10
        }, 100);
    }, function () {
        if (htmlNs.rail.drag) {
            htmlNs.cursor.css({
                'opacity': '0.8'
            });
            return;
        }
        htmlNs.cursor.stop().animate({
            width: 5
        }, 100);
    });
    $(document).mouseup(function () {
        if (htmlNs.state) {
            htmlNs.state = false;
            htmlNs.cursor.stop().animate({
                width: 5
            }, 100);
        }
    });
};

//	打开弹窗
function openAlert(ele) {
    $(ele).fadeIn(300);
};

//	关闭弹窗
function closeAlert() {
    $('.popWindow').fadeOut(300);
};

//	验证码倒计时
function getCode(obj, n) {
    var t = obj.value;
    (function () {
        if (n > 0) {
            obj.disabled = true
            obj.value = '倒计时' + (n--) + '秒';
            setTimeout(arguments.callee, 1000);
        } else {
            obj.disabled = false;
            obj.value = t;
        }
    })();
};

//	计数增长
function numGrow(obj, str, time, delay) {
    var num = str.replace(/[^0-9]/ig, "");
    var g = 0;
    obj.text(g);
    var step = Math.ceil(num / (time / delay));
    var time = setInterval(function () {
        if (g <= num - step) {
            g += step;
        } else {
            g = num;
        }
        obj.text(formatNum(g.toString()));
        if (g >= num) {
            clearInterval(time);
            return false;
        }
    }, delay);
};

function formatNum(str) {
    var newStr = "";
    var count = 0;

    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
    } else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        //str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
    }
    return newStr;
};

//	footer置底
function bottomFooter() {
    var bHeight = $('body').height();
    var wHeight = $(window).height();
    var fHeight = $('#footer').height();
    if (!$('#footer').hasClass('fBottom')) {
        if (bHeight < wHeight) {
            $('#footer').addClass('fBottom');
        }
    } else {
        if (bHeight + fHeight >= wHeight) {
            $('#footer').removeClass('fBottom');
        }
    }
};

//浏览器前缀适配函数
function transformFix() { //第1个参数为操作对象，第2至n-1个参数为传入的transform键，第n个参数true为transform前缀,false为css属性值前缀
    if (arguments[arguments.length - 1]) {
        var str = '';
        for (var i = 1; i < arguments.length - 1; i++) {
            if (i > 1) {
                str = str + ' ' + arguments[i];
            } else {
                str = str + arguments[i];
            };
        };
        arguments[0].css({
            '-webkit-transform': str,
            '-moz-transform': str,
            '-ms-transform': str,
            '-o-transform': str,
            'transform': str
        });
    } else {
        var browser = ['-webkit-' + arguments[1], '-moz-' + arguments[1], '-ms-' + arguments[1], '-o-' + arguments[1],
            arguments[1]
        ];
        var val = arguments[2],
            j = 0;
        for (j in browser) {
            arguments[0].css(browser[j], val);
        };
    };
};

/*	等比自适应函数	*/
function autoHeight(obj, w, h) {
    var per = w / h;
    obj.css('height', obj.width() / per);
};

/*	等比缩放函数	*/
function autoScale(ele) {
    var per;
    if ($(window).width() < 320) {
        per = 1;
    }
    if ($(window).width() >= 320 && $(window).width() <= 640) {
        per = $(window).width() / 320;
    }
    if ($(window).width() > 640) {
        per = 2;
    }
    ele.css({
        '-webkit-transform': 'scale(' + per + ')',
        '-moz-transform': 'scale(' + per + ')',
        'transform': 'scale(' + per + ')'
    });
};

/*	多行文本省略号	*/
$(".figcaption").each(function (i) {
    var divH = $(this).height();
    var $p = $("p", $(this)).eq(0);
    while ($p.outerHeight() > divH) {
        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
    };
});

//	requestAnimationFrame兼容函数
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] +
            'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    }
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    }
})();



// 横屏监听
//var updateOrientation = function(){
//if(window.orientation=='-90' || window.orientation=='90'){
//	$('.landscape-wrap').removeClass('hide');
//	console.log('为了更好的体验，请将手机/平板竖过来！');
//}else{
//	$('.landscape-wrap').addClass('hide');
//	console.log('竖屏状态');
//}
//};
//window.onorientationchange = updateOrientation;

//算术运算
//Math.pow(2,53)      // => 9007199254740992: 2 的 53次幂  
//Math.round(.6)      // => 1.0: 四舍五入  
//Math.ceil(.6)       // => 1.0: 向上求整  
//Math.floor(.6)      // => 0.0: 向下求整  
//Math.abs(-5)            // => 5: 求绝对值  
//Math.max(x,y,z)         // 返回最大值  
//Math.min(x,y,z)         // 返回最小值  
//Math.random()       // 生成一个大于等于0小于1.0的伪随机数  
//Math.PI             // π: 圆周率  
//Math.E              // e: 自然对数的底数  
//Math.sqrt(3)            // 3的平方根  
//Math.pow(3, 1/3)        // 3的立方根  
//Math.sin(0)             // 三角函数: 还有Math.cos, Math.atan等  
//Math.log(10)            // 10的自然对数  
//Math.log(100)/Math.LN10     // 以10为底100的对数  
//Math.log(512)/Math.LN2  // 以2为底512的对数  
//Math.exp(3)             // e的三次幂

//等边三角形的高
//l/2*Math.sqrt(3)

//日期和时间　
//var then = new Date(2011, 0, 1); // 2011年1月1日  
//var later = new Date(2011, 0, 1, 17, 10, 30);// 同一天, 当地时间5:10:30pm,  
//var now = new Date(); // 当前日期和时间  
//var elapsed = now - then; // 日期减法：计算时间间隔的毫秒数  
//later.getFullYear() // => 2011  
//later.getMonth() // => 0: 从0开始计数的月份  
//later.getDate() // => 1: 从1开始计数的天数  
//later.getDay() // => 5: 得到星期几， 0代表星期日，5代表星期一  
//later.getHours() // => 当地时间17: 5pm  
//later.getUTCHours() // 使用UTC表示小时的时间，基于时区 

//字符串处理　　
//var s = "hello, world"  // 定义一个字符串  
//s.charAt(0)             // => "h": 第一个字符  
//s.charAt(s.length-1)        // => "d": 最后一个字符  
//s.substring(1,4)        // => "ell":第2～4个字符  
//s.slice(1,4)            // => "ell": 同上  
//s.slice(-3)             // => "rld": 最后三个字符  
//s.indexOf("l")     	 // => 2: 字符l首次出现的位置  
//s.lastIndexOf("l")      // => 10:字符l最后一次出现的位置  
//s.indexOf("l", 3)       // => 3:在位置3及之后首次出现字符l的位置  
//s.split(", ")      	 // => ["hello", "world"] 分割成子串  
//s.replace("h", "H")         // => "Hello, world": 全文字符替换  
//s.toUpperCase()  

//ie8
//if($.browser.msie && parseInt($.browser.version)==8){
//	
//};

//倒序排数
//function reverseNum(num){
//	var num=parseInt(num.replace(/[^0-9]/ig,""));
//	var rev=0;
//	do{
//		var lastNum=num;
//		rev=(rev*10)+lastNum;
//		num=parseInt(num/10);
//	} while(num>0);
//	return rev;
//};

//		if(window.confirm('你确定要删除吗？')){
//			return true;
//		}else{
//			return false;
//		} 

/* 表单验证 */
//(function($){
//$(function(){
//
//var msg={'tel':'请输入本人手机号','pwd':'6~20位字符，字母、数字和符号至少两种以上组合，区分大小写','pwd2':'请再次输入密码','code':'请填写验证码'}
//
//function tel(thiss){//手机验证函数
//    var mobile = $(thiss).val();
//    if( !mobile ) return {'state':0, 'msg':'手机号不能为空' }
//    var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
//    if(!reg.test(mobile)) return {'state':0, 'msg':'手机号码格式有误,请输入正确的手机号' }
//    return {'state':1};
//}
//
//function pwdblura(thiss){
//    var value = $(thiss).val();
//    var is_num = /^[0-9]+$/i;//全部为数字
//    var is_zm = /^[a-zA-Z]+$/i;//全部为字母
//    var is_len = /^.{6,20}$/i ; //长度
//
//    if( !value ) return {'state':0, 'msg':'请输入密码' }
//
//    if( is_num.test(value) ) return {'state':0, 'msg':'密码过于简单，请尝试“字母+数字”的组合' };
//
//    if( is_zm.test(value) ) return {'state':0, 'msg':'密码过于简单，请尝试“字母+数字”的组合' };
//    
//    if( value.length < 6 || value.length > 20 ) return {'state':0, 'msg':'密码长度应为6-20位字符' };
//
//    return {'state':1};
//}
//
//function pwd2blura(thiss){//两次密码不一样
//    var psw = $(thiss).val();
//    var password = $('input[name="pam_account[login_password]"]').val();
//    if( psw != password ) return {'state':0, 'msg':'两次输入密码不一致，请重新输入' };
//
//    return {'state':1};
//}
//
//function blbcode(){
//    var val1 = $('input[name="blbcode"]').val(); 
//    if( !val1 ) return {'state':0, 'msg':'请填写验证码' };
//    return {'state':1};
//}
//
//function is_empty(){
//    var val1 = $('input[name="vcode"]').val(); 
//    if( !val1 ) return {'state':0, 'msg':'请填写短信验证码' };
//    return {'state':1};
//}
//
//function fthideshow(val){// 显示 与 隐藏 短信发送按钮
//    if (val) {
//      $('#btnn').hide();
//      $('#btn').show();
//    }else{
//      $('#btnn').show();
//      $('#btn').hide();
//    };
//}
//
//function ftsubmit(val){// 显示 与 隐藏 注册按钮
//    if (!val) {
//      $('#spsubmit').hide();
//      $('#ftsubmit').show();
//    }else{
//      $('#spsubmit').show();
//      $('#ftsubmit').hide();
//    };
//}
//
//$(document).keyup(function(e){//是否显示 点击发送
//
//    var state = tel('input[name="pam_account[login_name]"]')
//    if (state['state']==0) {
//        fthideshow(0);
//        ftsubmit(0);
//        return false;
//    };
//
//    var state = pwdblura('input[name="pam_account[login_password]"]')
//    if (state['state']==0) {
//        fthideshow(0);
//        ftsubmit(0);
//        return false;
//    };
//
//    var state = pwd2blura('input[name="pam_account[psw_confirm]"]')
//    if (state['state']==0) {
//        fthideshow(0);
//        ftsubmit(0);
//        return false;
//    };
//
//    var state = blbcode('input[name="blbcode"]')
//    if (state['state']==0) {
//        fthideshow(0);
//        ftsubmit(0);
//        return false;
//    };    
//
//    fthideshow(1);
//
//    var state = is_empty()
//    if (state['state']==0) {
//        ftsubmit(0);
//        return false;
//    };   
//
//    ftsubmit(1);
//
//});   
//
//ftsubmit(0)
//
//function convert(x,thiss){
//     switch(x){
//     case 'tel':
//            return tel(thiss)
//     case 'pwd':
//            return pwdblura(thiss)
//     case 'pwd2':
//            return pwd2blura(thiss)
//     case 'blbcode':
//            return blbcode(thiss)            
//     default:
//            return is_empty()
//     }
//}
//
//// 元素得到焦点
//$('input[type="text"],input[type="password"]').focus(function(){
//    var tel = $(this).attr('tel')
//    var blurcon = $(this).parentsUntil('tr').find('.p2')
//    blurcon.show()
//    if (tel=='blbcode') {
//    }else{
//      blurcon.text(msg[tel]);    
//    };    
//    
//    $(this).parentsUntil('tr').find('.ft-error').remove();
//});
//
//// 元素失去焦点
//$('input[type="text"],input[type="password"]').blur(function(){
//    var tel = $(this).attr('tel')
//    var blurcon = $(this).parentsUntil('tr').find('.p2')
//    if (tel=='blbcode') {
//    }else{
//      blurcon.hide()
//      blurcon.text('');      
//    };
//
//    $(this).parentsUntil('tr').find('.ft-error').remove();
//
//    var state = convert(tel,this)
//    if (state['state']==0) {
//        var tpl='<span class="ft-error caution mob-error notice-inline" style="overflow: auto;width: 600px;"><q class="icon" style="color:#b14c49">!</q><span class="caution-content" style="font-size: 12px;color:red">{$content}</span></span>';       
//        tpl = tpl.replace('{$content}',state['msg']);
//        $(this).after(tpl);
//        return false;
//    };  
//
//});
//
//
//})
//})(jQuery);