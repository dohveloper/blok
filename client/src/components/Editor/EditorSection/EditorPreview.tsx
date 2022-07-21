import React, { Suspense } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../reducers/store';
import PageLoading from './PageLoading';
import ErrorBoundary from '../ErrorBoundary';
import {
  selectBlocks,
  blockDataUpdateChecker,
} from '../../../reducers/SiteReducer';

const NAV_WIDTH = 72;
const SIDETAB_WIDTH = 440;
const Container = styled.div`
  position: fixed;
  top: 60px;
  padding: 32px 64px;
  width: calc(100% - ${NAV_WIDTH + SIDETAB_WIDTH}px);
  height: calc(100% - 60px);
  box-sizing: border-box;
  overflow-y: scroll;
`;
const SiteBlockList = styled.div<{ blockCount: number }>`
  width: 100%;
  background: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  ${(props) =>
    props.blockCount === 0 &&
    css`
      min-height: 100%;
    `}
`;
const SiteBlockContainer = styled.div`
  div {
    :last-child {
      border-bottom: none;
    }
  }
`;

export default function EditorPreview() {
  const colorSet = useSelector((state: RootState) => state.site.colorSet);
  const font = useSelector((state: RootState) => state.site.font);
  const blocks = useSelector(selectBlocks, blockDataUpdateChecker);

  const siteBlocks = blocks.map((block) => {
    const {
      template: { theme, blockType, layout },
      id,
    } = block;
    const SiteBlock = React.lazy(
      () =>
        import(
          `../../Blocks/${theme}/${blockType}/${
            layout ? layout + '/' : ''
          }SiteBlock`
        )
    );
    return (
      <SiteBlock
        key={id}
        blockId={id}
        colorSet={colorSet}
        font={font}
      ></SiteBlock>
    );
  });
  return (
    <Container>
      <SiteBlockList blockCount={blocks.length}>
        <ErrorBoundary>
          <SiteBlockContainer>
            <Suspense fallback={<PageLoading />}>{siteBlocks}</Suspense>
          </SiteBlockContainer>
        </ErrorBoundary>
      </SiteBlockList>
    </Container>
  );
}
