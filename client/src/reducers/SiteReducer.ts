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

//Create Slice
export const siteSlice = createSlice({
  name: 'site',
  initialState,
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
  },
});

//Action creators are generated for each case reducer function
export const {
  getSite,
  addBlock,
  removeBlock,
  updateColorSet,
  updateFont,
  updateTheme,
  updateDomain,
} = siteSlice.actions;
export default siteSlice.reducer;
