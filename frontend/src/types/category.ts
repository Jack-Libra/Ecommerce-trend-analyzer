// types/category.ts
export interface Category {
  id: string;
  name: string;
  // 可依後端回傳補充下列欄位
  productCount7d?: number;
  productCount30d?: number;
}

export interface CategoryStat {
  category: string;
  count7d: number;
  count30d: number;
}
