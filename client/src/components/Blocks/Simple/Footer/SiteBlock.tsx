import styled from "styled-components";

export default function SiteBlock(props: any) {
  const Container = styled.div`
    height: 50px;
    background-color: ${props.colorSet.background};
    font-family: ${props.font};
    color: ${props.colorSet.surface};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    @media screen and (max-width: 1120px) {
      font-size: 1.5vw;
    }
  `;

  return (
    <>
      <Container>
        <p>{props.data.leftText}</p>
        <p>{props.data.rightText}</p>
      </Container>
    </>
  );
}
