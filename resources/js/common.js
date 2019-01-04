// 共通Script

// 画面遷移時のfaadein / fadeout 機能
window.addEventListener('load', function() {
  var b = document.querySelector('body');
  b.classList.remove('fadeout');
});

// イベントトリガー（明示的にイベント発火）
var triggerEvent = (function(element, event) {
  if (document.createEvent) {
    // IE以外
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true); // event type, bubbling, cancelable
    return element.dispatchEvent(evt);
  } else {
    // IE
    var evt = document.createEventObject();
    return element.fireEvent("on"+event, evt)
  }
});

// var toWorkDetailTransition = (function() {
//   // work.html 画面遷移用Script
//   // tableの行データを取得
//   var targets = document.querySelectorAll('table tr.work-item');
//   Array.from(targets).forEach(target => {
//     target.addEventListener('click', function(element) {
//       toWorkDetail(target);
//     }, false);
//   });
   
//   function toWorkDetail(target) {
//     // var tbody = this.parentNode;
//     console.log(target);
//     // console.log(element.getAttribute('tr-row'));
//     // window.location.href = './work_detail.html'; // 通常の遷移
//     Barba.Pjax.goTo('./work_detail.html')
//   }
// });
// // barba用に呼び出しておく。
// toWorkDetailTransition();

// DOMのStyleで定義されている値を取得する。
var getStyleSheetValue = (function(elem, prop) {
  if (!elem || !prop) {
    return null;
  }

  var style = window.getComputedStyle(elem);
  var value = style.getPropertyValue(prop);

  return value;
});

// スマホのハンバーガーメニューイベント
var hm = document.querySelector(".menu-trigger");
if (hm) {
  hm.addEventListener("click", function() {
    var gn = document.querySelector(".globalnav");
    if (this.classList.contains("active")) {
      this.classList.remove("active");
      gn.classList.remove("active");
    } else {
      this.classList.add("active");        
      gn.classList.add("active");
    }
  }, false);
}


AOS.init({
  duration: 1000,
  delay: 200
});

