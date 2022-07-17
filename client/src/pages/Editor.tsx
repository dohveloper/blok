import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Sidetab from "../components/Editor/Sidetab";
import EditorSection from "../components/Editor/EditorSection";
import { useSelector } from "react-redux";
import AlertModal from "../components/AlertModal";
import ConfirmModal from "../components/ConfirmModal";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f7f7f9;
  display: flex;

  @media screen and (max-width: 1120px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media screen and (max-width: 1120px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Elice Digital Baeum', sans-serif;
    font-size: 30px;
  }
`;

export default function Editor() {
  const AlertModalState = useSelector((state: any) => state.alertReducer.state);

  const alertData = useSelector((state: any) => state.alertReducer.alertData);

  const ConfirmModalState = useSelector(
    (state: any) => state.modalReducer.isConfirmModal
  );

  const confirmData = useSelector(
    (state: any) => state.modalReducer.confirmData
  );

  return (
    <>
      <DesktopContainer>
        <Sidebar />
        <Sidetab />
        <EditorSection />
        {AlertModalState && <AlertModal alertData={alertData} />}
        {ConfirmModalState && <ConfirmModal confirmData={confirmData} />}
      </DesktopContainer>
      <MobileContainer>
        <div>
          현재 <b>모바일 버전</b>은 지원하지 않고 있습니다.
        </div>
        <div>
          빠른 시일 내에 <b>업데이트</b> 하도록 하겠습니다.
        </div>
        <br />
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button color="white" size="large">
            Home
          </Button>
        </Link>
      </MobileContainer>
    </>
  );
}