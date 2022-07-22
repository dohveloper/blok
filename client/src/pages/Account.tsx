import styled from "styled-components";
import MyInfo from "../components/Dashboard/MyInfo";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export default function Account() {
  return (
    <Container>
      <Sidebar />
      <MyInfo />
    </Container>
  );
}
