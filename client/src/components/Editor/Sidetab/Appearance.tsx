import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../reducers";
import ColorSetExample from "../../ColorSetExample";
import { CustomSelect } from "../../Input";
import AppearanceData from "../AppearanceData";

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
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
    display: ${(props) => (props.required === true ? "static" : "none")};
  }
`;

const Required = styled.span`
  color: red;
  margin-left: 2px;
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
  const fontList = AppearanceData().fontData;
  const colorSetList = AppearanceData().colorSetData;
  const themeList = AppearanceData().themeData;

  const data = useSelector((state: RootState) => state.site);
  const [colorSet, setColorSet] = useState(data.colorSet);
  const [font, setFont] = useState(data.font);
  const [theme, setTheme] = useState(data.theme);

  // siteReducer 완성시 dispatch 추가 예정
  // useEffect(() => {
  //   console.log(colorSet);
  // }, [colorSet]);

  // useEffect(() => {
  //   console.log(font);
  // }, [font]);

  // useEffect(() => {
  //   console.log(theme);
  // }, [theme]);

  return (
    <>
      <Container>
        <Label required={true}>
          색상조합
          <Required>*</Required>
        </Label>
        <ExampleContainer>
          <ColorSetExample colorSet={colorSet} />
        </ExampleContainer>
        <CustomSelect
          value={
            colorSetList.filter(
              (item: any) => item.value.primary === colorSet.primary
            )[0]
          }
          onChange={(e: any) => setColorSet(e.value)}
          options={colorSetList}
        />
      </Container>
      <Container>
        <Label required={true}>
          폰트
          <Required>*</Required>
        </Label>
        <ExampleContainer>
          <FontExample font={font} />
        </ExampleContainer>
        <CustomSelect
          value={fontList.filter((item: any) => item.value === font)[0]}
          onChange={(e: any) => setFont(e.value)}
          options={fontList}
        />
      </Container>
      <Container>
        <Label required={true}>
          테마
          <Required>*</Required>
        </Label>
        <CustomSelect
          value={themeList.filter((item: any) => item.value === theme)[0]}
          onChange={(e: any) => setTheme(e.value)}
          options={themeList}
          guideline={"❗️테마에 블록 타입이 없을 시 블록이 삭제될 수 있습니다."}
        />
      </Container>
    </>
  );
}
