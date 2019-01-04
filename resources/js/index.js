window.addEventListener('load', function() {
  var b = document.querySelector('body');
  b.classList.remove('fadeout');
});

// Three.jsのアニメーション
TopAnimation();
// 表示時のアニメーション
AppMotion();

// window.addEventListener('DOMContentLoaded', function(event) {
//   // ハッシュリンク(#)と別ウィンドウでページを開く場合はスルー
//   console.log('123');
//   var link = document.querySelectorAll('a:not([href^="#"]):not([target])');
//   console.log('223');
//   Array.prototype.forEach.call(link, function(elem) {
//     elem.addEventListener('click', function(event) {
//       console.log('323');
//       pageTransition(event, elem);
//     }, false);
//   });

//   console.log('DOMContentLoaded');
//   var el = document.querySelector('.logo-name .a-ln10');
//   console.log(el);
//   el.addEventListener('animationend', function() {
//       console.log('animationend');
//       // animation終了時の処理
//       // alert('animationend');
//       var bg = document.querySelectorAll('.load-bg');
//       bg.forEach(function(item) {
//         item.classList.add('load-end');
//       });
//       // bg.classList.add('load-end')
//       var logo = document.querySelector('.logo-name');
//       logo.classList.add('load-end')
//       var bat = document.querySelector('.button-area-top');
//       bat.classList.add('load-end')
//       // start();
//   });


// });

// js自体を動的に読み込んでいるため、DOMContentLoadedのイベントで設定するのではなく、
// 即時イベント設定をするように修正
var link = document.querySelectorAll('a:not([href^="#"]):not([target])');
Array.prototype.forEach.call(link, function(elem) {
  elem.addEventListener('click', function(event) {
    pageTransition(event, elem);
  }, false);
});

var el = document.querySelector('.logo-name .a-ln10');
el.addEventListener('animationend', function() {
    // animation終了時の処理
    // alert('animationend');
    var bg = document.querySelectorAll('.load-bg');
    bg.forEach(function(item) {
      item.classList.add('load-end');
    });
    // bg.classList.add('load-end')
    var logo = document.querySelector('.logo-name');
    const isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);
    logo.classList.add('load-end')
    if (isIOS) {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1){
        // ここにSafari用の記述
        // iOSのChromeではない判定
        if(!(navigator.userAgent.indexOf("CriOS") >= 0)) {
          //処理
          console.log('ios-fafari');
          logo.classList.add('load-end-safari');
        } else {
          console.log('ios-chrome');
          logo.classList.add('load-end-chrome');
        }
      }
    }

    var bat = document.querySelector('.button-area-top');
    bat.classList.add('load-end')

    // start();
});


var pageTransition = (function(event, elem) {
  event.preventDefault(); // ナビゲートをキャンセル
  var url = elem.getAttribute('href');
  if (url !== '') {
    var b = document.querySelector('body');
    b.classList.add('fadeout');
    setTimeout(function() {
      window.location = url;
    }, 1500);
  }
  return false;
});



// $(window).on('load', function(){
//   $('body').removeClass('fadeout');
// });
        
// $(function() {
//   // ハッシュリンク(#)と別ウィンドウでページを開く場合はスルー
//   $('a:not([href^="#"]):not([target])').on('click', function(e){
//     e.preventDefault(); // ナビゲートをキャンセル
//     url = $(this).attr('href'); // 遷移先のURLを取得
//     if (url !== '') {
//       $('body').addClass('fadeout');  // bodyに class="fadeout"を挿入
//       setTimeout(function(){
//         window.location = url;  // 0.8秒後に取得したURLに遷移
//       }, 1500);
//     }
//     return false;
//   });
// });
