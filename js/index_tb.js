/**
 * Created by xc
 *
 * 淘宝首页交互效果
 */


var xcTb = {};

xcTb.init = function(){
    fixSearchFn(); //固定的搜索框;

    fixNavFn(); //右侧固定导航交互

    guessLikeFn();//猜你喜欢部分

    marketFn();
    
    qrCodeFn();
    headlineFn();

    myOftenFn();
    
};

xcTb.init();  //页面初始化调用

function marketFn(){
    var mainNav = document.getElementById('mainNav');
    var slideSpan = mainNav.getElementsByClassName('num')[0];

    market();  //调用显示影藏的函数
    notice() ;//notice部分的交互
    aliApp();
    lifeService();
//市场部分的显示隐藏
    function market(){
        var marketBd = mainNav.getElementsByClassName('market_bd')[0];
        var marketBdLists = marketBd.getElementsByTagName('li');
        var marketWrap = mainNav.getElementsByClassName('market_wrap')[0];
        var marketContents = marketWrap.getElementsByClassName('market_content');
        var marketTimer = null;
        // console.log(marketBd.length)
        // console.log(marketBdLists.length)
        //console.log(marketContents.length)
        //console.log('hello')
        for( var i = 0; i < marketBdLists.length; i++ ){

            marketBdLists[i].index = i;
            marketBdLists[i].onmouseenter = function () {
                //alert(1)
                clearTimeout(marketTimer);
                marketWrap.style.display = 'block';
                startMove( marketWrap, { opacity: 100 }, 7, 17)  //让其有一个透明度的变化
                for( var i = 0; i < marketContents.length; i++ ){
                    marketContents[i].style.display = 'none';
                }
                marketContents[this.index].style.display = 'block';
            };
            marketBdLists[i].onmouseleave= function () {
                //alert(1)
                marketTimer = setTimeout(function(){
                    marketWrap.style.display = 'none';
                    startMove( marketWrap, { opacity: 0}, 7, 17)
                    for( var i = 0; i < marketContents.length; i++ ){
                        marketContents[i].style.display = 'none';
                    }
                },100)
            };


        }
        marketWrap.onmouseenter = function (){
            clearTimeout( marketTimer )
        }
        marketWrap.onmouseleave = function (){
            marketTimer = setTimeout( function(){
                marketWrap.style.display = 'none';
                startMove( marketWrap, { opacity: 0}, 7, 17)
                for( var i = 0; i < marketContents.length; i++ ){
                    marketContents[i].style.display = 'none';
                }
            }, 100 )
        }

    }



//notice部分的js交互
    function notice(){
        var noticeTab = mainNav.getElementsByClassName('notice_tab')[0];
        var noticeTabs = noticeTab.getElementsByTagName('li');
        var noticeContent = mainNav.getElementsByClassName('notice_content')[0];
        var noticeContentDivs = noticeContent.getElementsByTagName('div');
        for( var i = 0; i < noticeTabs.length; i++ ){
            noticeTabs[i].index = i;
            noticeTabs[i].onmouseenter = function () {

                for( var i = 0; i < noticeTabs.length; i++ ){
                    noticeTabs[i].className = '';
                    noticeContentDivs[i].style.display = 'none';
                }
                this.className = 'active';
                noticeContentDivs[this.index].style.display = 'block';

            };
        }
    }
//阿里app的js交互

    function aliApp(){
        var appNav = mainNav.getElementsByClassName('app_nav')[0];
        var appNavlists = appNav.getElementsByTagName('a');
        var appQrs = appNav.getElementsByClassName('app_qr');
        //console.log(appQrs)
        for( var i = 0; i < appNavlists.length; i++ ){
            appNavlists[i].index = i;
            appNavlists[i].onmouseenter = function () {
                //alert(1)
                appQrs[this.index].style.display = 'block';
            }
            appNavlists[i].onmouseleave = function () {
                //alert(1)
                appQrs[this.index].style.display = 'none';
            }

        }
    }


   slideFn( 'slide1', 'slide_list','circle_nav1',3000 )
//slideFn2()
    slideFn( 'slide2', 'slide_list','circle_nav2',2000,slideSpan );
    function slideFn(slideBoxName, slideUl, slideBtn, time,obj){
        var slide = mainNav.getElementsByClassName('slide')[0];
        var slideBox = slide.getElementsByClassName(slideBoxName)[0];
        var slideList = slideBox.getElementsByClassName(slideUl)[0]
        var circleButtons = slideBox.getElementsByClassName(slideBtn)[0].getElementsByTagName('li');//取得圆点
        var slideListLi = slideList.getElementsByTagName('li')
        var prev = slideBox.getElementsByClassName('prev')[0];
        var next = slideBox.getElementsByClassName('next')[0];

        var nowIndex = 0; //控制小圆点的索引
        var num = 1;//为了实现无缝
        var lens = slideListLi.length
        console.log(lens)
        var left = parseInt(slideList.style.left)
        var slideTimer = null;
        var animated = false;  //当前是否在运动中，解决连续多次点击的bug;

        slideList.style.width = slideListLi[0].offsetWidth * lens + 'px'

        //console.log(slideListLi[0].offsetWidth * slideListLi.length)
        slideBox.onmouseover = function(){
            clearInterval( slideTimer )
            prev.style.display = 'block';
            next.style.display = 'block';

        };

        slideBox.onmouseout = function(){

            prev.style.display = 'none';
            next.style.display = 'none';
            slideTimer = setInterval(function(){
                toNext();
            }, time)

        };



        next.onclick = function(){
            if( !animated ){
                toNext();
            }
        };
        prev.onclick = function(){
            if( !animated ){
                toPrev();
            }
        }
        //圆点的切换
        function showCircle(index){
            for( var i = 0; i<circleButtons.length;i++){
                circleButtons[i].className = '';
            }
            circleButtons[index].className = 'active'
        }
        //每个小圆点的点击切换
        for(var i = 0; i<circleButtons.length;i++){
            circleButtons[i].index = i;
            circleButtons[i].onclick = function(){
                nowIndex = this.index;  //同时小圆点的索引值也要对应;
                num = this.index + 1;   //index 是从0开始的
                for( var i = 0; i<circleButtons.length;i++){
                    circleButtons[i].className = '';
                }
                this.className = 'active';
                startMove(slideList, { left: -520 * (this.index + 1) }, 7, 30);
                if(obj){
                    slideSpan.innerHTML = this.index + 1;
                }
            }
        }
        //自动播放
        slideTimer = setInterval(function(){
            toNext();
        },time);

        function toNext(){
            animated = true;
            num++;
            if(nowIndex === circleButtons.length - 1){
                nowIndex = 0;
            }else{
                nowIndex++;
            }
            if(obj){
                obj.innerHTML = nowIndex + 1;
            }
            showCircle(nowIndex);
            startMove( slideList, { left: -num * 520 }, 7, 30, function(){
                if(num >= lens - 1 ){
                    num = 1;
                    slideList.style.left = '-520px';
                }
                animated = false;
            })
        };

        function toPrev(){
            animated = true;
            num--;
            if( nowIndex === 0){
                nowIndex = circleButtons.length  - 1;
            }else{
                nowIndex--;
            }
            if(obj){
                obj.innerHTML = nowIndex + 1;
            }
            showCircle(nowIndex);
            startMove( slideList, { left: -num * 520 }, 7, 30, function(){
                if(num <= 0 ){ //当图片走到第五张图片的副本时，就让副本图片变成真正的第五张所在位置;
                    num = lens - 2 ;
                    slideList.style.left = -num * 520 +'px';
                };
                animated = false;
            });
        }
    }
    function slideFn1(){
        var slide = mainNav.getElementsByClassName('slide')[0];
        var slide1 = slide.getElementsByClassName('slide1')[0];
        var slideList = slide1.getElementsByClassName('slide_list')[0]
        var circleButtons = slide1.getElementsByClassName('circle_nav1')[0].getElementsByTagName('li');//取得圆点
        var slideListLi = slideList.getElementsByTagName('li')
        var prev = slide1.getElementsByClassName('prev')[0];
        var next = slide1.getElementsByClassName('next')[0];

        var nowIndex = 0; //控制小圆点的索引
        var num = 1;//为了实现无缝
        var lens = slideListLi.length
        var left = parseInt(slideList.style.left)
        var slideTimer = null;
        var animated = false;  //当前是否在运动中，解决连续多次点击的bug;

        slideList.style.width = slideListLi[0].offsetWidth * lens + 'px'

        //console.log(slideListLi[0].offsetWidth * slideListLi.length)
        slide1.onmouseover = function(){
            clearInterval( slideTimer );
            prev.style.display = 'block';
            next.style.display = 'block';

        };
        slide1.onmouseout = function(){

            prev.style.display = 'none';
            next.style.display = 'none';
            slideTimer = setInterval(function(){
                toNext();
            }, 2000)


        };

        next.onclick = function(){
            if( !animated ){
                toNext();
            }
        };
        prev.onclick = function(){
            if( !animated ){
                toPrev();
            }
        };
        //圆点的切换
        function showCircle(index){
            for( var i = 0; i<circleButtons.length;i++){
                circleButtons[i].className = '';
            }
            circleButtons[index].className = 'active'
        }
        //每个小圆点的点击切换
        for(var i = 0; i<circleButtons.length;i++){
            circleButtons[i].index = i;
            circleButtons[i].onclick = function(){
                nowIndex = this.index;  //同时小圆点的索引值也要对应;
                num = this.index + 1;   //index 是从0开始的
                for( var i = 0; i<circleButtons.length;i++){
                    circleButtons[i].className = '';
                }
                this.className = 'active';
                startMove(slideList, { left: -520 * (this.index + 1) }, 7, 30)
            }
        }
        //自动播放
        slideTimer = setInterval(function(){
            toNext();
        },2000);

        function toNext(){
            animated = true;
            num++;
            if(nowIndex === 4){
                nowIndex = 0;
            }else{
                nowIndex++;
            }
            showCircle(nowIndex);
            startMove( slideList, { left: -num * 520 }, 7, 30, function(){
                if(num >= lens - 1 ){
                    num = 1;
                    slideList.style.left = '-520px';
                }
                animated = false;
            })
        }

        function toPrev(){
            animated = true;
            num--;
            if( nowIndex === 0){
                nowIndex = 4;
            }else{
                nowIndex--;
            }
            showCircle(nowIndex);
            startMove( slideList, { left: -num * 520 }, 7, 30, function(){
                if(num <= 0 ){ //当图片走到第五张图片的副本时，就让副本图片变成真正的第五张所在位置;
                    num = lens - 2 ;
                    slideList.style.left = '-2600px';
                }
                animated = false;
            });
        }

    }


    function slideFn2(){
        var slide = mainNav.getElementsByClassName('slide')[0];
        var slideBox = slide.getElementsByClassName('slide2')[0];
        var slideList = slideBox.getElementsByClassName('slide_list')[0]
        var circleButtons = slideBox.getElementsByClassName('circle_nav2')[0].getElementsByTagName('li');//取得圆点
        var slideListLi = slideList.getElementsByTagName('li')
        var prev = slideBox.getElementsByClassName('prev')[0];
        var next = slideBox.getElementsByClassName('next')[0];
        var slideSpan = mainNav.getElementsByClassName('num')[0];

        var nowIndex = 0; //控制小圆点的索引
        var num = 1;//为了实现无缝
        var lens = slideListLi.length;
        //console.log(lens);
        var left = parseInt(slideList.style.left);
        var slideTimer = null;
        var animated = false;  //当前是否在运动中，解决连续多次点击的bug;

        slideList.style.width = slideListLi[0].offsetWidth * lens + 'px';

        //console.log(slideListLi[0].offsetWidth * slideListLi.length)
        slideBox.onmouseover = function(){
            clearInterval( slideTimer )
            prev.style.display = 'block';
            next.style.display = 'block';

        };


        slideBox.onmouseout = function(){

            prev.style.display = 'none';
            next.style.display = 'none';
            slideTimer = setInterval(function(){
                toNext();
            }, 2000)

        };



        next.onclick = function(){
            if( !animated ){
                toNext();
            }
        };
        prev.onclick = function(){
            if( !animated ){
                toPrev();
            }
        };
        //圆点的切换
        function showCircle(index){
            for( var i = 0; i<circleButtons.length;i++){
                circleButtons[i].className = '';
            }
            circleButtons[index].className = 'active'
        }
        //每个小圆点的点击切换
        for(var i = 0; i<circleButtons.length;i++){
            circleButtons[i].index = i;
            circleButtons[i].onclick = function(){
                nowIndex = this.index;  //同时小圆点的索引值也要对应;
                num = this.index + 1;   //index 是从0开始的
                for( var i = 0; i<circleButtons.length;i++){
                    circleButtons[i].className = '';
                }
                this.className = 'active';
                startMove(slideList, { left: -520 * (this.index + 1) }, 7, 30)
            }
        }
        //自动播放
        slideTimer = setInterval(function(){
            toNext();
        },2000)

        function toNext(){
            animated = true;
            num++;
            if(nowIndex === circleButtons.length - 1){
                nowIndex = 0;
            }else{
                nowIndex++;
            }
            slideSpan.innerHTML = nowIndex +1;
            showCircle(nowIndex);
            startMove( slideList, { left: -num * 520 }, 7, 30, function(){
                if(num >= lens - 1 ){
                    num = 1;
                    slideList.style.left = '-520px';
                }
                animated = false;
            })


        };

        function toPrev(){
            animated = true;
            num--;
            if( nowIndex === 0){
                nowIndex = circleButtons.length  - 1;
            }else{
                nowIndex--;
            }
            slideSpan.innerHTML = nowIndex+1;
            showCircle(nowIndex);
            startMove( slideList, { left: -num * 520 }, 7, 30, function(){
                if(num <= 0 ){ //当图片走到第五张图片的副本时，就让副本图片变成真正的第五张所在位置;
                    num = lens - 2 ;
                    slideList.style.left = -num * 520 +'px';
                };
                animated = false;
            });
        }



    }

    function lifeService(){
        var serviceList = mainNav.getElementsByClassName('service_list')[0];

        var serviceListLis = serviceList.getElementsByTagName('li');
        var serviceWrap = mainNav.getElementsByClassName('service_drop_wrap')[0];

        var serviceDropHd = serviceWrap.getElementsByClassName('service_drop_hd')[0];
        var serviceDropTabs = serviceDropHd.getElementsByTagName('a');
        var rechargeWrap = serviceWrap.getElementsByClassName('recharge_wrap')[0];



        var oCloseBtn = serviceWrap.getElementsByClassName('close')[0];
        var aRecharge = serviceWrap.getElementsByClassName('recharge');
//关闭按钮  点击  li的class移除；serviceWrap隐藏；
        oCloseBtn.onclick = function () {
            serviceWrap.style.display = 'none';

            for( var i = 0; i < 4; i++ ){
                removeClass(serviceListLis[i],'hover')
            }
        };

        //前四个li的移入移除控制下拉盒子的显示影藏
        for( var i = 0; i < 4; i++){
            serviceListLis[i].onmouseover = function () {
                for( var i = 0; i < 4; i++ ){
                    removeClass(serviceListLis[i],'hover');
                }
                addClass(this,'hover');
                serviceWrap.style.display = 'block'
            }
        }
        //下拉框内的选项卡切换效果，有运动效果;
        for(var i = 0; i< serviceDropTabs.length;i++ ){
            serviceDropTabs[i].index = i;
            serviceDropTabs[i].onmouseover = function () {
                for(var i = 0; i< serviceDropTabs.length;i++){
                    serviceDropTabs[i].className = '';
                }
                this.className = 'active';
                startMove( rechargeWrap, { left:- this.index * 273}, 3,30);
            }
        }
    }





}

