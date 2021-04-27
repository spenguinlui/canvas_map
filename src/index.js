import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.sass';

import { blockWidth, Colors } from './js/varaible';
import { gaetRandomData } from './js/data';
import { drawBackGround as _drawBackGround, drawGrid as _drawGrid } from './js/grid';
import { fillPoint, strokeLine, drawText } from './js/material';
import {
  hendleAfterTranslateByOffset as _hendleAfterTranslateByOffset, 
  hendleAfterTranslateByRegularOffset as _hendleAfterTranslateByRegularOffset,
  hendleBeforeTranslateAndTranlated as _hendleBeforeTranslateAndTranlated,
  hendleBeforeTranslateAndTranlatedByRegularOffset as _hendleBeforeTranslateAndTranlatedByRegularOffset
} from './js/hendler'
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
  const hendleBeforeTranslateAndTranlated = _hendleBeforeTranslateAndTranlated.bind(ctx);
  const hendleAfterTranslateByRegularOffset = _hendleAfterTranslateByRegularOffset.bind(ctx);
  const hendleBeforeTranslateAndTranlatedByRegularOffset = _hendleBeforeTranslateAndTranlatedByRegularOffset.bind(ctx);

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
    hendleBeforeTranslateAndTranlated(datas, (data, nextPoint) => {
      ctx.strokeLine({x: 0, y: 0}, nextPoint, 3, Colors.path);
    })
    hendleAfterTranslateByOffset(datas, (data) => {
      ctx.fillPoint(0, 0, 30, { fillColor: Colors.backgroud, strokeColor: Colors.backgroud, lineWidth: 3 });
    })
    hendleAfterTranslateByOffset(datas, (data) => {
      ctx.fillPoint(0, 0, 15, { fillColor: Colors.point, strokeColor: Colors.backgroud, lineWidth: 3 });
    })
    hendleAfterTranslateByOffset(datas, (data) => {
      ctx.drawText(30, 5, data.text, Colors.text);
    })
  }

  const drawEachPointByRegular = (datas) => {
    hendleBeforeTranslateAndTranlatedByRegularOffset(datas, 100, (data, nextPoint) => {
      ctx.strokeLine({x: 0, y: 0}, nextPoint, 3, Colors.path);
    })
    hendleAfterTranslateByRegularOffset(datas, 100, (data) => {
      ctx.fillPoint(0, 0, 15, { fillColor: Colors.point, strokeColor: Colors.backgroud, lineWidth: 5 });
      ctx.drawText(30, 5, data.text, Colors.text);
    })
  }

  // const drawEachPointWithStartAndEnd = (datas) => {
  //   _drawLineToEachPoint(datas);
  //   hendleAfterTranslateByOffset(datas, (data, i) => {
  //     if (i === 0) {
  //       ctx.fillPoint(0, 0, 15, { fillColor: Colors.backgroud, strokeColor: 'green', lineWidth: 3 });
  //     } else if (i === datas.length - 1) {
  //       ctx.fillPoint(0, 0, 15, { fillColor: Colors.backgroud, strokeColor: 'black', lineWidth: 3 });
  //     } else {
  //       ctx.fillPoint(0, 0, 15, { fillColor: Colors.point, strokeColor: Colors.point, lineWidth: 3 });
  //     }
  //     ctx.drawText(30, 5, data.text, Colors.text);
  //   })
  // }

  // 資料範例
  // const location_latlon = [
  //   {x: 140, y: 80, text: 'one step'},
  //   {x: -40, y: 50, text: 'two step'},
  //   {x: 60, y: 70, text: 'three step'},
  //   {x: 100, y: 110, text: 'four step'},
  //   {x: 30, y: 80, text: 'tired'},
  //   {x: -70, y: 80, text: 'exhausted'},
  //   {x: 160, y: 70, text: 'died'}
  // ];

  const draw = (option) => {
    drawBackGround();
    // drawGrid();
    const { random, regular } = option;
    const location_latlon = gaetRandomData(5);

    if (random) drawEachPoint(location_latlon);
    if (regular) drawEachPointByRegular(location_latlon);
    // drawEachPointWithStartAndEnd(location_latlon);
  }

  // 重繪
  const reDrawBtn = document.getElementById('reDrawBtn');
  const randomDisplay = document.getElementById('randomDisplay');
  const regularDisplay = document.getElementById('regularDisplay');
  reDrawBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, blockWidth, blockWidth);
    draw({ random: randomDisplay.checked, regular: regularDisplay.checked });
  })

  // 執行
  draw({random: randomDisplay.checked, regular: regularDisplay.checked});
});