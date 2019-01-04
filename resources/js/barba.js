// ファイル読み込み
// anime.js / barba.js

// Barba.Pjax.start();
Barba.Prefetch.init();
var PageTransition = Barba.BaseTransition.extend({
    start: function() {

        Promise
            .all([this.newContainerLoading, this.loadOut()])
            .then(this.loadIn.bind(this));
    },
    loadOut: function(resolve) {
      // anime.js版(調整要)
      // var _this = this;
      // return new Promise(function(resolve, reject) {
      //     anime({
      //         targets: _this.oldContainer,
      //         opacity: 0,
      //         // translateX: '-20vw',
      //         transition: "all .3s linear 0"
      //         // easing: "easeOutBack"
      //         // easing: "easeInOutQuart"
      //     });
      //     setTimeout(function () {
      //       resolve();
      //     }, 700);
      // })

      return $(this.oldContainer).animate({ opacity: 0 }, 1000).promise();
    },
    loadIn: function() {
      // anime.js版(調整要)
      // var _this = this;
      // console.log(_this.oldContainer);
      // // 非表示
      // _this.oldContainer.style.visibility="hidden";
      // // this.newContainer
      // window.scrollTo(0, 0);
      // anime({
      //     targets: _this.newContainer,
      //     opacity: 1,
      //     transition: "all .3s linear 0"
      //     // duration: 1000,
      //     // translateY: ['80vw', 0],
      //     // easing: 'easeInOutQuart'
      // });
      // _this.done();
      // // $(this.oldContainer).hide();
      // // 完了
      // // setTimeout(function () {
      // //   _this.done();
      // // }, 500);

      var _this = this;
      var $el = $(this.newContainer);
      $('html,body').animate({scrollTop: 0}, 1000, 'swing');
      $(this.oldContainer).hide();

      $el.css({
        visibility : 'visible',
        opacity : 0
      });

      $el.animate({ opacity: 1 }, 1000, function() {
        /**
         * 遷移が終了したら.done()を呼び出すのを忘れないでください！
         * .done()は自動的にDOMから古いコンテナを削除します。
         */

        _this.done();

        setTimeout(function() {
          console.log(456);
          // AOS.refresh();
          AOS.init({
            duration: 1000,
            delay: 200
          });
        }, 50);

      });
    },
});

Barba.Pjax.getTransition = function() {
    return PageTransition;
};
Barba.Pjax.start();

// jsの再読込処理
Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, newPageRawHTML) {

  var js = container.getElementsByTagName("script");
  if(js != null){
    var jsCount = js.length;
    for (var i = 0; i < jsCount; i+=1) {
      if(js[i].src !== ''){
        var addJs = document.createElement("script");

        addJs.src = js[i].src;
        document.body.appendChild(addJs);

      } else {
        eval(js[i].innerHTML);
      }
    }
  }

  // work.html 画面遷移用Script
  // tableの行データを取得
  // toWorkDetailTransition();


  var hm = document.querySelector(".menu-trigger");
  var gn = document.querySelector(".globalnav");
  hm.classList.remove("active");
  gn.classList.remove("active");


  // setTimeout(function() {
  //   console.log(456);
  //   AOS.refresh();
  //   // AOS.init({
  //   //   duration: 1000,
  //   //   delay: 200
  //   // });
  // }, 1500);


  // loadEvent実行
  // triggerEvent(document.body, 'load');


  // var js = container.getElementsByTagName("script");
  // console.log(js);
  // var script = document.createElement('script');
  // script.src = 'js/app.min.js';
  // document.body.appendChild(script);

  // var targets = document.querySelectorAll('table tr.work-item');

  // Array.from(targets).forEach(target => {
  //   target.addEventListener('click', sample, false);
  // });
   
  // function sample() {
  //   // var tbody = this.parentNode;
  //   // console.log(this.getAttribute('tr-row'));
  //   // window.location.href = './work_detail.html'; // 通常の遷移
  //   Barba.Pjax.goTo('./work_detail.html')
  // }


});
