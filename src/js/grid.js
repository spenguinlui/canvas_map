import { blockWidth, innerBlock, Colors } from './varaible';
// 繪製背景
export const drawBackGround = function () {
  const oringinColor = this.fillStyle;
  this.fillStyle = Colors.backgroud;
  this.fillRect(0, 0, blockWidth, blockWidth);
  this.fillStyle = oringinColor;
}

// 繪製補助線
export function drawGrid () {
  const originStroke = this.strokeStyle;
  for (let i = 0; i < blockWidth / innerBlock; i++) {
    const pos = i * innerBlock;
    this.moveTo(pos, 0);
    this.lineTo(pos, blockWidth);
    this.fillText(pos, pos, 10);
    
    this.moveTo(0, pos);
    this.lineTo(blockWidth, pos);
    this.fillText(pos, 0, pos + 10);
  }
  this.strokeStyle = Colors.grid;
  this.stroke();
  this.strokeStyle = originStroke;
}