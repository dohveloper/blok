import styled from "styled-components";

const Container = styled.div`
  width: 220px;
  height: 70px;
  display: flex;
`;

function drawCircle(len: number, background: string, index: number) {
  const Circle = styled.div`
    width: 60px;
    height: 60px;
    border: ${background === '#000000' ? '6px solid #000000' : '6px solid #3f3f3f'};
    border-radius: 50%;
    margin-right: -25px;
    background-color: ${background};
    z-index: ${len - index};
  `;

  return <Circle key={index} />;
}

export default function ColorSetExample(props: any) {
  const colorList = [];
  const circleList = [];
  const data = props.colorSet.value ? props.colorSet.value : props.colorSet;

  for (let color in data) {
    if (data.hasOwnProperty(color)) {
      colorList.push(data[color]);
    }
  }

  for (let i = 0; i < colorList.length; i++) {
    circleList.push(drawCircle(colorList.length, colorList[i], i));
  }

  return <Container>{circleList}</Container>;
}
