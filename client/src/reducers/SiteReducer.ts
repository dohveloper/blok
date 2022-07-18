import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Site, Block } from '../components/Blocks/blockValidator';

//Initial Value
const initialState: Site = {
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
const initialStateSample: Site = {
  id: 2,
  name: 'First Site',
  domain: 'firstSite',
  theme: 'Simple',
  font: 'Roboto',
  colorSet: {
    primary: '#5754DE',
    secondary: '#ABA9FF',
    background: '#FFFFFF',
    surface: '#B0B0B0',
  },
  //blocks: [],
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
        layout: 'RightImg',
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
        layout: null,
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
    addBlock: (state, action: PayloadAction<Block>) => {
      const block = action.payload;
      const isBlockExist = (blockType: string): boolean => {
        const result = state.blocks.find(
          (block) => block.template.blockType === blockType
        );
        return result ? true : false;
      };
      let startIndex = 0;
      let endIndex = state.blocks.length;

      if (isBlockExist('Nav')) {
        startIndex++;
      }
      if (isBlockExist('Hero')) {
        startIndex++;
      }
      if (isBlockExist('Footer')) {
        endIndex--;
      }

      if (block.template.blockType === 'Nav') {
        //Nav블록 -> 맨 앞에 추가
        state.blocks.splice(0, 0, block);
      } else if (block.template.blockType === 'Hero') {
        //Hero블록 -> Nav 다음에 추가(Nav가 없을경우 맨 앞에 추가, Nav가 있을경우 두번째에 추가)
        state.blocks.splice(startIndex, 0, block);
      } else if (block.template.blockType === 'Footer') {
        //마지막에 추가(ex. Footer)
        state.blocks.splice(endIndex, 0, block);
      } else {
        //특정 순서가 없는 블록 추가 (Footer가 없을경우 마지막에 추가, Footer가 있을경우 마지막 이전에 추가)
        state.blocks.splice(endIndex, 0, block);
      }
    },
    removeBlock: (state, action: PayloadAction<number>) => {
      state.blocks.splice(action.payload, 1);
    },
    updateColorSet: (state, action) => {
      state.colorSet = action.payload;
    },
    updateFont: (state, action) => {
      state.font = action.payload;
    },
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
    updateDomain: (state, action) => {
      state.domain = action.payload;
    },
  },
});

//Action creators are generated for each case reducer function
export const {
  addBlock,
  removeBlock,
  updateColorSet,
  updateFont,
  updateTheme,
  updateDomain,
} = siteSlice.actions;
export default siteSlice.reducer;
