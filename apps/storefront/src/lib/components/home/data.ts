export type MediaKind = 'machine' | 'needle' | 'ink' | 'care' | 'stencil' | 'kit' | 'art';
export type PreviewItem = {
  id: string; title: string; english: string; kind: MediaKind;
  assetId: 'home-css-placeholder'; temporary: true;
};
const item = (id: string, title: string, english: string, kind: MediaKind): PreviewItem =>
  ({ id, title, english, kind, assetId: 'home-css-placeholder', temporary: true });
export const navigation = [
  { href: '#categories', label: 'دسته‌بندی‌ها' }, { href: '#equipment', label: 'راهنمای تجهیزات' },
  { href: '#inspiration', label: 'دنیای تتو' }, { href: '#journal', label: 'مجله' },
  { href: '#about', label: 'دربارهٔ اینکورا' }
];
export const categories = [
  item('machines', 'دستگاه‌های تتو', 'TATTOO MACHINES', 'machine'),
  item('cartridges', 'سوزن و کارتریج', 'NEEDLES & CARTRIDGES', 'needle'),
  item('inks', 'رنگ‌های تتو', 'TATTOO INKS', 'ink'),
  item('consumables', 'لوازم مصرفی', 'CONSUMABLES', 'kit'),
  item('aftercare', 'مراقبت و ترمیم', 'AFTERCARE', 'care'),
  item('stencils', 'استنسیل و انتقال', 'STENCIL & TRANSFER', 'stencil'),
  item('accessories', 'اکسسوری', 'ACCESSORIES', 'kit')
];
export const devices = ['Pen', 'Rotary', 'Coil', 'Wireless'];
export const kits = [item('starter', 'چیدمان شروع', 'STARTER', 'kit'), item('line', 'لاین و شید', 'LINE & SHADE', 'needle'), item('color', 'چیدمان رنگ', 'COLOR', 'ink')];
export const styles = [
  item('realism', 'رئالیسم', 'Realism', 'art'), item('neo', 'نئو تردیشنال', 'Neo Traditional', 'art'),
  item('color-style', 'رنگی', 'Color', 'ink'), item('black', 'بلک اند گری', 'Black & Grey', 'art'),
  item('fine', 'فاین لاین', 'Fine Line', 'stencil'), item('japanese', 'ژاپنی', 'Japanese', 'art'),
  item('geo', 'ژئومتریک', 'Geometric', 'stencil'), item('trash', 'ترش پولکا', 'Trash Polka', 'art')
];
export const articles = [
  { title: 'از کجا انتخاب سوزن را شروع کنیم؟', tag: 'تجهیزات', kind: 'needle' as MediaKind },
  { title: 'آشنایی با دنیای رنگ‌های تتو', tag: 'رنگ', kind: 'ink' as MediaKind },
  { title: 'لاین و شید؛ دو زبان یک طرح', tag: 'تکنیک', kind: 'art' as MediaKind },
  { title: 'مراقبت پس از تتو؛ پرسش‌های شما', tag: 'مراقبت', kind: 'care' as MediaKind }
];
export const trustNotes = [
  { icon: 'eye' as const, title: 'شفاف از اولین نگاه', text: 'صفحهٔ نمایشی؛ خرید فعال نیست' },
  { icon: 'image' as const, title: 'تصاویر موقت', text: 'جایگزین عکس‌های مجاز آینده' },
  { icon: 'layers' as const, title: 'انتخاب با آگاهی', text: 'پیش‌نمایش مسیر راهنما' },
  { icon: 'chat' as const, title: 'همراه مسیر شما', text: 'مشاوره در فاز بعد' }
];
