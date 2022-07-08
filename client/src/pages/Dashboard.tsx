import styled from "styled-components";
import { CustomTitle } from "../components/Account/Title";
import DashboardInfo from "../components/Dashboard/DashboardBox";

export default function Dashboard() {
  return (
    <div>
      <CustomTitle>Dashboard</CustomTitle>
      <DashboardInfo></DashboardInfo>
    </div>
  );
}
