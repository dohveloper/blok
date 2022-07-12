import styled from "styled-components";
import MyInfo from "../components/MyInfo";
import Sidebar from "../components/Sidebar";
import ConfirmModal from "../components/ConfirmModal";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export default function Account() {
  const ConfirmModalState = useSelector(
    (state: any) => state.modalReducer.isConfirmModal
  );
  const confirmData = useSelector(
    (state: any) => state.modalReducer.confirmData
  );

  return (
    <Container>
      <Sidebar />
      <MyInfo />
      {ConfirmModalState && <ConfirmModal confirmData={confirmData} />}
    </Container>
  );
}
