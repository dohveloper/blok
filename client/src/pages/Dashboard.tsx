import styled from "styled-components";
import { CustomTitle } from "../components/Account/Title";
// import DashboardInfo from "../components/DashboardBox";
import * as DashboardBox from "../components/DashboardBox";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function Dashboard() {
  return (
    <Container>
      <CustomTitle>Dashboard</CustomTitle>
      <DashboardBox.DashboardInfo></DashboardBox.DashboardInfo>
      <DashboardBox.templateList></DashboardBox.templateList>
    </Container>
  );
}
