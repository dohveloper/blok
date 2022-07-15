import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ColorSetExample from "../../ColorSetExample";
import { CustomSelect, Label, Required } from "../../Input";
import AppearanceData from "../AppearanceData";

const Container = styled.div`
  width: 400px;
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
  const [colorSet, setColorSet] = useState<any>([]);
  const [font, setFont] = useState<any>([]);
  const [theme, setTheme] = useState<any>([]);

  const getStyleInfo = async () => {
    try {
      axios.get("/site/2").then((res): void => {
        const data = res.data.sites[0];
        setColorSet(data.colorSet);
        setFont(data.font);
        setTheme(data.theme);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStyleInfo();
  }, []);

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
          onChange={setColorSet}
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
          onChange={setFont}
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
          onChange={setTheme}
          options={themeList}
        />
      </Container>
    </>
  );
}
