import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../Button";
import { TextInput } from "../../Input";
import { useParams } from "react-router";

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
`;

export default function Setting() {
  const dispatch = useDispatch();
  const [domain, setDomain] = useState("");

  const siteId = useParams;
  console.log("editor-siteId:", siteId);

  const getDomainInfo = async () => {
    try {
      axios.get(`/api/site/${siteId}`).then((res): void => {
        console.log(res.data);
        // Site API 연동 에러, 백엔드 수정 필요
        // const domain = res.data.sites[0].domain;
        // setDomain(domain);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDomainInfo();
  }, []);

  const deleteHandler = () => {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "삭제",
        msg: `${domain} 페이지를 정말 삭제하시겠습니까?`,
      },
    });

    // try-catch 페이지 삭제 요청
    // alert 삭제되었습니다.
  };

  return (
    <>
      <Container>
        <TextInput
          title="도메인"
          required={true}
          //value={domain}
          guideline="도메인을 변경할 수 있습니다."
          onChange={setDomain}
        ></TextInput>
      </Container>
      <ButtonContainer>
        <Button
          onClick={deleteHandler}
          color="black"
          size="large"
          rounding
          fullWidth
        >
          페이지 삭제
        </Button>
      </ButtonContainer>
    </>
  );
}
