import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { TemplateCard } from "./TemplateCard";
import Button from "./Button";
import { useState } from "react";

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
  position: fixed;
  top: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 660px;
  border-radius: 10px;
  background-color: #fff;
  padding: 3rem;
  z-index: 5;
  overflow: scroll;

  .closeButton {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  @media screen and (max-width: 780px) {
    max-height: 100%;
    overflow-y: auto;
  }
`;

const TemplateListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: cneter;
  align-items: center;
  margin: 1rem;

  .selectedCard {
    border: 5px solid #dfdfdf;
  }

  @media screen and (max-width: 780px) {
    flex-direction: column;
  }
`;

const TemplateCardCustom = styled(TemplateCard)`
  :hover {
    background-color: lightgray;
  }
  :active {
    background-color: gray;
  }
`;

const MainTitle = styled.div`
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonPadiing = styled(Button)`
  padding: 0 5rem;
  display: block;
  margin: auto;
`;

const templateData = [
  { title: "랜딩페이지", description: "회사 웹사이트 템플릿 입니다." },
  {
    title: "이력서",
    description: "이력서 템플릿 입니다.",
    color1: "#2B9D67",
    color2: "#CEF0E2",
  },
  {
    title: "기업소개 웹사이트",
    description: "기업소개 템플릿 입니다.",
    color1: "#F5E44C",
    color2: "#CEA9D3",
  },
  {
    title: "기본 웹사이트",
    description: "기업소개 템플릿 입니다.",
    color1: "#F5E44C",
    color2: "#CEA9D3",
  },
];

export default function TemplateModal() {
  const [isSelected, setIsSelected] = useState("");
  const dispatch = useDispatch();

  const onSelectHandler = (title: string) => {
    setIsSelected(title);
  };

  const closeModalHandler = () => {
    dispatch({ type: "TEMPLATE/MODAL_OFF" });
  };

  const createSiteHandler = () => {
    if (isSelected === "") {
      alert("템플릿을 선택해주세요");
      return;
    }
    console.log(`${isSelected} create web!`);
  };

  return (
    <>
      <ModalContainer>
        <MainTitle>템플릿 선택</MainTitle>
        <TemplateListContainer>
          {templateData?.map((e) => (
            <>
              <TemplateCardCustom
                key={e.title}
                className={e.title === isSelected ? "selectedCard" : "card"}
                onClick={() => onSelectHandler(e.title)}
                title={e.title}
                description={e.description}
                color1={e.color1}
                color2={e.color2}
                // style={{ backgroundColor: "#aaa" }}
              />
            </>
          ))}
        </TemplateListContainer>
        <div className="closeButton" onClick={closeModalHandler}>
          <CgClose size={30} color={"gray"} />
        </div>
        <ButtonPadiing
          className="createButton"
          size="large"
          onClick={createSiteHandler}
        >
          사이트 만들기
        </ButtonPadiing>
      </ModalContainer>
      <ModalBackground />
    </>
  );
}
