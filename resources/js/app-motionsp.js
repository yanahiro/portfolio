var AppMotion = (function(am) {
  am = (function() {

    const mocontainer_el = document.body.querySelector('#mo-container');
    const target_el = document.body.querySelector('.logo-name .logo-title');
    // 色定義
    const COLORS = {
      RED:      '#FD5061',
      YELLOW:   '#FFCEA5',
      BLACK:    '#29363B',
      WHITE:    'white',
      VINOUS:   '#00ff1d',
      BACKGROUND:   '#333'
    }

    const BG_OPTS = {
      radius:         200,                  // 半径
      scale:          { .25 : 3 },          // 縮尺（{実行前 : 実行後}） 
      duration:       1000,                  // 実行を完了するまでの時間
      easing:         'cubic.out',          // easingオプション 
      isForce3d:      true,                 // 不明
      isTimelineLess: true,                 // 不明
      parent:         mocontainer_el,
    }

    // 最初の大きな円を表現
    const whiteBg = new mojs.Shape({
      ...BG_OPTS,
      radius:         BG_OPTS.radius-2,
      fill:           COLORS.WHITE,
      parent:   mocontainer_el,
    });

    // whiteBgを輪にするための円
    const redBg = new mojs.Shape({
      ...BG_OPTS,
      fill:         COLORS.BACKGROUND,
      delay:        50,
      easing:       'quad.out',
      parent:   mocontainer_el,
    });

    // 
    const burst1 = new mojs.Burst({
      count:    9,
      radius:   { 50: 250 },
      parent:   mocontainer_el,
      children: {
        fill:   'white',
        shape:  'line',
        stroke: [ COLORS.WHITE, COLORS.VINOUS ],
        strokeWidth: 12, 
        radius: 'rand(30, 60)',
        radiusY: 0,
        scale: { 1: 0 },
        // duration: 800,
        pathScale: 'rand(.5, 1)',
        isForce3d: true,
        degreeShift: 'rand(-360, 360)',
        // angle: 90
      }
    });

    const burst2 = new mojs.Burst({
      count:  7,
      radius: { 0: 250 },
      parent:   mocontainer_el,
      children: {
        shape:      [ 'circle', 'rect' ],
        points:     5,
        fill:       [ COLORS.WHITE, COLORS.VINOUS ],
        radius:     'rand(30, 60)',
        scale:      { 1: 0 },
        pathScale:  'rand(.5, 1)',
        isForce3d:  true
      }
    });

    const CIRCLE_OPTS = {
      fill:     COLORS.WHITE,
      scale:    { .2: 1 },
      opacity: { 1: 0 },
      isForce3d: true,
      isShowEnd: false,
      parent:   mocontainer_el,
    }

    const circle1 = new mojs.Shape({
        ...CIRCLE_OPTS,
        radius:   200,
      });

    const circle2 = new mojs.Shape({
      ...CIRCLE_OPTS,
      radius:   240,
      easing: 'cubic.out',
      delay: 150,
    });




    // GEOMETRIC SHAPES
    const charOpts = {
      fill:         COLORS.WHITE,
      radius:       10,
      isForce3d:    true,
      isShowEnd:    false,
      parent:   mocontainer_el,
    }

    let CHAR_STEP  = 28;
    let SCALE_DOWN = .25;
    let SCALE_UP   = 2;
    let Y_SHIFT    = 0;
    let X_SHIFT    = CHAR_STEP/2;

    const SLAP_OPTS = {
      scaleX: SCALE_UP * 2,
      scaleY: SCALE_DOWN,
      y: Y_SHIFT,
      angle: 0,
      duration: 75
    }

    let SHIFTX = 4*CHAR_STEP;
    const bounceCurve = mojs.easing.path('M0,-100 C0,-100 15.6877613,115.487686 32.0269814,74.203186 C62.0118605,-1.559962 100.057489,-0.0941416292 100.057489,-0.0941416292');
    const nBounceCurve = (p) => { return 2 - bounceCurve(p) };


    const charFn1 = new mojs.Shape({
      ...charOpts,
      shape: 'rect',
      y: { [-100 + Y_SHIFT] : -200 },
      x: { [X_SHIFT]: 0.65*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      angle: -11,
      scaleX: { [SCALE_DOWN] : 2 },
      scaleY: { [SCALE_UP] : 2 },
      easing: 'quad.out',
      delay:  400,
    })
    .then({
      scaleX: { 2 : [SCALE_DOWN] },
      scaleY: { 2 : [SCALE_UP] },
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      x: { to: 1.3*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      angle: { 0: 11 },
      easing: 'sin.in',
    })
    .then(SLAP_OPTS)
    .then({
      scaleX: { 1: 2, curve: bounceCurve },
      scaleY: { 1: 2, curve: nBounceCurve },
      x: { to: -2*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -175 + Y_SHIFT,
      angle: { to: 20, easing: 'quad.out' },
      duration: 350,
    })
    .then({
      x: { to: -5.3*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      scaleX: { 2 : [SCALE_DOWN] },
      scaleY: { 2 : [SCALE_UP] },
      angle:  { 0: -10 },
      easing: 'quad.in',
    })
    .then(SLAP_OPTS);

    const charFn4 = new mojs.Shape({
      ...charOpts,
      y: { [-100 + Y_SHIFT] : -200 },
      x: { [X_SHIFT]: -3*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      angle: -11,
      scaleX: { [SCALE_DOWN] : 1.25 },
      scaleY: { [SCALE_UP] : 1.25 },
      easing: 'quad.out',
      origin: '50% 100%',
      delay: 500,
    })
    .then({
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      x: { to: -6*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      angle: { 0: 11 },
      easing: 'sin.in',
    })
    .then(SLAP_OPTS)
    .then({
      scaleX: { 1: 1.25, curve: bounceCurve },
      scaleY: { 1: 1.25, curve: nBounceCurve },
      x: { to: -4.75*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -175 + Y_SHIFT,
      angle: { to: 20, easing: 'quad.out' },
      duration: 350,
    })
    .then({
      x: { to: -3.7*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      angle:  { 0: -10 },
      easing: 'quad.in',
      duration: 350,
    })
    .then(SLAP_OPTS);


    const charLn1 = new mojs.Shape({
      ...charOpts,
      shape: 'polygon',
      y: { [-100 + Y_SHIFT] : -200 },
      x: { [X_SHIFT]: -2*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      angle: -11,
      scaleX: { [SCALE_DOWN] : 3 },
      scaleY: { [SCALE_UP] : 2 },
      easing: 'quad.out',
    })
    .then({
      scaleX: { 2 : [SCALE_DOWN] },
      scaleY: { 2 : [SCALE_UP] },
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      x: { to: -4*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      angle: { 0: 11 },
      easing: 'sin.in',
    })
    .then(SLAP_OPTS)
    .then({
      scaleX: { 1: 2, curve: bounceCurve },
      scaleY: { 1: 2, curve: nBounceCurve },
      x: { to: -3*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -175 + Y_SHIFT,
      angle: { to: 20, easing: 'quad.out' },
      duration: 350,
    })
    .then({
      x: { to: -2*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      scaleX: { 2 : [SCALE_DOWN] },
      scaleY: { 2 : [SCALE_UP] },
      angle:  { 0: -10 },
      easing: 'quad.in',
    })
    .then(SLAP_OPTS);

    const charLn5 = new mojs.Shape({
      ...charOpts,
      shape: 'rect',
      y: { [-100 + Y_SHIFT] : -120 },
      x: { [X_SHIFT]: 2.5*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      angle: -11,
      scaleX: { [SCALE_DOWN] : 1 },
      scaleY: { [SCALE_UP] : 2 },
      easing: 'quad.out',
    })
    .then({
      scaleX: { 1 : [SCALE_DOWN] },
      scaleY: { 2 : [SCALE_UP] },
      x: { to: 5*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      angle: { 0: 11 },
      easing: 'sin.in',
    })
    .then(SLAP_OPTS)
    .then({
      scaleX: { 1: 1, curve: bounceCurve },
      scaleY: { 1: 2, curve: nBounceCurve },
      x: { to: 3*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -175 + Y_SHIFT,
      angle: { to: 20, easing: 'quad.out' },
      duration: 350,
    })
    .then({
      x: { to: 1*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      scaleX: { 1 : [SCALE_DOWN] },
      scaleY: { 2 : [SCALE_UP] },
      angle:  { 0: -10 },
      easing: 'quad.in',
    })
    .then(SLAP_OPTS);

    const charLn8 = new mojs.Shape({
      ...charOpts,
      y: { [-100 + Y_SHIFT] : -280 },
      x: { [X_SHIFT]: 0*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      angle: -11,
      scaleX: { [SCALE_DOWN] : 1.5 },
      scaleY: { [SCALE_UP] : 1.5 },
      easing: 'quad.out',
      origin: '50% 100%',
      delay: 400,
    })
    .then({
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      x: { to: 1*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      angle: { 0: 11 },
      easing: 'sin.in',
    })
    .then(SLAP_OPTS)
    .then({
      scaleX: { 1: 1.5, curve: bounceCurve },
      scaleY: { 1: 1.5, curve: nBounceCurve },
      x: { to: 1.75*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: -175 + Y_SHIFT,
      angle: { to: 20, easing: 'quad.out' },
      duration: 350,
    })
    .then({
      x: { to: 2.5*CHAR_STEP + X_SHIFT, easing: 'linear.none' },
      y: Y_SHIFT,
      scaleX: SCALE_DOWN,
      scaleY: SCALE_UP,
      angle:  { 0: -10 },
      easing: 'quad.in',
      duration: 350,
    })
    .then(SLAP_OPTS);

    const geometricBurst = new mojs.Burst({
      degree:   20,
      count:    2,
      angle:   -90,
      x:       -150 + X_SHIFT,
      y:       -100 + Y_SHIFT,
      radius:   { 10: 100 },
      timeline: { delay: 900 },
      parent:   mocontainer_el,
      children: {
        shape:        'line',
        scale:        { 1 : 0 },
        radius:       'rand(8, 18)',
        radiusY:      0,
        stroke:       COLORS.VINOUS,
        strokeWidth:  7,
        duration:     450,
        isForce3d:    true
      }
    });

    const shapesTimeline = new mojs.Timeline;

    shapesTimeline
      .add(
        // char1, char2, char3, char4, 
        // charFn1, charFn2, charFn3, charFn4, charFn5, charFn6,
        charFn1, charFn4,
        charLn1, charLn5, charLn8,
        // charLn1, charLn4, charLn5, charLn6, charLn7, charLn8, charLn9, charLn10,
        geometricBurst
      );
    // GEOMETRIC SHAPES





    // WORD CHARACTERS
    class WordCharFn1 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na h-fn1" d="M59.64,86V52H18.36V86H2.52V2H18.36v35.4H59.64V2H75.36V86Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na h-fn1" d="M58.12,85V51H16.84V85H1V1H16.84V36.4H58.12V1H73.84V85Z"/>'; } 
    }
    mojs.addShape( 'wc-fn1', WordCharFn1 );

    class WordCharFn2 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na i-fn2" d="M100.32,10c0,11.4-17.28,11.4-17.28,0S100.32-1.37,100.32,10Zm-16,16.44v59.4H99V26.47Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na i-fn2" d="M18.28,9.55C18.28,21,1,21,1,9.55S18.28-1.85,18.28,9.55ZM2.32,26v59.4H17V26Z"/>'; } 
    }
    mojs.addShape( 'wc-fn2', WordCharFn2 );

    class WordCharFn3 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na r-fn3" d="M121,26.71,122,33.55c4.56-7.32,10.68-8.4,16.68-8.4s12,2.4,15.24,5.64l-6.6,12.72a14.63,14.63,0,0,0-10.56-3.84c-7.68,0-14.76,4.08-14.76,15v31.2H107.4V26.71Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na r-fn3" d="M14.56,2.56,15.64,9.4C20.2,2.08,26.32,1,32.32,1s12,2.4,15.24,5.64L41,19.36A14.63,14.63,0,0,0,30.4,15.52c-7.68,0-14.76,4.08-14.76,15v31.2H1V2.56Z"/>'; } 
    }
    mojs.addShape( 'wc-fn3', WordCharFn3 );

    class WordCharFn4 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na o-fn4" d="M213.47,56.35c0,17-11.64,30.84-30.83,30.84s-30.72-13.8-30.72-30.84,11.76-30.84,30.6-30.84S213.47,39.43,213.47,56.35Zm-46.91,0c0,9,5.4,17.4,16.08,17.4s16.07-8.4,16.07-17.4-6.24-17.52-16.07-17.52C172.08,38.83,166.56,47.47,166.56,56.35Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na o-fn4" d="M62.56,31.84c0,17-11.64,30.84-30.84,30.84S1,48.88,1,31.84,12.76,1,31.6,1,62.56,14.92,62.56,31.84Zm-46.92,0c0,9,5.4,17.4,16.08,17.4s16.08-8.4,16.08-17.4S41.56,14.32,31.72,14.32C21.16,14.32,15.64,23,15.64,31.84Z"/>'; } 
    }
    mojs.addShape( 'wc-fn4', WordCharFn4 );

    class WordCharFn5 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na k-fn5" d="M233,2V50.47L253,26.71h17.52v.84l-24.12,27,27.48,30.24v1.08H256.19L233,59.11V85.87H218.4V2Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na k-fn5" d="M15.64,1V49.48L35.56,25.72H53.08v.84L29,53.56,56.44,83.8v1.08H38.8L15.64,58.12V84.88H1V1Z"/>'; } 
    }
    mojs.addShape( 'wc-fn5', WordCharFn5 );

    class WordCharFn6 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na i-fn6" d="M296.51,10c0,11.4-17.28,11.4-17.28,0S296.51-1.37,296.51,10Zm-16,16.44v59.4h14.64V26.47Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na i-fn6" d="M18.28,9.55C18.28,21,1,21,1,9.55S18.28-1.85,18.28,9.55ZM2.32,26v59.4H17V26Z"/>'; } 
    }
    mojs.addShape( 'wc-fn6', WordCharFn6 );


    class WordCharLn1 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na y-ln1" d="M369.11,36.55,391.43,1.87h19.08v.72L377,51.19V85.87H361.19V51.19L328.91,2.59V1.87h18.84Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '><path class="svg-na y-ln1" d="M41.2,35.68,63.52,1H82.6v.72L49.12,50.32V85H33.28V50.32L1,1.72V1H19.84Z"/>'; }
    }
    mojs.addShape( 'wc-ln1', WordCharLn1 );

    class WordCharLn2 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na a-ln2"  d="M444.11,26.71h14V85.87h-13.8l-.72-8.64c-3.36,7-12.6,10.32-19.2,10.44C406.91,87.79,394,77,394,56.23c0-20.4,13.56-31.08,30.84-31,7.92,0,15.48,3.72,18.84,9.6ZM408.59,56.23c0,11.28,7.8,18,17.52,18,23,0,23-35.88,0-35.88C416.39,38.35,408.59,45,408.59,56.23Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na a-ln2"  d="M51.16,2.44h14V61.6H51.4L50.68,53c-3.36,7-12.6,10.32-19.2,10.44C14,63.52,1,52.72,1,32,1,11.56,14.56.88,31.84,1c7.92,0,15.48,3.72,18.84,9.6ZM15.64,32c0,11.28,7.8,18,17.52,18,23,0,23-35.88,0-35.88C23.44,14.08,15.64,20.68,15.64,32Z" />'; } 
    }
    mojs.addShape( 'wc-ln2', WordCharLn2 );

    class WordCharLn3 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na n-ln3"  d="M511.67,85.87v-31c0-9-4.92-15.84-14.28-15.84-9,0-15.12,7.56-15.12,16.56V85.87H467.75V26.59h13.08l1,8c6-5.88,12-8.88,19.44-8.88,13.92,0,25.08,10.44,25.08,29V85.87Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na n-ln3"  d="M44.92,61.12v-31c0-9-4.92-15.84-14.28-15.84-9,0-15.12,7.56-15.12,16.56V61.12H1V1.84H14.08l1,8C21,4,27,1,34.48,1,48.4,1,59.56,11.44,59.56,30V61.12Z"/>'; } 
    }
    mojs.addShape( 'wc-ln3', WordCharLn3 );

    class WordCharLn4 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na a-ln4" d="M583.43,26.71h14V85.87h-13.8L583,77.23c-3.36,7-12.6,10.32-19.2,10.44-17.52.12-30.48-10.68-30.48-31.44,0-20.4,13.56-31.08,30.84-31,7.92,0,15.48,3.72,18.84,9.6ZM547.91,56.23c0,11.28,7.8,18,17.52,18,23,0,23-35.88,0-35.88C555.71,38.35,547.91,45,547.91,56.23Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na a-ln4"  d="M51.16,2.44h14V61.6H51.4L50.68,53c-3.36,7-12.6,10.32-19.2,10.44C14,63.52,1,52.72,1,32,1,11.56,14.56.88,31.84,1c7.92,0,15.48,3.72,18.84,9.6ZM15.64,32c0,11.28,7.8,18,17.52,18,23,0,23-35.88,0-35.88C23.44,14.08,15.64,20.68,15.64,32Z" />'; } 
    }
    mojs.addShape( 'wc-ln4', WordCharLn4 );

    class WordCharLn5 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na g-ln5" d="M653.87,20.71l10.8,8.16-6.6,8.4c4.56,5.16,6.24,11,6.24,17.52,0,7.32-2.76,17.64-12.48,22.08,9.84,4.92,12.24,12,12.24,19.56,0,16.32-12.48,26.4-29.64,26.4s-30-10.44-30-26.4H619c0,7.68,7.08,12.72,15.48,12.72s15-4.56,15-12.72-7.68-11.88-15-11.88c-18.48,0-30-11.28-30-29.76s13.44-30,30-30c4.68,0,9.48.6,13.56,3.36ZM619,54.79c0,10.32,7,16.44,15.48,16.44S649.79,65,649.79,54.79s-7-16.68-15.36-16.68S619,44.47,619,54.79Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na a-ln5" d="M50.44,1.39l10.8,8.16L54.64,18c4.56,5.16,6.24,11,6.24,17.52,0,7.32-2.76,17.64-12.48,22.08,9.84,4.92,12.24,12,12.24,19.55,0,16.32-12.48,26.4-29.64,26.4S1,93.06,1,77.1H15.52c0,7.68,7.08,12.72,15.48,12.72S46,85.26,46,77.1,38.32,65.23,31,65.23C12.52,65.23,1,54,1,35.47s13.44-30,30-30c4.68,0,9.48.6,13.56,3.36ZM15.52,35.47c0,10.32,7,16.44,15.48,16.44s15.36-6.24,15.36-16.44S39.4,18.79,31,18.79,15.52,25.15,15.52,35.47Z"/>'; } 
    }
    mojs.addShape( 'wc-ln5', WordCharLn5 );

    class WordCharLn6 extends mojs.CustomShape {
      // getShape () { return '<path class="svg-na i-ln6" d="M689.63,10c0,11.4-17.28,11.4-17.28,0S689.63-1.37,689.63,10Zm-16,16.44v59.4h14.64V26.47Z" transform="translate(-2.52 -1.48)"/>'; } 
      getShape () { return '<path class="svg-na i-ln6" d="M18.28,9.55C18.28,21,1,21,1,9.55S18.28-1.85,18.28,9.55ZM2.32,26v59.4H17V26Z"/>'; } 
    }
    mojs.addShape( 'wc-ln6', WordCharLn6 );

    class WordCharLn7 extends mojs.CustomShape {
      getShape () { return '<path class="svg-na s-ln7" d="M43.17,18.4c-4.2-4-9-5.28-14.64-5.28-7,0-10.8,2.16-10.8,5.88s3.48,6,11,6.48c11.16.72,25.31,3.24,25.31,19,0,10.44-8.52,19.44-25.43,19.44-9.36,0-18.72-1.56-27.36-10.56l7.2-10.44c4.2,4.68,13.8,8.16,20.4,8.28,5.52.12,10.67-2.76,10.67-7.08,0-4.08-3.35-5.76-11.75-6.24C16.65,37,3.33,32.92,3.33,19.48,3.33,5.8,17.49,1,28.29,1c9.24,0,16.19,1.8,23,7.8Z"/>'; } 
    }
    mojs.addShape( 'wc-ln7', WordCharLn7 );

    class WordCharLn8 extends mojs.CustomShape {
      getShape () { return '<path class="svg-na a-ln8"  d="M51.16,2.44h14V61.6H51.4L50.68,53c-3.36,7-12.6,10.32-19.2,10.44C14,63.52,1,52.72,1,32,1,11.56,14.56.88,31.84,1c7.92,0,15.48,3.72,18.84,9.6ZM15.64,32c0,11.28,7.8,18,17.52,18,23,0,23-35.88,0-35.88C23.44,14.08,15.64,20.68,15.64,32Z" />'; } 
    }
    mojs.addShape( 'wc-ln8', WordCharLn8 );

    class WordCharLn9 extends mojs.CustomShape {
      getShape () { return '<path class="svg-na w-ln9" d="M57,1l13,44.52L83.49,1H99.68L79,60.52H62L55.89,43,50.61,23.2,45.33,43,39.21,60.52h-17L1.41,1H17.73L31.29,45.52,44.13,1Z"/>'; } 
    }
    mojs.addShape( 'wc-ln9', WordCharLn9 );

    class WordCharLn10 extends mojs.CustomShape {
      getShape () { return '<path class="svg-na a-ln10"  d="M51.16,2.44h14V61.6H51.4L50.68,53c-3.36,7-12.6,10.32-19.2,10.44C14,63.52,1,52.72,1,32,1,11.56,14.56.88,31.84,1c7.92,0,15.48,3.72,18.84,9.6ZM15.64,32c0,11.28,7.8,18,17.52,18,23,0,23-35.88,0-35.88C23.44,14.08,15.64,20.68,15.64,32Z" />'; } 
    }
    mojs.addShape( 'wc-ln10', WordCharLn10 );

    // console.log('bounceCurve : ' + bounceCurve);
    // console.log('nBounceCurve : ' + nBounceCurve);
    const WORD_CHAR_OPTS = {
      left: '50%', top: '50%',
      fill:         'none',
      radius:       20,
      isShowEnd:    true,
      isForce3d:    true,
      // width: 100, height: 100,
      parent: target_el,
      // scaleX: { .6: .8847, curve: bounceCurve },
      // scaleY: { .6: .8847, curve: nBounceCurve },
      // scaleX: { .8: 1.0175, curve: bounceCurve },
      // scaleY: { .8: 1.0175, curve: nBounceCurve },
      scaleX: { .4: .6 },
      scaleY: { .4: .6 },
    }

    SCALE_DOWN = .125;
    SCALE_UP   = 1;

    Y_SHIFT    = -4.5 ;
    X_SHIFT    = 60;

    const not = ( fn, base = 1 ) => { return (p) => { return base - fn(p); } }

    const FALLDOWN_OPTS = {
      scaleX: 1,
      scaleY: 1,
      y: Y_SHIFT,
      angle: 0,
      easing: 'bounce.out',
      duration: 1000,
    }


    SHIFTX = 4*CHAR_STEP;
    const elasticCurve  = mojs.easing.path('M0,0 L42.4468,99.9990418 C46.3646102,-8.62551409 51.8137449,77.8031065 53.2538649,98.8047514 C54.3071019,114.164379 57.4212363,145.777285 62.4147182,98.8047479 C62.4147182,98.8047504 64.981755,73.166208 70.2635684,98.8047479 C73.8553743,114.6133 81.1660962,98.8047504 100,99.9990418');

    const elasticScale  = mojs.easing.path('M1.77635684e-15,-0.000957489014 L42.4468,-0.000958179367 C46.3646102,-108.625514 51.8137449,-22.1968935 53.2538649,-1.19524857 C54.3071019,14.1643792 57.4212363,45.7772847 62.4147182,-1.19525215 C62.4147182,-1.19524958 64.981755,-26.833792 70.2635684,-1.19525215 C73.8553743,14.6132996 81.1660962,-1.19524958 100,-0.000958179367');
    const nElasticScale = not( elasticScale, 2 );
    const word_char1 = new mojs.Shape({
      shape:      'wc-fn1',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -280 + Y_SHIFT },
      angle: { 0 : 180, easing: 'cubic.in' },
      x: -5.55*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      origin: '0 50%',
      delay:    400,
      duration: 450,
    })
    .then({
      y: Y_SHIFT,
      angle: { to: 360, easing: 'expo.out' },
      easing: 'bounce.out',
      duration: 850
    })
    // .then({
    //   angle: { 0: -50 },
    //   scaleX: { .8847: 0 },
    //   scaleY: { .8847: 0 },
    //   easing: 'bounce.out',
    //   delay: 1000,
    // })
    // const character1 = document.createElement('div');
    // character1.classList.add( 'character1' );
    // word_char1.el.appendChild( character1 );

    const word_char2 = new mojs.Shape({
      shape:      'wc-fn2',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -100 + Y_SHIFT },
      angle: { [-90]: -50 },
      x: -5.175*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      origin: '50% 100%',
      // delay: 75,
      duration: 350,
    })
    .then({
      y: Y_SHIFT - 8.75,
      angle: { to: 100, curve: elasticCurve },
      easing: 'bounce.out',
      duration: 950
    })
    // const character2 = document.createElement('div');
    // character2.classList.add( 'character2' );
    // word_char2.el.appendChild(character2 );

    const word_char3 = new mojs.Shape({
      shape:      'wc-fn3',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -100 + Y_SHIFT },
      // y: Y_SHIFT,
      angle: { 0 : -180, easing: 'cubic.in' },
      x: -4.975*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      delay: 550,
      duration: 350,
    })
    .then({
      y: Y_SHIFT + 5,
      angle: { to: -360, easing: 'expo.out' },
      easing: 'bounce.out',
      duration: 850,
      // origin: '50% 100%',
    })
    // const character3 = document.createElement('div');
    // character3.classList.add( 'character2' );
    // word_char3.el.appendChild( character3 );

    const word_char4 = new mojs.Shape({
      shape:      'wc-fn4',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -125 + Y_SHIFT },
      angle: { [-90]: -50 },
      x: -4.6*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      delay: 700,
      duration: 300,
    })
    .then({
      y: Y_SHIFT + 5,
      angle: { to: 100, curve: elasticCurve },
      easing: 'bounce.out',
      duration: 950,
    })
    // const character4 = document.createElement('div');
    // character4.classList.add( 'character' );
    // word_char4.el.appendChild( character4 );

    const word_char5 = new mojs.Shape({
      shape:      'wc-fn5',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -125 + Y_SHIFT },
      angle: { 0 : 180, easing: 'cubic.in' },
      x: -4.05*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      duration: 400,
    })
    .then({
      y: Y_SHIFT,
      angle: { to: 360, easing: 'expo.out' },
      easing: 'bounce.out',
      duration: 950,
    })
    // const character5 = document.createElement('div');
    // character5.classList.add( 'character' );
    // word_char5.el.appendChild( character5 );

    const word_char6 = new mojs.Shape({
      shape:      'wc-fn6',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -125 + Y_SHIFT },
      angle: { 0 : 180 },
      x: -3.525*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      delay: 500,
      duration: 400,
    })
    .then({
      y: Y_SHIFT,
      angle: { to: 360, easing: 'expo.out' },
      easing: 'bounce.out',
      duration: 950,
    })
    // const character6 = document.createElement('div');
    // character6.classList.add( 'character' );
    // word_char6.el.appendChild( character6 );

    // 名字
    const word_char11 = new mojs.Shape({
      shape:      'wc-ln1',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -260 + Y_SHIFT },
      angle: { 0 : -180, easing: 'cubic.in' },
      // angle: { 180 : 360 },
      x: -2.82*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      duration: 700,
      origin: '0 50%',
      // origin: '50% 100%',
    })
    .then({
      y: Y_SHIFT + 0.05,
      angle: { to: -360, easing: 'expo.out' },
      // angle: { 360 : 540, easing: 'expo.out' },
      // angle: { to: 0, easing: elasticCurve },
      easing: 'bounce.out',
      duration: 850,
    })
    // const character11 = document.createElement('div');
    // character11.classList.add( 'character' );
    // word_char11.el.appendChild( character11 );

    const word_char12 = new mojs.Shape({
      shape:      'wc-ln2',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -100 + Y_SHIFT },
      angle: { [-90]: -50 },
      x: -2.58*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      origin: '50% 100%',
      delay: 200,
      duration: 350,
    })
    .then({
      y: Y_SHIFT - 3,
      angle: { to: -100, curve: elasticCurve },
      easing: 'bounce.out',
      duration: 850
    })
    // const character12 = document.createElement('div');
    // character12.classList.add( 'character' );
    // word_char12.el.appendChild( character12 );

    const word_char13 = new mojs.Shape({
      shape:      'wc-ln3',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -125 + Y_SHIFT },
      angle: { 0 : 180, easing: 'cubic.in' },
      x: -1.97*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      duration: 500,
    })
    .then({
      y: Y_SHIFT + 5.5,
      angle: { to: 360, easing: 'expo.out' },
      easing: 'bounce.out',
      duration: 950,
    })
    // const character13 = document.createElement('div');
    // character13.classList.add( 'character' );
    // word_char13.el.appendChild( character13 );

    const word_char14 = new mojs.Shape({
      shape:      'wc-ln4',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -125 + Y_SHIFT },
      angle: { 0 : 180, easing: 'cubic.in' },
      x: -1.425*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      delay: 200,
      duration: 600,
    })
    .then({
      y: Y_SHIFT + 5.5,
      angle: { to: 100, curve: elasticCurve },
      easing: 'bounce.out',
      duration: 550
    })
    // const character14 = document.createElement('div');
    // character14.classList.add( 'character' );
    // word_char14.el.appendChild( character14 );

    const word_char15 = new mojs.Shape({
      shape:      'wc-ln5',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -240 + Y_SHIFT },
      angle: { 0 : 180, easing: 'cubic.in' },
      x: -.83*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      origin: '50% 100%',
      duration: 600,
    })
    .then({
      y: Y_SHIFT - 4.25,
      angle: { to: 360, easing: 'expo.out' },
      easing: 'bounce.out',
      duration: 950,
    })
    // const character15 = document.createElement('div');
    // character15.classList.add( 'character' );
    // word_char15.el.appendChild( character15 );

    const word_char16 = new mojs.Shape({
      shape:      'wc-ln6',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -125 + Y_SHIFT },
      angle: { 0 : 180, easing: 'cubic.in' },
      x: -0.25*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      delay: 200,
      duration: 700,
    })
    .then({
      y: Y_SHIFT,
      angle: { to: 360, easing: 'expo.out' },
      easing: 'bounce.out',
      duration: 950,
    })
    // const character16 = document.createElement('div');
    // character16.classList.add( 'character' );
    // word_char16.el.appendChild( character16 );

    const word_char17 = new mojs.Shape({
      shape:      'wc-ln7',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -125 + Y_SHIFT },
      angle: { 0 : 180, easing: 'cubic.in' },
      x: -0.05*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      duration: 700,
    })
    .then({
      y: Y_SHIFT + 5.5,
      angle: { to: 100, curve: elasticCurve },
      easing: 'bounce.out',
      duration: 950
    })
    // const character17 = document.createElement('div');
    // character17.classList.add( 'character' );
    // word_char17.el.appendChild( character17 );


    const word_char18 = new mojs.Shape({
      shape:      'wc-ln8',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -125 + Y_SHIFT },
      angle: { 0 : 180, easing: 'cubic.in' },
      x: .425*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      origin: '50% 100%',
      delay: 400,
      duration: 800,
    })
    .then({
      y: Y_SHIFT - 3,
      angle: { to: 360, easing: 'expo.out' },
      easing: 'bounce.out',
      duration: 550,
    })
    // const character18 = document.createElement('div');
    // character18.classList.add( 'character' );
    // word_char18.el.appendChild( character18 );

    const word_char19 = new mojs.Shape({
      shape:      'wc-ln9',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -100 + Y_SHIFT },
      angle: { 0: -50 },
      x: 1.02*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      origin: '50% 100%',
      duration: 350,
    })
    .then({
      y: Y_SHIFT - 3,
      angle: { to: -100, curve: elasticCurve },
      easing: 'bounce.out',
      duration: 950,
    })

    // const character19 = document.createElement('div');
    // character19.classList.add( 'character' );
    // word_char19.el.appendChild( character19 );

    const word_char20 = new mojs.Shape({
      shape:      'wc-ln10',
      ...WORD_CHAR_OPTS,
      y: { [Y_SHIFT]: -100 + Y_SHIFT },
      angle: { 0: -50 },
      x: 1.85*CHAR_STEP + X_SHIFT,
      easing: 'quad.out',
      origin: '50% 100%',
      delay: 100,
      duration: 350,
    })
    .then({
      y: Y_SHIFT - 3,
      angle: { to: -100, curve: elasticCurve },
      easing: 'bounce.out',
      duration: 950
    })
    // const character20 = document.createElement('div');
    // character20.classList.add( 'character' );
    // word_char20.el.appendChild( character20 );

    // character1.innerHTML = 'o';
    // character2.innerHTML = 'v';
    // character3.innerHTML = 'l';
    // character4.innerHTML = 'e';


    const WORD_BURST_OPTS = {
      degree:   20,
      count:    2,
      x:        CHAR_STEP + X_SHIFT,
      y:        Y_SHIFT,
      radius:   { 10: 100 },
      parent:   mocontainer_el,
      children: {
        shape:        'line',
        scale:        { 1 : 0 },
        radius:       'rand(8, 18)',
        radiusY:      0,
        stroke:       COLORS.VINOUS,
        strokeWidth:  7,
        duration:     450,
        isForce3d:    true
      }
    }

    const word_burst1 = new mojs.Burst({
      ...WORD_BURST_OPTS,
      timeline: { delay: 600 }
    });

    const word_burst2 = new mojs.Burst({
      ...WORD_BURST_OPTS,
      angle :  -20,
      timeline: { delay: 100 },
      x:  CHAR_STEP - 3*X_SHIFT
    });

    const line1 = new mojs.Shape({
      shape: 'line',
      stroke: COLORS.VINOUS,
      radius:  40,
      radiusY: 0,
      x:      -CHAR_STEP + X_SHIFT,
      y:       50 + Y_SHIFT,
      scaleX: { 0 : 1 },
      strokeWidth: 4,
      duration: 100,
      isTimelineLess: true,
      isShowEnd: false,
      parent:   mocontainer_el,
    });
    line1.el.style[ 'z-index' ] = 1;

    const line2 = new mojs.Shape({
      shape: 'line',
      stroke: COLORS.VINOUS,
      radius:  15,
      radiusY: 0,
      x:      { [X_SHIFT] : CHAR_STEP + X_SHIFT },
      y:       50 + Y_SHIFT,
      scaleX: { 1 : 0 },
      strokeWidth: 4,
      duration: 400,
      isTimelineLess: true,
      isShowEnd: false,
      parent:   mocontainer_el,
    });

    line2.el.style[ 'z-index' ] = 1;

    const speechBurst = new mojs.Burst({
      degree:   120,
      count:    5,
      // parent:   speech.el,
      angle:   -60,
      y:       -100,
      radius:    { 55: 95 },
      timeline: { delay: 1000 },
      parent:   mocontainer_el,
      children: {
        shape:        'line',
        scale:        { 1 : 0 },
        radius:       12,
        radiusY:      0,
        stroke:       COLORS.VINOUS,
        strokeWidth:  7,
        duration:     400,
        isForce3d:    true
      }
    });

    const nameBurst = new mojs.Burst({
      degree:   120,
      count:    7,
      // parent:   speech.el,
      angle:   -60,
      x:       -108,
      y:       -20,
      radius:    { 10: 30 },
      timeline: { delay: 2500 },
      parent:   mocontainer_el,
      children: {
        shape:        'line',
        scale:        { 1 : 0 },
        radius:       6,
        radiusY:      0,
        stroke:       COLORS.VINOUS,
        strokeWidth:  2,
        duration:     800,
        isForce3d:    true
      }
    });

    const nameBurst2 = new mojs.Burst({
      degree:   120,
      count:    7,
      // parent:   speech.el,
      angle:   -60,
      x:       -30,
      y:       -20,
      radius:    { 10: 30 },
      timeline: { delay: 2500 },
      parent:   mocontainer_el,
      children: {
        shape:        'line',
        scale:        { 1 : 0 },
        radius:       6,
        radiusY:      0,
        stroke:       COLORS.VINOUS,
        strokeWidth:  2,
        duration:     800,
        isForce3d:    true
      }
    });

    const wordTimeline = new mojs.Timeline({ delay: 1600 });
    wordTimeline
      .add(
        word_char1, word_char2,
        word_char3, word_char4,
        word_char5, word_char6,
        word_char11, word_char12,
        word_char13, word_char14,
        word_char15, word_char16,
        word_char17, word_char18,
        word_char19, word_char20,
        word_burst1,
        // word_burst2,
        speechBurst,
        nameBurst, nameBurst2,
        line1, line2,
      );

    // WORD CHARACTERS


    // 実行オブジェクト生成
    const timeline = new mojs.Timeline;

    timeline.add(
      whiteBg, redBg,
      burst1, burst2,
      circle1, circle2,
      shapesTimeline,
      wordTimeline
    ).play();  //.play()
    // new MojsPlayer({ add: timeline, isPlaying: true, isRepeat: true });

  });

  return am;
})(AppMotion || {});
