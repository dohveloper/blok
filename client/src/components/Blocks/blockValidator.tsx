//By BlockType

export interface NavData {
  navTitle?: null;
  style: StyleData;
  logoImage?: ImageData;
  logoText?: TextData;
  button?: ButtonData;
}
export interface HeroData {
  navTitle: string;
  style: StyleData;
  image?: ImageData;
  caption?: TextData;
  header?: TextData;
  body?: TextData;
  button?: ButtonData;
}
export interface FeatureData {
  navTitle: string;
  style: StyleData;
  image?: ImageData;
  caption?: TextData;
  header?: TextData;
  body?: TextData;
  button?: ButtonData;
}
export interface FooterData {
  navTitle: string;
  style: StyleData;
  leftText?: TextData;
  rightText?: TextData;
}

//Block Interface

export interface Block {
  id: number;
  template: {
    theme: string;
    blockType: string;
    layout: string | null;
  };
  data: BlockData;
}
export interface BlockData {
  navTitle: string | null;
  style: StyleData;
  logoImage?: ImageData;
  logoText?: TextData;
  image?: ImageData;
  caption?: TextData;
  header?: TextData;
  body?: TextData;
  button?: ButtonData;
  rightText?: TextData;
  leftText?: TextData;
}
export interface StyleData {
  value: string;
}
export interface ImageData {
  src: string;
  alt?: string;
}
export interface TextData {
  value: string;
}
export interface ButtonData {
  title: string;
  url: string;
}
