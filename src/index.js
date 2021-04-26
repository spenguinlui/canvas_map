import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.sass';

import { blockWidth, Colors, location_latlon } from './js/varaible';
import { drawBackGround as _drawBackGround, drawGrid as _drawGrid } from './js/grid';
import { fillPoint, strokeLine, drawText } from './js/material';
import { hendleAfterTranslateByOffset as _hendleAfterTranslateByOffset } from './js/hendler'
// fillPoint(x, y, r, style: { fillColor, strokeColor, lineWidth })
// strokeLine(startPoint: { x, y }, endPoint: { x, y }, lineWidth, lineColor)
// drawText(x, y, context, color)

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('mycanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = blockWidth;
  canvas.height = blockWidth;

  // 加入繪製背景
  const drawBackGround = _drawBackGround.bind(ctx);
  const drawGrid = _drawGrid.bind(ctx);

  // 加入繪製 點、線
  ctx.fillPoint = fillPoint;
  ctx.strokeLine = strokeLine;
  ctx.drawText = drawText;

  // 加入 hendler
  const hendleAfterTranslateByOffset = _hendleAfterTranslateByOffset.bind(ctx);

  // const getRandom = (range = 300) => Math.round(Math.random() * range)

  // 畫出連續直線
  const _drawLineToEachPoint = (datas) => {
    if (!Array.isArray(datas)) return;
    datas.reduce((pre, cur) => {
      const { x, y } = pre;
      const nextPoint = { x: x + cur.x, y: y + cur.y};
      ctx.strokeLine({ x, y }, nextPoint, 3, Colors.path);
      return nextPoint;
    })
  }

  const drawEachPoint = (datas) => {
    _drawLineToEachPoint(datas);
    hendleAfterTranslateByOffset(datas, (data) => {
      ctx.fillPoint(0, 0, 15, { fillColor: Colors.point, strokeColor: Colors.backgroud, lineWidth: 5 });
      ctx.drawText(30, 5, data.text, Colors.text);
    })
  }

  const drawEachPointWithStartAndEnd = (datas) => {
    _drawLineToEachPoint(datas);
    hendleAfterTranslateByOffset(datas, (data, i) => {
      if (i === 0) {
        ctx.fillPoint(0, 0, 15, { fillColor: Colors.backgroud, strokeColor: 'green', lineWidth: 3 });
      } else if (i === datas.length - 1) {
        ctx.fillPoint(0, 0, 15, { fillColor: Colors.backgroud, strokeColor: 'black', lineWidth: 3 });
      } else {
        ctx.fillPoint(0, 0, 15, { fillColor: Colors.point, strokeColor: Colors.point, lineWidth: 3 });
      }
      ctx.drawText(30, 5, data.text, Colors.text);
    })
  }

  const draw = () => {
    drawBackGround();
    drawGrid();
    drawEachPoint(location_latlon);
    // drawEachPointWithStartAndEnd(location_latlon);
  }

  // 執行
  draw();
});