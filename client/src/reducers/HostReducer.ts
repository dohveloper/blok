import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Site,
  Block,
  BlockDataOptions,
} from '../components/Blocks/blockValidator';
import { RootState } from './store';

//Initial Value
export const initialState: Site = {
  id: 1,
  name: '',
  domain: '',
  theme: 'Simple',
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
export const hostSlice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    // 호스팅페이지 접속 시, siteId 별 데이터 불러오기
    getHostedSite: (state, action) => {
      state.id = action.payload.id;
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
    updateBlockData: (
      state,
      action: PayloadAction<{
        blockId: number;
        field: string;
        value: BlockDataOptions;
      }>
    ) => {
      const { blockId, field, value } = action.payload;
      let index = state.blocks.findIndex((block) => block.id === blockId);
      state.blocks[index].data[field] = value;
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
  },
});

//Selectors
export const selectBlocks = (state: RootState) => state.site.blocks;
export const selectBlockById = (state: RootState, blockId: number) => {
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
  getHostedSite,
  addBlock,
  removeBlock,
  updateColorSet,
  updateFont,
  updateTheme,
  updateDomain,
  updateBlockData,
  moveBlock,
} = hostSlice.actions;
export default hostSlice.reducer;
