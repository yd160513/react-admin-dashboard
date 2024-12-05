export interface MenuMeta {
  title: string;
  [key: string]: any;
}

export interface MenuType {
  path: string;
  element: string;
  meta?: MenuMeta;
  children?: MenuType[];
} 