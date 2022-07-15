import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { TemplateCard } from "./TemplateCard";
import Button from "./Button";
import { useState, useRef } from "react";
import { InputDiv, Input, InputTitle } from "./User";

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
  height: 520px;
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

const DomainContainer = styled.div`
  padding: 0 150px;
  margin-bottom: 40px;

  .inputBox {
    height: 120px;
    position: relative;

    .domainInput {
      padding-left: 98px;
    }

    p {
      position: absolute;
      font-size: 18px;
      font-weight: 600;
      bottom: 5px;
      left: 12px;
    }
  }

  .validationText {
    display: block;
    font-size: 12px;
    margin: 8px 3px 0 3px;
    color: #949494;
  }

  .siteDescription {
    border: 1px solid #ececec;
    font-size: 18px;
    height: 80px;
  }
`;

const CustomInputDiv = styled(InputDiv)`
  flex-direction: column;

  .inputBox {
    height: 60px;
  }
`;

const CustomInput = styled(Input)`
  border: 1px solid #ececec;
  font-size: 18px;
  height: 50px;
`;

const CustomInputTitle = styled(InputTitle)`
  font-size: 18px;
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
  const dispatch = useDispatch();
  const [template, setTemplate] = useState("");
  const siteName = useRef<HTMLInputElement>(null);
  const domain = useRef<HTMLInputElement>(null);
  const siteDesc = useRef<HTMLTextAreaElement>(null);
  const [siteNameError, setSiteNameError] = useState(false);
  const [domainError, setDomainError] = useState(false);
  const [data, setData] = useState({
    siteName: "",
    domain: "",
    template: "",
    siteDesc: "",
  });

  const onSelectHandler = (title: string) => {
    setTemplate(title);
  };

  const selectTemplateHandler = () => {
    setData((prev) => {
      return { ...prev, template: template };
    });
  };

  const validation = !siteNameError && !domainError;
  const checkEnga = /[a-z]/;

  const changeDomainHandler = (e: any) => {
    if (
      checkEnga.test(domain.current!.value) !== true ||
      domain.current!.value.length <= 1
    ) {
      setDomainError(true);
    } else {
      setDomainError(false);
    }
  };

  const changeSiteHandler = (e: any) => {
    if (siteName.current!.value.length <= 1) {
      setSiteNameError(true);
    } else {
      setSiteNameError(false);
    }
  };

  const createSiteHandler = () => {
    if (siteName.current!.value === "" || domain.current!.value === "") {
      console.log("인풋없음");
      return;
    }
    setData((prev) => {
      return {
        ...prev,
        siteName: siteName.current!.value,
        domain: domain.current!.value,
        siteDesc: siteDesc.current!.value,
      };
    });
    console.log(
      `template: ${template}, siteName: ${
        siteName.current!.value
      }, domain: www.block.com/${domain.current!.value}, siteDesc: ${
        siteDesc.current!.value
      } => create web!`
    );
  };

  const closeModalHandler = () => {
    dispatch({ type: "TEMPLATE/MODAL_OFF" });
  };

  return (
    <>
      <ModalContainer>
        <MainTitle>
          {data.template === "" ? "템플릿 선택" : "도메인 설정"}
        </MainTitle>
        {data.template === "" ? (
          <TemplateListContainer>
            {templateData?.map((e) => (
              <TemplateCardCustom
                key={e.title}
                className={e.title === template ? "selectedCard" : "card"}
                onClick={() => onSelectHandler(e.title)}
                title={e.title}
                description={e.description}
                color1={e.color1}
                color2={e.color2}
              />
            ))}
          </TemplateListContainer>
        ) : (
          <DomainContainer>
            <CustomInputDiv>
              <CustomInputTitle htmlFor="">사이트명</CustomInputTitle>
              <div className="inputBox">
                <CustomInput
                  type="text"
                  placeholder="사이트명을 입력하세요"
                  ref={siteName}
                  onChange={(e) => {
                    changeSiteHandler(e);
                  }}
                />
                <span className="validationText">
                  {siteNameError && "유효하지 않은 사이트명 입니다."}
                </span>
              </div>
            </CustomInputDiv>
            <CustomInputDiv>
              <CustomInputTitle htmlFor="">도메인 주소</CustomInputTitle>
              <div className="inputBox">
                <p>block.com/</p>
                <CustomInput
                  className="domainInput"
                  type="text"
                  placeholder="도메인 주소"
                  ref={domain}
                  onInput={(e) => {
                    changeDomainHandler(e);
                  }}
                />
                <span className="validationText">
                  {domainError && "유효하지 않은 도메인 입니다."}
                </span>
              </div>
            </CustomInputDiv>
            <CustomInputDiv>
              <CustomInputTitle htmlFor="">사이트 설명</CustomInputTitle>
              <textarea
                className="siteDescription"
                placeholder="만드실 사이트를 설명해주세요"
                ref={siteDesc}
              />
            </CustomInputDiv>
          </DomainContainer>
        )}

        <div className="closeButton" onClick={closeModalHandler}>
          <CgClose size={30} color={"gray"} />
        </div>
        {data.template === "" ? (
          <ButtonPadiing
            className="createButton"
            size="large"
            onClick={selectTemplateHandler}
          >
            다음
          </ButtonPadiing>
        ) : (
          <ButtonPadiing
            className="createButton"
            size="large"
            onClick={createSiteHandler}
            disabled={!validation}
          >
            사이트 만들기
          </ButtonPadiing>
        )}
      </ModalContainer>
      <ModalBackground />
    </>
  );
}
