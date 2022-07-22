import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Site,
  Block,
  BlockDataOptions,
  TemplateData,
} from '../components/Blocks/blockValidator';
import { RootState } from './store';

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
  blocks: [
    {
      id: 'sdafdsfsadf',
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
      id: 'dafsasdfsdfs',
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
      id: 'asdfsdf',
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
      id: 'asdfsdfdasf',
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
export const testSite: Site = {
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
  blocks: [
    {
      id: 'sdafhhsdf',
      template: {
        theme: 'Simple',
        blockType: 'Feature',
        layout: null,
      },
      data: {
        navTitle: '기능1',
        style: {
          value: 'Simple Default',
        },
        image: {
          src: 'https://images.unsplash.com/photo-1658081459867-108ddc6f7dc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
          alt: 'logo',
        },
        caption: {
          value: '노코드 웹사이트 빌더',
        },
        header: {
          value: '블록으로 웹사이트를 만들어보세요',
        },
        headerHighlight: {
          value: '웹사이트',
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
  ],
};

//Create Slice
export const siteSlice = createSlice({
  name: 'site',
  initialState: testSite,
  reducers: {
    // 에디터페이지 접속 시, siteId 별 데이터 불러오기
    getSite: (state, action) => {
      state.name = action.payload.name;
      state.domain = action.payload.domain;
      state.theme = action.payload.theme;
      state.font = action.payload.font;
      state.colorSet = action.payload.colorSet;
      state.blocks = action.payload.blocks;
    },
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
    updateSite: (state, action) => {
      state.theme = action.payload.theme;
      state.blocks = action.payload.blocks;
    },
    updateBlockData: (
      state,
      action: PayloadAction<{
        blockId: string;
        field: string;
        value: BlockDataOptions;
      }>
    ) => {
      const { blockId, field, value } = action.payload;
      let index = state.blocks.findIndex((block) => block.id === blockId);
      state.blocks[index].data[field] = value;
    },
    updateTemplate: (
      state,
      action: PayloadAction<{
        blockId: string;
        newTemplate: TemplateData;
      }>
    ) => {
      const { blockId, newTemplate } = action.payload;
      let index = state.blocks.findIndex((block) => block.id === blockId);
      state.blocks[index].template = newTemplate;
    },
    moveBlock: (
      state,
      action: PayloadAction<{
        sourceIndex: number;
        destinationIndex: number;
      }>
    ) => {
      moveItem(
        state.blocks,
        action.payload.sourceIndex,
        action.payload.destinationIndex
      );
    },
    toggleCardState: (state, action: PayloadAction<string>) => {
      //해당 id의 블록을 찾는다.
      const blockId = action.payload;
      const index = state.blocks.findIndex((block) => block.id === blockId);
      let block = state.blocks[index];

      if (typeof block.isCardOpened === 'undefined') {
        //block에 isOpenedCard 필드가 없을경우 추가하고 true로 셋
        block['isCardOpened'] = true;
      } else {
        //block에 isOpenedCard 있을경우 현재값의 반대를 저장
        block.isCardOpened = !block.isCardOpened;
      }
    },
  },
});

//Selectors
export const selectBlocks = (state: RootState) => state.site.blocks;
export const selectBlockById = (state: RootState, blockId: string) => {
  const block = state.site.blocks.find((block) => block.id === blockId);
  if (typeof block === 'undefined') {
    throw new Error('Feature: No block found');
  }
  return block;
};

//Helpers & Values
export const pinnedBlockTypes = ['Nav', 'Footer', 'Hero'];
export const blockDataUpdateChecker = (
  prevBlocks: Block[],
  currentBlocks: Block[]
) => {
  //1. length 가 다름 -> 추가,삭제 등으로 블록 수가 변경되었을 때
  if (prevBlocks.length !== currentBlocks.length) {
    return false;
  }
  //2. id,style -> 블록 순서(id)나 style 이 변경되었을 때
  for (let i = 0; i < prevBlocks.length; i++) {
    if (prevBlocks[i].id !== currentBlocks[i].id) {
      return false;
    }
    if (prevBlocks[i].template.theme !== currentBlocks[i].template.theme) {
      return false;
    }
    if (prevBlocks[i].template.layout !== currentBlocks[i].template.layout) {
      return false;
    }
  }
  return true;
};
function moveItem(blocks: any, sourceIndex: number, destinationIndex: number) {
  const blockToMove = blocks[sourceIndex];
  const destinationBlockType = blocks[destinationIndex].template.blockType;

  if (pinnedBlockTypes.includes(destinationBlockType)) {
    return -1;
  } else {
    blocks.splice(sourceIndex, 1);
    blocks.splice(destinationIndex, 0, blockToMove);
  }
}

//Action creators are generated for each case reducer function
export const {
  getSite,
  addBlock,
  removeBlock,
  updateColorSet,
  updateFont,
  updateTheme,
  updateDomain,
  updateSite,
  updateBlockData,
  updateTemplate,
  moveBlock,
  toggleCardState,
} = siteSlice.actions;
export default siteSlice.reducer;
