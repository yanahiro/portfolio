//canvasサイズを指定する
var csObj = document.getElementById("canvasbase");
var width = getStyleSheetValue(csObj, 'width');
var height = getStyleSheetValue(csObj, 'height');
csObj.setAttribute('width', width);
csObj.setAttribute('height', height);

// Stageオブジェクトを作成します。表示リストのルートになります。
var stage = new createjs.Stage("canvasbase");

// パーティクルシステム作成します。
var particleSystem = new particlejs.ParticleSystem();

// パーティクルシステムの描画コンテナーを表示リストに登録します。
stage.addChild(particleSystem.container);

// Particle Developから保存したパラメーターを反映します。
// https://ics-creative.github.io/project-particle-develop/
particleSystem.importFromJson(
  {
    "bgColor": "#00000",
    "width": 1024,
    "height": 575,
    "emitFrequency": 40,
    "startX": 800,
    "startXVariance": 1920,
    "startY": 255,
    "startYVariance": 1280,
    "initialDirection": "0",
    "initialDirectionVariance": "360",
    "initialSpeed": 1,
    "initialSpeedVariance": "3.7",
    "friction": 0.11,
    "accelerationSpeed": 0.1,
    "accelerationDirection": "273.3",
    "startScale": "0.76",
    "startScaleVariance": "1",
    "finishScale": 0.09,
    "finishScaleVariance": 0.14,
    "lifeSpan": 200,
    "lifeSpanVariance": 200,
    "startAlpha": 0.3,
    "startAlphaVariance": 0.47,
    "finishAlpha": 0.15,
    "finishAlphaVariance": 0.5,
    "shapeIdList": [
        "blur_circle",
        "circle"
    ],
    "startColor": {
        "hue": 125,
        "hueVariance": 209,
        "saturation": 79,
        "saturationVariance": 5,
        "luminance": 85,
        "luminanceVariance": 48
    },
    "blendMode": true,
    "alphaCurveType": "1",
    "VERSION": "1.0.0"
  }
);

// フレームレートの設定
createjs.Ticker.framerate = 60;
// 定期的に呼ばれる関数を登録
createjs.Ticker.on("tick", handleTick);

function handleTick() {
  // パーティクルの発生・更新
  particleSystem.update();
 
  // 描画を更新する
  stage.update();
}