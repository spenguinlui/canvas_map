export function hendleAfterTranslateByOffset(data, func) {
  if (!Array.isArray(data)) return;
  this.save();
  for(let i = 0; i < data.length; i++) {
    this.translate(data[i].x, data[i].y);
    func(data[i], i);
  }
  this.restore();
}