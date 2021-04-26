document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('mycanvas');
  const ctx = canvas.getContext('2d');
  // 材質
  const blockWidth = 600;
  const innerBlock = 50;
  const PI = Math.PI;
  const PI2 = Math.PI * 2;
  const colors = {
    backgroud: '#ffffff',
    grid: 'rgba(0, 0, 0, 0.1)',
    point: '#ff0246',
    path: '#ffdd32',
    text: '#333333'
  };

  // 資料
  const location_latlon = [
    {x: 140, y: 80, text: 'one step'},
    {x: -40, y: 50, text: 'two step'},
    {x: 60, y: 70, text: 'three step'},
    {x: 100, y: 110, text: 'four step'},
    {x: 30, y: 80, text: 'tired'},
    {x: -70, y: 80, text: 'exhausted'},
    {x: 160, y: 70, text: 'died'}
  ];

  canvas.width = blockWidth;
  canvas.height = blockWidth;
  
  // 繪製背景
  const drawBackGround = () => {
    const oringinColor = ctx.fillStyle;
    ctx.fillStyle = colors.backgroud;
    ctx.fillRect(0, 0, blockWidth, blockWidth);
    ctx.fillStyle = oringinColor;
  }
  // 繪製補助線
  const drawGrid = () => {
    const originStroke = ctx.strokeStyle;
    for (let i = 0; i < blockWidth / innerBlock; i++) {
      const pos = i * innerBlock;
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, blockWidth);
      ctx.fillText(pos, pos, 10);
      
      ctx.moveTo(0, pos);
      ctx.lineTo(blockWidth, pos);
      ctx.fillText(pos, 0, pos + 10);
    }
    ctx.strokeStyle = colors.grid;
    ctx.stroke();
    ctx.strokeStyle = originStroke;
  }

  // 快速畫圓
  ctx.fillCircle = function (x, y, r, color) {
    const originColor = this.fillStyle;
    this.beginPath();
    this.arc(x, y, r, 0, PI2);
    this.fillStyle = color;
    this.fill();
    this.closePath();
    this.fillStyle = originColor;
  }

  // 快速畫線
  ctx.strokeLine = function (sx, sy, ex, ey, w, color) {
    const originColor = this.strokeStyle;
    this.beginPath();
    this.moveTo(sx, sy);
    this.lineTo(ex, ey);
    this.lineWidth = w;
    this.strokeStyle = color
    this.stroke();
    this.closePath();
    this.strokeStyle = originColor;
  }

  // const getRandom = (range = 300) => Math.round(Math.random() * range)

  const drawEachPoint = (data) => {
    if (!Array.isArray(data)) return;
    ctx.save();
    for (let i = 0; i < data.length; i++) {
      ctx.translate(data[i].x, data[i].y);
      ctx.fillCircle(0, 0, 15, colors.point);
      ctx.fillStyle = colors.text;
      ctx.font = "30px Comic Sans MS";
      ctx.fillText(data[i].text, 30, 5);
    }
    ctx.restore();
  }

  const drawLineToEachPoint = (data) => {
    if (!Array.isArray(data)) return;
    data.reduce((pre, cur) => {
      const nextX = pre.x + cur.x;
      const nextY = pre.y + cur.y;
      ctx.strokeLine(pre.x, pre.y, nextX, nextY, 3, colors.path);
      return { x: nextX, y: nextY };
    })
  }

  const draw = () => {
    drawBackGround();
    drawGrid();
    drawLineToEachPoint(location_latlon);
    drawEachPoint(location_latlon);
  }

  // 執行
  draw();
});