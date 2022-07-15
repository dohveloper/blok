import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Block } from '../components/Blocks/blockValidator';

//Site Interface
export interface SiteState {
  id: number | null;
  name: string;
  domain: string;
  theme: string;
  font: string;
  colorSet: ColorSet;
  blocks: Block[] | [];
}
interface ColorSet {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
}

//Initial Value
const initialState: SiteState = {
  id: null,
  name: '',
  domain: '',
  theme: '',
  font: '',
  colorSet: {
    primary: '',
    secondary: '',
    surface: '',
    background: '',
  },
  blocks: [],
};
const initialStateSample: SiteState = {
  id: 2,
  name: 'First Site',
  domain: 'firstSite',
  theme: 'Simple',
  font: 'Roboto',
  colorSet: {
    primary: '#482924',
    secondary: '#123456',
    background: '#123456',
    surface: '#123456',
  },
  blocks: [
    {
      id: 1,
      template: {
        theme: 'Simple',
        blockType: 'Nav',
        layout: null,
      },
      data: {
        navTitle: '',
        style: {
          value: '스타일1',
        },
        logoImage: {
          src: 'www.image.com/source/12312',
          alt: 'logo',
        },
        logoText: {
          value: '블록',
        },
        button: {
          title: '지원하기',
          url: 'form.google.com/joinTeam',
        },
      },
    },
    {
      id: 2,
      template: {
        theme: 'Simple',
        blockType: 'Hero',
        layout: null,
      },
      data: {
        navTitle: '홈',
        style: {
          value: '',
        },
        image: {
          src: 'www.image.com/source/12312',
          alt: 'logo',
        },
        caption: {
          value: '노코드 웹사이트 빌더',
        },
        header: {
          value: '블록으로 웹사이트를 만들어보세요',
        },
        body: {
          value:
            '블록은 노코드 웹사이트 빌더입니다. 빠르고 쉽게 웹사이트를 만들어보세요.',
        },
        button: {
          title: '웹사이트 만들기',
          url: 'block.com/login',
        },
      },
    },
    {
      id: 3,
      template: {
        theme: 'Simple',
        blockType: 'Feature',
        layout: null,
      },
      data: {
        navTitle: '기능1',
        style: {
          value: '',
        },
        image: {
          src: 'www.image.com/source/12312',
          alt: 'logo',
        },
        caption: {
          value: '노코드 웹사이트 빌더',
        },
        header: {
          value: '블록으로 웹사이트를 만들어보세요',
        },
        body: {
          value:
            '블록은 노코드 웹사이트 빌더입니다. 빠르고 쉽게 웹사이트를 만들어보세요.',
        },
        button: {
          title: '웹사이트 만들기',
          url: 'block.com/login',
        },
      },
    },
    {
      id: 4,
      template: {
        theme: 'Simple',
        blockType: 'Footer',
        layout: 'Right',
      },
      data: {
        navTitle: '',
        style: { value: '' },
        rightText: {
          value: '다양한 템플릿으로 웹사이트를 만들어보세요.',
        },
        leftText: {
          value: '블록은 랜딩페이지부터 이력서까지 다양한 템플릿을 제공합니다.',
        },
      },
    },
  ],
};

//Create Slice
export const siteSlice = createSlice({
  name: 'site',
  initialState: initialStateSample,
  reducers: {
    addBlock: (state, action: PayloadAction<number>) => {},
  },
});

//Action creators are generated for each case reducer function
export const { addBlock } = siteSlice.actions;
export default siteSlice.reducer;