function qrCodeFn() {

    var qrClose = document.getElementsByClassName('qr_close')[0];
    var qr = document.getElementsByClassName('qr')[0];

    //二维码的关闭;
    qrClose.onclick = function () {
        qr.style.display = 'none';
        return false; //  阻止a链接的默认行为;
    };
    /*
     * 搜索框的点击切换;
     * */
    var searchWrap = document.getElementsByClassName('search_wrap')[0];
    var searchTab = searchWrap.getElementsByClassName('search_tab')[0];
    var searchTabs = searchTab.getElementsByTagName('li'); //获取三个选项按钮
    var searchBds = document.getElementsByClassName('search_bd');

    var searchTexts = searchWrap.getElementsByClassName('search_text');
//一上来就获得焦点s
    searchTexts[0].focus();

    //console.log(searchTabs); 获取OK
//console.log(searchBds)
//文本搜索框的切换；
    for( var i = 0; i < searchTabs.length; i++ ){
        searchTabs[i].index = i;
        searchTabs[i].onclick = function () {
            for( var i = 0; i < searchTabs.length; i++ ){
                searchBds[i].style.display = 'none';
                searchTabs[i].className = '';
            }
            this.className = 'active';
            searchBds[this.index].style.display = 'block';
            searchTexts[this.index].focus();
        };
    }
//天猫点击时使用的是active2的class；
    searchTabs[1].onclick = function () {
        for( var i = 0; i < searchTabs.length; i++ ){
            searchBds[i].style.display = 'none';
            searchTabs[i].className = '';
        }
        this.className = 'active2';
        searchBds[1].style.display = 'block';
        searchTexts[1].focus();
    };

}

