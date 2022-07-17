import styled from "styled-components";

export default function SiteBlock(props: any) {
  const Container = styled.div`
    background-color: ${props.colorSet.background};
    font-family: ${props.font};
    color: ${props.colorSet.surface};
    display: flex;
    justify-content: space-around;
    align-items: center;
  `;

  const InnerContainer = styled.div`
    padding: 90px 40px;
    vertical-align: middle;
  `;

  const Caption = styled.div`
    font-size: 1rem;
    font-weight: 510;
    color: ${props.colorSet.primary};

    @media screen and (max-width: 1120px) {
      font-size: 1.4vw;
    }
  `;

  const Header = styled.div`
    font-size: 2rem;
    font-weight: 600;
    color: black;
    margin-bottom: 10px;

    @media screen and (max-width: 1120px) {
      font-size: 2.8vw;
    }
  `;

  const Body = styled.div`
    color: ${props.colorSet.surface};

    @media screen and (max-width: 1120px) {
      font-size: 1.4vw;
    }
  `;

  const Button = styled.button`
    background-color: ${props.colorSet.primary};
    color: white;
    padding: 10px 20px;
    border: 0;
    border-radius: 7px;
    font-size: 1rem;
    margin-top: 20px;

    :hover {
      cursor: pointer;
    }

    @media screen and (max-width: 1120px) {
      font-size: 1.4vw;
    }
  `;

  function buttonHandler() {
    window.location.href = props.data.button.url ? props.data.button.url : "";
  }

  return (
    <>
      <Container id={props.data.navTitle}>
        <InnerContainer>
          {props.data.caption.value && (
            <Caption>{props.data.caption.value}</Caption>
          )}
          {props.data.header.value && (
            <Header>{props.data.header.value}</Header>
          )}
          {props.data.body.value && <Body>{props.data.body.value}</Body>}
          {props.data.button.title && (
            <Button color={props.colorSet.primary} onClick={buttonHandler}>
              {props.data.button.title}
            </Button>
          )}
        </InnerContainer>
        {props.data.image.src && (
          <InnerContainer>
            <img
              src={props.data.image.src}
              alt={props.data.image.alt ? props.data.image.alt : ""}
            />
          </InnerContainer>
        )}
      </Container>
    </>
  );
}
