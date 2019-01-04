let stageW = 0; // 画面の幅
let stageH = 0; // 画面の高さ
// canvas要素の参照を取得
const canvas = document.querySelector('canvas.streamline');
// 2Dの描画命令群を取得
const context = canvas.getContext('2d');
noise.seed(Math.random());
resize();
tick();
window.addEventListener('resize', resize);
// エンターフレームのタイミング
function tick() {
  requestAnimationFrame(tick);
  const time = Date.now() / 3000;
  draw(time);
}
// 描画
function draw(time) {
  // 画面をリセット
  context.clearRect(0, 0, stageW, stageH);
  context.lineWidth = 1;
  const amplitude = stageH / 3; // 振幅（縦幅)の大きさ
  const lineNum = 200; // ラインの数
  const segmentNum = 100; // 分割数
  [...new Array(lineNum).keys()].forEach(j => {
    const coefficient = 50 + j;
    context.beginPath();
    // context.strokeStyle = `white`;
    // context.strokeStyle = 'rgb(155, 187, 89)';
    context.strokeStyle = '#3DFF3D';
    // context.strokeStyle = '#00FC00';
    // const h = Math.round(j / lineNum * 220); // 色相
    // const s = 100; // 彩度
    // const l = Math.round(j / lineNum * 100); // 明度
    // // 色を指定
    // context.strokeStyle = `hsl(${h}, ${s}%, ${l}%)`;


    [...new Array(segmentNum).keys()].forEach(i => {
      const x = i / (segmentNum - 1) * stageW;
      const px = i / coefficient;
      const py = (j / 50 + time);
      const y = amplitude * noise.perlin2(px, py) + stageH / 2;
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.stroke();
  });
}
// リサイズイベント
function resize() {
  stageW = innerWidth * devicePixelRatio;
  stageH = innerHeight * devicePixelRatio;
  canvas.width = stageW;
  canvas.height = stageH;
}