function headlineFn() {
    //淘宝头条的运动切换
    var oMainBody = document.getElementById('mainBody');
    var oHeadLine = oMainBody.getElementsByClassName('headline')[0];
    var oHlContent = oHeadLine.getElementsByClassName('hl_content')[0];
    var oHlWrap = oHlContent.getElementsByClassName('hl_wrap')[0];
    var num = 0; //记录当前的运动状态值
    oHeadLine.flag = true;  //控制正反方向;
    oHeadLine.timer = null;
    //console.log(typeof oHlContent)

    console.log(oMainBody.length, oHeadLine.length , oHlContent.length, oHlWrap.length,1);

    oHeadLine.timer = setInterval(function () {
        startMove( oHlWrap, { top: -num * 60 }, 7, 16);
        if( oHeadLine.flag ){
            if( num < 2 ){
                num++;
            }else{
                num--;
                oHeadLine.flag = false;
            }
        }else{
            if( num>0 ){
                num --;
            }else{
                num ++;
                oHeadLine.flag = true;
            }
        }
    },2000);

    oHlContent.onmouseenter = function () {
        clearInterval( oHeadLine.timer );
    };

    oHlContent.onmouseleave = function () {
        oHeadLine.timer = setInterval(function () {
            startMove(oHlWrap, { top: -num * 60 }, 7, 16);
            if(oHeadLine.flag){
                if( num < 2 ){
                    num++;
                }else{
                    num--;
                    flag = false;
                }
            }else{
                if(num>0){
                    num --;
                }else{
                    num ++;
                    oHeadLine.flag = true;
                }
            }
        },2000);
    };
}
function myOftenFn() {
    var oftenVisit = document.getElementsByClassName('often_visit')[0];
    var rightBls = oftenVisit.getElementsByClassName('right_bl');
    var wrapMove = oftenVisit.getElementsByClassName('wrap_move');
    //console.log(rightBls.length)
    for( var i = 0; i<rightBls.length;i++ ){
        rightBls[i].index = i;
        rightBls[i].onmouseover = function () {
            startMove( wrapMove[this.index] , { bottom: 0 }, 8 , 17)
            //return false;
        };
        rightBls[i].onmouseout = function () {
            startMove( wrapMove[this.index] , { bottom: -72 }, 8 , 17)
        }
    }
}
function fixSearchFn(){
    var fixedSearch = document.getElementById('fixSearch');
    /*
     window.onscroll = function(){
         var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

         if( scrollTop >= 130 ){
         fixedSearch.style.top = 0;
         }else{
         fixedSearch.style.top = '-49px';
         }
     }
     */
//这里采用DOM2级事件绑定,可以重复绑定多个事件;非标准IE  attachEvent绑定，此处不做兼容处理；

    window.addEventListener('scroll',scrollShow,false);

    function scrollShow() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if( scrollTop >= 130 ){
            fixedSearch.style.top = 0;
        }else{
            fixedSearch.style.top = '-49px';
        }
    }
}
function fixNavFn() {
    var oFixedNav = document.getElementById('fixed_nav');
    var oMainBody = document.getElementById('mainBody');
    var oTop = oFixedNav.getElementsByClassName('top')[0];
    var aFixedNavBtn = oFixedNav.getElementsByTagName('li');
    var topTimer = null;
    var btnTimer = null;
    var oOftenVisit = oMainBody.getElementsByClassName('often_visit')[0];

    var oFashion = oMainBody.getElementsByClassName('fashion')[0];

    var oQuanlity = oMainBody.getElementsByClassName('quanlity')[0];

    var oFeature = oMainBody.getElementsByClassName('feature')[0];

    var oCheap = oMainBody.getElementsByClassName('cheap')[0];

    var oGuessLikeBtn = oFixedNav.getElementsByClassName('guess_like')[0];
    var oGuesslike = document.getElementById('guesslike');

    var targetPos6 = getPos(oGuesslike).top -100;
    var targetPos5 = getPos(oCheap).top -100;

    var targetPos4 = getPos(oFeature).top -100;

    var targetPos3 = getPos(oQuanlity).top -100;

    var targetPos2 = getPos(oFashion).top -100;
    var targetPos1 = getPos(oOftenVisit).top -100;

    var arrPos = [targetPos1,targetPos2,targetPos3,targetPos4,targetPos5,targetPos6];//存放目标位置;
    var arrActiveClass = ['active1','active2','active3','active4','active5','active6'];
    var pause = 0;//控制当前是由谁触发的滚动事件，解决Bug


    window.addEventListener('scroll',scrollFixNav,false);

    /*window.onscroll = function(){
     var scroll = document.documentElement.scrollTop || document.body.scrollTop;
     //顶部按钮的出现与隐藏
     if(scroll >= 690){
     oTop.style.display  = "inline-block";
     oFixedNav.style.background = '#fff';
     }else{
     oTop.style.display = "none";
     }

     if(scroll >= 464){
     oFixedNav.style.position = 'fixed';
     oFixedNav.style.top      = '28px';
     }else{
     oFixedNav.style.position = 'absolute';
     oFixedNav.style.top      = '490px';
     }
     if( pause!==1 ){ //如果当前事件不是由定时器触发
     clearInterval( topTimer )
     }
     pause = 2;

     };*/

    function scrollFixNav(){
        var scroll = document.documentElement.scrollTop || document.body.scrollTop;
        //顶部按钮的出现与隐藏
        if(scroll >= 690){
            oTop.style.display  = "inline-block";
            oFixedNav.style.background = '#fff';
        }else{
            oTop.style.display = "none";
        }

        if(scroll >= 464){
            oFixedNav.style.position = 'fixed';
            oFixedNav.style.top      = '28px';
        }else{
            oFixedNav.style.position = 'absolute';
            oFixedNav.style.top      = '490px';
        }


        if( pause!==1 ){ //如果当前事件不是由定时器触发
            clearInterval( topTimer );

        }
        if( pause !== 3){
            clearInterval( btnTimer );
        }
        pause = 2;
    }

    returnTop(); //返回顶部;
    returnPos(oGuessLikeBtn, arrPos[5],arrActiveClass[6]);
    //点击运动到指定位置;
    for(var i = 0;i<arrPos.length;i++){

        returnPos(aFixedNavBtn[i], arrPos[i],arrActiveClass[i]);

    }


    //返回顶部;
    function returnTop(){
        oTop.onclick = function(){

            clearInterval( topTimer );
            var iCur = iSpeed = 0;

            topTimer = setInterval(function() {

                iCur = document.documentElement.scrollTop || document.body.scrollTop;

                iSpeed = Math.floor( ( 0 - iCur ) / 8 );

                if ( iCur == 0 ) {
                    clearInterval( topTimer );
                } else {
                    document.documentElement.scrollTop = document.body.scrollTop = iCur + iSpeed;
                }

                pause = 1; //告知当前运动是由定时器触发

            }, 30);
        }
    }


    //封装返回值定位值的函数;  重复可利用;
    function returnPos( obj, targetPosition,activeClass ){

        obj.onclick = function(){
            //移除所有active class
            for(var i = 0; i < arrPos.length;i++ ){
                removeClass(aFixedNavBtn[i] ,arrActiveClass[i]);
            }
            //当前的添加
            addClass( this,activeClass);
            clearInterval( btnTimer );
            var iSpeed = 0;
            var iCur = 0;
            btnTimer = setInterval(function(){
                iCur = document.documentElement.scrollTop || document.body.scrollTop;
                iSpeed = (targetPosition - iCur)/8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                document.documentElement.scrollTop += iSpeed;
                document.body.scrollTop += iSpeed;
                var scroll = document.documentElement.scrollTop || document.body.scrollTop;
                if(scroll == targetPosition){
                    clearInterval(btnTimer);
                }
                pause= 3; //告知当前运动是由定时器触发
            },30);
        }
    }

}

