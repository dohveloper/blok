import styled from "styled-components";
import Button from "../../Button";

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default function Block() {
  return (
    <Container>
      <Button color="black" size="large" rounding fullWidth>
        블록 추가하기
      </Button>
    </Container>
  );
}
