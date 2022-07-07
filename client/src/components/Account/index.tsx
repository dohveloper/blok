import MyInfo from "./MyInfo";
import Title from "./Title";
import ManageAccount from "./ManageAccount";
import styled from "styled-components";

const Container = styled.div`
  background-color: fff;
  border-radius: 30px;
  padding: 49px 72px 25px 70px;
  box-sizing: border-box;
  width: 600px;
  border: 1px solid black;
`;

export default function AccountContainer() {
  return (
    <Container>
      <Title />
      <MyInfo />
      <ManageAccount />
    </Container>
  );
}
