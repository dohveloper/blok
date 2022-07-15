import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import Button from "./Button";

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #202020;
  opacity: 0.55;
  overflow: hidden;
  z-index: 2;
`;

const ModalContainer = styled.div`
  flex-direction: column;
  position: fixed;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -75%);
  border-radius: 0.3rem;
  padding: 1rem;
  z-index: 5;

  .confirmHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
  }

  .confirmText {
    display: flex;
    color: black;
    margin: 1rem 1rem 1.2rem 0;
    text-align: center;
    line-height: 2rem;
    font-size: 1.1rem;
  }

  .buttonContainer {
    display: flex;
    margin-top: auto;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

interface IMyProps {
  confirmData: any;
}

export default function ConfirmModal(props: IMyProps) {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch({ type: "CONFIRM/MODAL_OFF" });
  };

  const conFirmHandler = () => {
    console.log("confirm!!!");
  };

  return (
    <>
      <ModalContainer>
        <div className="confirmHeader">
          <div className="confirmTitle">{props.confirmData.title}</div>
          <div className="closeButton" onClick={closeModalHandler}>
            <CgClose size={23} color={"gray"} />
          </div>
        </div>
        <div className="confirmText">{props.confirmData.msg}</div>
        <div className="buttonContainer">
          <Button size="medium" color="gray" onClick={closeModalHandler}>
            취소
          </Button>
          <Button size="medium" onClick={conFirmHandler}>
            확인
          </Button>
        </div>
      </ModalContainer>
      <ModalBackground />
    </>
  );
}
