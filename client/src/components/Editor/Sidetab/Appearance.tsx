import { SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../reducers';
import ColorSetExample from '../../ColorSetExample';
import { CustomSelect } from '../../Input';
import AppearanceData from '../../Blocks/AppearanceData.json';
import config from '../../Blocks/blockTemplates.json';
import Button from '../../Button';
import ReactSelect from 'react-select';
import { ColorSet } from '../../Blocks/blockValidator';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
`;

const InnerContainer = styled.div`
  display: flex;
  padding: 15px 0;
  justify-content: space-around;
`;

const ExampleContainer = styled.div`
  padding: 50px 0;
  display: flex;
  justify-content: center;
`;

const Label = styled.div<{ required?: boolean }>`
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 12px;
  span {
    display: ${(props) => (props.required === true ? 'static' : 'none')};
  }
`;

const Required = styled.span`
  color: red;
  margin-left: 2px;
`;

const SelectBox = styled(ReactSelect)`
  width: 280px;
  & :hover {
    cursor: pointer;
  }
`;

function FontExample(props: any) {
  const data = props.font.value ? props.font.value : props.font;

  const FontExample = styled.div`
    font-family: ${data};
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  `;
  return <FontExample>{data}</FontExample>;
}

export default function Appearance() {
  const fontList = AppearanceData.fontData;
  const colorSetList = AppearanceData.colorSetData;
  const themeList = AppearanceData.themeData;
  const data = useSelector((state: RootState) => state.site);
  const dispatch = useDispatch();

  const [colorSet, setColorSet] = useState(data.colorSet);
  const [font, setFont] = useState(data.font);
  const [theme, setTheme] = useState(data.theme);

  function ThemeHandler() {
    const newTheme = theme;
    const blockTemplates = config.blockTemplates;
    const newThemeCheckList: string[][] = [];

    for (let i = 0; i < blockTemplates.length; i++) {
      if (blockTemplates[i].template.theme === newTheme) {
        const newThemeCheck = [
          blockTemplates[i].template.blockType,
          blockTemplates[i].template.layout,
        ];
        newThemeCheckList.push(newThemeCheck);
      }
    }

    const newBlockList = data.blocks.filter((item) => {
      const list = [item.template.blockType, item.template.layout ?? ''];
      for (let i = 0; i < newThemeCheckList.length; i++) {
        if (
          newThemeCheckList[i][0] === list[0] &&
          newThemeCheckList[i][1] === list[1]
        ) {
          return true;
        }
      }
      return false;
    });

    try {
      dispatch({ type: 'CONFIRM/MODAL_OFF' });
      dispatch({
        type: 'site/updateSite',
        payload: { theme: newTheme, blocks: newBlockList },
      });
      setTheme(newTheme);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    dispatch({ type: 'site/updateColorSet', payload: colorSet });
  }, [colorSet]);

  useEffect(() => {
    dispatch({ type: 'site/updateFont', payload: font });
  }, [font]);

  return (
    <>
      <Container>
        <Label required>
          색상조합
          <Required>*</Required>
        </Label>
        <ExampleContainer>
          <ColorSetExample colorSet={colorSet} />
        </ExampleContainer>
        <CustomSelect
          value={
            colorSetList.filter(
              (item) => item.value.primary === colorSet.primary
            )[0]
          }
          onChange={(e: { value: SetStateAction<ColorSet> }) =>
            setColorSet(e.value)
          }
          options={colorSetList}
        />
      </Container>
      <Container>
        <Label required>
          폰트
          <Required>*</Required>
        </Label>
        <ExampleContainer>
          <FontExample font={font} />
        </ExampleContainer>
        <CustomSelect
          value={fontList.filter((item) => item.value === font)[0]}
          onChange={(e: { value: SetStateAction<string> }) => setFont(e.value)}
          options={fontList}
        />
      </Container>
      <Container>
        <Label required>
          테마
          <Required>*</Required>
        </Label>
        <InnerContainer>
          <SelectBox
            value={themeList.filter((item) => item.value === theme)[0]}
            onChange={(e: any) => setTheme(e.value)}
            options={themeList}
          />
          <Button
            size='medium'
            color='white'
            onClick={() => {
              dispatch({
                type: 'CONFIRM/MODAL_ON',
                payload: {
                  title: '테마 변경',
                  msg: '해당 테마에 타입이 없는 블록들은 삭제됩니다. 변경하시겠습니까?',
                  onConfirm: ThemeHandler,
                },
              });
            }}
          >
            변경
          </Button>
        </InnerContainer>
      </Container>
    </>
  );
}
