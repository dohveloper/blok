import React, { Suspense } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../reducers/store';
import CardLoading from '../../Card/CardLoading';

const NAV_WIDTH = 72;
const SIDETAB_WIDTH = 440;
const Container = styled.div`
  position: fixed;
  top: 60px;
  padding: 32px 64px;
  width: calc(100% - ${NAV_WIDTH + SIDETAB_WIDTH}px);
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
`;
const SiteBlockList = styled.div`
  width: 100%;
  background: white;
  height: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
`;
const SiteBlockContainer = styled.div``;
const TestMessage = styled.div`
  padding: 24px;
`;

export default Preview;
function Preview() {
  const { blocks } = useSelector((state: RootState) => state.site);
  const siteBlocks = blocks.map((block) => {
    const { template, data, id } = block;
    const { theme, blockType, layout } = template;

    const SettingBlock = React.lazy(
      () =>
        import(
          `../../Blocks/${theme}/${blockType}/${
            layout ? layout + '/' : ''
          }SettingBlock`
        )
    );
    return (
      <SiteBlockContainer key={id}>
        <Suspense fallback={<CardLoading />}>
          <SettingBlock data={data}></SettingBlock>
        </Suspense>
      </SiteBlockContainer>
    );
  });
  console.log('siteBlocks:', siteBlocks);
  return (
    <Container>
      <SiteBlockList>
        {siteBlocks}
        <TestMessage>
          위 컴포넌트들은 예시로 들어가있는 샘플데이터입니다. 사이트블록 구현 및
          구조논의 후 정상적으로 수정될 예정입니다.{' '}
        </TestMessage>
      </SiteBlockList>
    </Container>
  );
}
