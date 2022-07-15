import React, { Suspense } from 'react';
import styled from 'styled-components';
import Button from '../../Button';
//import Navbar from '../../Blocks/Simple/Nav/SettingBlock';
import Hero from '../../Blocks/Simple/Hero/SettingBlock';
import Feature from '../../Blocks/Simple/Feature/SettingBlock';
import Footer from '../../Blocks/Simple/Footer/SettingBlock';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../reducers/store';

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const SettingBlock = styled.div`
  margin: 4px 0;
`;

export default function Block() {
  const { blocks } = useSelector((state: RootState) => state.site);

  //Set settinbBlocks dynamically.
  const settingBlocks = blocks.map((block) => {
    const { template, data } = block;
    const { theme, blockType, layout } = template;

    const SettingBlock = React.lazy(
      () => import(`../../Blocks/${theme}/${blockType}/SettingBlock`)
    );
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SettingBlock data={data}></SettingBlock>
      </Suspense>
    );
  });

  return (
    <Container>
      <Button color="black" size="large" rounding fullWidth>
        블록 추가하기
      </Button>
      <div>{settingBlocks}</div>
    </Container>
  );
}
