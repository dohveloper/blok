import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { TemplateCard } from "./TemplateCard";
import Button from "../Button";
import { useState, useRef } from "react";
import { RootState } from "../../reducers";
import { InputDiv, Input, InputTitle } from "./UserUpdate";
import { templateCardData } from "./TemplateData";
import templateListData from "./TemplateData";
import axios from "axios";

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
type SiteData = {
  owner: string | undefined;
  name: string;
  domain: string;
  theme: string;
  font: string;
  colorSet: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
  };
  blocks: [];
};

export default function TemplateModal() {
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: RootState) => state.loginCheckReducer.loginData
  );

  const siteName = useRef<HTMLInputElement>(null);
  const domain = useRef<HTMLInputElement>(null);
  const siteDesc = useRef<HTMLTextAreaElement>(null);
  const [siteNameError, setSiteNameError] = useState(false);
  const [domainError, setDomainError] = useState(false);
  const [template, setTemplate] = useState("");
  const [data, setData] = useState<SiteData>({
    owner: userData?.userId,
    name: "",
    domain: "",
    theme: "",
    font: "",
    colorSet: {
      primary: "",
      secondary: "",
      background: "",
      surface: "",
    },
    blocks: [],
  });

  const onSelectHandler = (title: string) => {
    console.log(title);
    setTemplate(title);
  };

  const selectTemplateHandler = () => {
    // 템플릿 선택 시, 해당 하는 colorSet, font 등 추가
    let selectedTemplate = {};
    switch (template) {
      case "랜딩페이지":
        selectedTemplate = templateListData().landingPage;
        break;
      case "이력서":
        selectedTemplate = templateListData().portfolio;
        break;
      case "기업소개 웹사이트":
        selectedTemplate = templateListData().companyProfile;
        break;
      case "기본 웹사이트":
        selectedTemplate = templateListData().basicWeb;
        break;
      default:
        alert("어떤 값인지 파악이 되지 않습니다.");
    }

    console.log(selectedTemplate);

    setData((prev) => {
      return {
        ...prev,
        ...selectedTemplate,
        template: template,
      };
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

  const createSiteHandler = async () => {
    if (siteName.current!.value === "" || domain.current!.value === "") {
      console.log("인풋없음");
      return;
    }
    setData((prev) => {
      return {
        ...prev,
        name: siteName.current!.value,
        domain: domain.current!.value,
      };
    });

    console.log(
      `template: ${template}, siteName: ${
        siteName.current!.value
      }, domain: www.block.com/${domain.current!.value}, siteDesc: ${
        siteDesc.current!.value
      } => create web!`
    );

    const res = await axios.post(`/api/site/addsite`, data);
    console.log("POST 요청 - 사이트추가 : ", res.data);
    dispatch({ type: "alertOn", payload: "사이트 추가되었습니다." });
    // 에디터 페이지로 이동
  };

  const closeModalHandler = () => {
    dispatch({ type: "TEMPLATE/MODAL_OFF" });
  };

  return (
    <>
      <ModalContainer>
        <MainTitle>
          {data.theme === "" ? "템플릿 선택" : "도메인 설정"}
        </MainTitle>
        {data.theme === "" ? (
          <TemplateListContainer>
            {templateCardData?.map((e: any) => (
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
        {data.theme === "" ? (
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
