import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Site,
  Block,
  SiteBlockProps,
  BlockData,
} from '../components/Blocks/blockValidator';
import { useAppSelector } from './hooks';

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
  },
});

// type 별 호스팅/프리뷰 데이터 처리 함수
export function SiteBlockByType(props: SiteBlockProps) {
  const { blockId, type } = props;
  const colorSet = useAppSelector((state) =>
    type === 'host' ? state.host.colorSet : state.site.colorSet
  );
  const font = useAppSelector((state) =>
    type === 'host' ? state.host.font : state.site.font
  );
  const blocks: BlockData = useAppSelector((state) =>
    type === 'host' ? state.host.blocks : state.site.blocks
  );

  const { data } = blocks.find((block: Block) => block.id === blockId);

  return { colorSet, font, data };
}

//Action creators are generated for each case reducer function
export const { getHostedSite } = hostSlice.actions;
export default hostSlice.reducer;
