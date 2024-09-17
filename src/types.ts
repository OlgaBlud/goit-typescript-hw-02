export interface Modal {
  isOpen: boolean;
  imgUrl: string;
  imgAlt: string;
}
export interface Image {
  id: string;
  description: string;
  urls: Urls;
}
export interface Urls {
  small: string;
  regular: string;
}
export interface Response {
  results: Image[];
  total: number;
  total_pages: number;
}
