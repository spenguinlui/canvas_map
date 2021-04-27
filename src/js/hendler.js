// import { blockWidth } from './varaible';
// ---- 依資料內容偏移
// 偏移後畫圖 -> 取得資料 index
export function hendleAfterTranslateByOffset(data, func) {
  if (!Array.isArray(data)) return;
  this.save();
  for(let i = 0; i < data.length; i++) {
    this.translate(data[i].x, data[i].y);
    func(data[i], i);
  }
  this.restore();
}

// 偏移前畫圖 -> 取得偏移後的點
export function hendleBeforeTranslateAndTranlated(data, func) {
  if (!Array.isArray(data)) return;
  this.save()
  for(let i = 0; i < data.length; i++) {
    const nextPoint = { x: data[i].x, y: data[i].y };
    if (i !== 0) func(data[i], nextPoint);
    this.translate(data[i].x, data[i].y);
  }
  this.restore();
}

// ---- 依資料內容偏移

// ---- 固定偏移量
// 偏移後畫圖
export function hendleAfterTranslateByRegularOffset(data, offset, func) {
  if (!Array.isArray(data)) return;
  this.save();
  let offsetX = offset;
  let offsetY = offset;
  this.translate(0, offset);
  for(let i = 0; i < data.length; i++) {
    if (i % 5 === 0 && i !== 0) {
      offsetX *= - 1;
      this.translate(0, offsetY);
    } else {
      this.translate(offsetX, 0);
    }
    func(data[i]);
  }
  this.restore();
}

// 偏移前畫圖 -> 取得偏移後的點
export function hendleBeforeTranslateAndTranlatedByRegularOffset(data, offset, func) {
  if (!Array.isArray(data)) return;
  this.save()
  let offsetX = offset;
  let offsetY = offset;
  let nextPoint = { x: 0, y: 0 };
  this.translate(0, offset);
  for(let i = 0; i < data.length; i++) {
    if (i % 5 === 0 && i !== 0) {
      offsetX *= - 1;
      nextPoint = { x: 0, y: offsetY};
      func(data[i], nextPoint);
      this.translate(0, offsetY);
    } else {
      nextPoint = { x: offsetX, y: 0};
      if (i !== 0)func(data[i], nextPoint);
      this.translate(offsetX, 0);
    }
  }
  this.restore();
}

// ---- 固定偏移量
