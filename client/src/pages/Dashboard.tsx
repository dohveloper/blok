import styled from "styled-components";
import * as DashboardBox from "../components/Dashboard/DashboardBox";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import TemplateModal from "../components/Dashboard/TemplateModal";
import ConfirmModal from "../components/ConfirmModal";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f9;
`;

export default function Dashboard() {
  const templateModalState = useSelector(
    (state: any) => state.modalReducer.isTemplateModal
  );
  const ConfirmModalState = useSelector(
    (state: any) => state.modalReducer.isConfirmModal
  );
  const confirmData = useSelector(
    (state: any) => state.modalReducer.confirmData
  );

  return (
    <Container>
      <Sidebar />
      <DashboardBox.DashboardInfo></DashboardBox.DashboardInfo>
      <DashboardBox.TemplateList></DashboardBox.TemplateList>
      {templateModalState && <TemplateModal />}
      {ConfirmModalState && <ConfirmModal confirmData={confirmData} />}
    </Container>
  );
}
