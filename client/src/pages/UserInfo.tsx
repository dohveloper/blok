import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import User from "../components/User";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f9;
`;

export default function UserInfo() {
  return (
    <Container>
      <Sidebar />
      <User />
    </Container>
  );
}
