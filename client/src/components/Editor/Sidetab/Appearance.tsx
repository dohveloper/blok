import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

  const [colorSet, setColorSet] = useState<any>([]);
  const [font, setFont] = useState<any>([]);
  const [theme, setTheme] = useState<any>([]);

  const dispatch = useDispatch();

  const { siteId } = useParams();

  async function getStyleInfo() {
    try {
      const res = await axios.get("/site/2");
      const data = res.data.sites[0];
      setColorSet(data.colorSet);
      setFont(data.font);
      setTheme(data.theme);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getStyleInfo();
  }, []);

  const changeThemeHandler = (props: string) => {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "테마 변경",
        msg: `테마에 해당 블록타입이 없을 시 블록이 삭제될 수 있습니다. 테마를 변경하시겠습니까?`,
        action: "changeTheme",
        props: props,
      },
    });
  };

  const modalAction = useSelector(
    (state: RootState) => state.modalReducer.confirmData
  );

  const changeTheme = () => {
    try {
      if (modalAction?.props === "") {
        console.log("modolAction의 props를 불러오지 못했습니다.");
        return;
      }
      setTheme(modalAction?.props);
      dispatch({ type: "CONFIRM/MODAL_OFF" });
    } catch (e) {
      console.log(e);
    }
  };

  if (modalAction?.action === "changeTheme") {
    changeTheme();
  }

  return (
    <>
      <Container id="colorSet">
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
      <Container id="font">
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
      <Container id="theme">
        <Label required={true}>
          테마
          <Required>*</Required>
        </Label>
        <CustomSelect
          value={themeList.filter((item: any) => item.value === theme)[0]}
          onChange={(e: any) => changeThemeHandler(e.value)}
          options={themeList}
        />
      </Container>
    </>
  );
}
