import styled from 'styled-components';

export default function SiteBlock(props: any) {
  const Container = styled.div`
    height: 50px;
    background-color: ${props.colorSet.background};
    font-family: ${props.font};
    color: ${props.colorSet.surface};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    font-size: 0.8rem;

    @media screen and (max-width: 1120px) {
      font-size: 1.5vw;
    }
    & p {
      color: white;
    }
  `;

  return (
    <>
      <Container>
        <p>{props.data.leftText.value}</p>
        <p>{props.data.rightText.value}</p>
      </Container>
    </>
  );
}
