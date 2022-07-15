import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const unclicked = "#999999";
const clicked = "#000000";

const Container = styled.div`
  width: 560px;
  height: 60px;
  background-color: white;
  position: fixed;
  top: 0px;
  display: flex;
  align-items: center;
`;

export default function SidetabHeader() {
  const dispatch = useDispatch();
  const now = useSelector((state: any) => state.sidetabReducer);
  const toolList = ["Block", "Appearance", "Setting"];
  const itemWidth = 100 / toolList.length;

  if (!now) {
    dispatch({ type: toolList[0] });
  }

  const Item = styled.div`
  width: ${itemWidth}%;
  text-align: center;
  font-weight: 650;
  color: ${unclicked};

  :hover {
    cursor: pointer;
  }
`;

  useEffect(() => {
    for (let i = 0; i < toolList.length; i++) {
      const target = document.getElementById(toolList[i]);

      if (target) {
        if (toolList[i] === now) {
          target.style.color = clicked;
        } else {
          target.style.color = unclicked;
        }
      }
    }
  }, [now]);

  function Items() {
    let items = [];
    for (let i = 0; i < toolList.length; i++) {
      items.push(
        <Item
          key={toolList[i]}
          id={toolList[i]}
          onClick={() => dispatch({ type: toolList[i] })}
        >
          {toolList[i]}
        </Item>
      );
    }
    return items;
  }

  return <Container>{Items()}</Container>;
}
