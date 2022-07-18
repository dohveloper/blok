import styled from "styled-components";

export default function SiteBlock(props: any) {
  const Container = styled.div`
    background-color: ${props.colorSet.background};
    font-family: ${props.font};
    color: ${props.colorSet.surface};

    padding: 100px 40px;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  `;

  const TextContainer = styled.div`
    vertical-align: middle;
    padding-top: 30px;

    @media screen and (max-width: 1120px) {
      width: 400px;
    }
  `;

  const Img = styled.img`
    width: 400px;
    padding-right: 20px;
    padding-top: 30px;

    @media screen and (max-width: 1120px) {
      width: 400px;
      padding-rigtht: 0;
    }
  `;

  const Caption = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: ${props.colorSet.primary};
    margin-bottom: 10px;

    @media screen and (max-width: 1120px) {
      font-size: 1.4vw;
    }
  `;

  const Header = styled.div`
    font-size: 2rem;
    font-weight: 700;
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
      padding: 1vw 2vw;
    }
  `;

  function buttonHandler() {
    window.location.href = props.data.button.url ? props.data.button.url : "";
  }

  return (
    <>
      <Container id={props.data.navTitle}>
        {props.data.image.src && (
          <Img
            src={props.data.image.src}
            alt={props.data.image.alt ? props.data.image.alt : ""}
          />
        )}
        <TextContainer>
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
        </TextContainer>
      </Container>
    </>
  );
}