function guessLikeFn(){
    var oGuessLike = document.getElementById('guesslike');
    var guessListLis = oGuessLike.getElementsByTagName('li');
    var similarMores = oGuessLike.getElementsByClassName('similar_more');
    for(var i = 0; i<guessListLis.length;i++){
        guessListLis[i].index = i;
        guessListLis[i].onmouseover = function(){
            similarMores[this.index].style.display = 'block';
            startMove(similarMores[this.index], {opacity: 100},7,30);
        };
        guessListLis[i].onmouseout = function(){
            similarMores[this.index].style.display = 'none';
            startMove(similarMores[this.index], {opacity: 0},7,30);
        }
    }

}
//封装获取绝对位置的函数;
function getPos(obj){
    var pos = { left: 0, top: 0 };
    while(obj){
        pos.left += obj.offsetLeft;
        pos.top  += obj.offsetTop;
        obj      = obj.offsetParent;
    }
    return pos;
}

function addClass(obj, className) {

    if (obj.className == '') {
        obj.className = className;
    } else {
        var arrClassName = obj.className.split(' ');
        if ( arrIndexOf(arrClassName, className) == -1 ) {
            obj.className += ' ' + className;
            /*arrClassName.push(className);
             obj.className = arrClassName.join(' ');*/
        }
    }



}

function removeClass(obj, className) {

    if (obj.className != '') {
        var arrClassName = obj.className.split(' ');
        var _index = arrIndexOf(arrClassName, className);
        if ( _index != -1 ) {
            arrClassName.splice(_index, 1);
            obj.className = arrClassName.join(' ');
        }
    }

}
function arrIndexOf(arr, v) {
    for (var i=0; i<arr.length; i++) {
        if (arr[i] == v) {
            return i;
        }
    }
    return -1;
}
