import { PI2, Colors, textStyle } from './varaible';
// 快速畫圓
export function fillPoint(x, y, r, style) {
  const originColor = this.fillStyle;
  this.beginPath();
  this.arc(x, y, r, 0, PI2);
  this.fillStyle = style.fillColor || Colors.default_line;
  this.strokeStyle = style.strokeColor ? style.strokeColor : style.fillColor || Colors.default_line;
  this.lineWidth = style.lineWidth || 3;
  this.fill();
  this.stroke();
  this.closePath();
  this.fillStyle = originColor;
}

// 快速畫線
export function strokeLine(startPoint, endPoint, lineWidth, lineColor) {
  const originColor = this.strokeStyle;
  this.beginPath();
  this.moveTo(startPoint.x, startPoint.y);
  this.lineTo(endPoint.x, endPoint.y);
  this.lineWidth = lineWidth;
  this.strokeStyle = lineColor;
  this.stroke();
  this.closePath();
  this.strokeStyle = originColor;
}

// 快速寫字
export function drawText(x, y, context, color) {
  this.fillStyle = color;
  this.font = textStyle;
  this.fillText(context, x, y);
  console.log(context)
}