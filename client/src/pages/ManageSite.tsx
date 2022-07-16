import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SiteTable from "../components/Dashboard/SiteTable";

const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default function ManageSite() {
  return (
    <Container>
      <SiteTable />
      <Sidebar />
    </Container>
  );
}
