import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { MainTitle } from "../components/MyInfo";
import UserTable from "../components/UserTable";

const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default function Admin() {
  return (
    <Container>
      <MainTitle>Site Management</MainTitle>
      <UserTable />
      <Sidebar />
    </Container>
  );
}
