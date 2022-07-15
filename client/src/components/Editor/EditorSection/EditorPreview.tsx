import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 80px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

export default Preview;
function Preview() {
  return <Container></Container>;
}
