//Site Interface
export interface Site {
  id: number | null;
  name: string;
  domain: string;
  theme: string;
  font: string;
  colorSet: ColorSet;
  blocks: Block[] | [];
}

export interface ColorSet {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
}

//Block Interface

export interface Block {
  [key: string]: any;
  id: string;
  template: TemplateData;
  data: BlockData;
  isCardOpened?: boolean;
}

export interface TemplateData {
  theme: string;
  blockType: string;
  layout: string | null;
}

export type BlockDataOptions =
  | string
  | TextData
  | ImageData
  | StyleData
  | ButtonData
  | ArrData;

export interface BlockData {
  [key: string]: any;
  navTitle?: string | null;
  logoImage?: ImageData;
  logoText?: TextData;
  image?: ImageData;
  caption?: TextData;
  header?: TextData;
  headerHighlight?: TextData;
  body?: TextData;
  button?: ButtonData;
  rightText?: TextData;
  leftText?: TextData;
  arrText?: ArrData;
  number?: NumberData;
}
export interface StyleData {
  label: string;
  value: TemplateData;
}
export interface ImageData {
  src: string | undefined;
  alt?: string;
}
export interface TextData {
  value: string;
}
export interface NumberData {
  value: number;
}
export interface ButtonData {
  title?: string;
  url?: string;
}
export interface ArrData {
  value?: string[];
}

//Block Preset
export interface BlockTemplate {
  template: TemplateData;
  creationData: CreationData;
  defaultData: BlockData;
}

export interface CreationData {
  title: string;
  icon: string;
  isUnique: boolean;
}

//By BlockType

export interface NavBlock extends Omit<Block, 'data'> {
  data: FeatureData;
}
export interface NavData {
  navTitle?: null;
  logoImage?: ImageData;
  logoText?: TextData;
  button?: ButtonData;
}

export interface HeroBlock extends Omit<Block, 'template'> {
  template: HeroData;
}
export interface HeroData {
  navTitle: string;
  image?: ImageData;
  caption?: TextData;
  header?: TextData;
  headerHighlight?: TextData;
  body?: TextData;
  button?: ButtonData;
}

export interface FeatureBlock extends Omit<Block, 'template'> {
  template: FeatureData;
}
export interface FeatureData {
  navTitle: string;
  image?: ImageData;
  caption?: TextData;
  header?: TextData;
  headerHighlight?: TextData;
  body?: TextData;
  button?: ButtonData;
}

export interface FooterBlock extends Omit<Block, 'template'> {
  template: FooterData;
}
export interface FooterData {
  navTitle: string;
  leftText?: TextData;
  rightText?: TextData;
}

//SettingBlock & SiteBlock Props
export interface SettingBlockProps {
  blockId: string;
  onRemove: (event: React.MouseEvent<HTMLElement>) => void;
}
export interface SiteBlockProps {
  blockId: string;
  type: string;
}
