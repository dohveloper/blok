import styled from 'styled-components';

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

    @media screen and (max-width: 1120px) {
      justify-content: flex-start;
    }
  `;

  const TextContainer = styled.div`
    vertical-align: middle;
    padding-bottom: 30px;
    text-align: center;

    @media screen and (max-width: 1120px) {
      width: 400px;
    }
  `;

  const Caption = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: ${props.colorSet.primary};
    margin-bottom: 15px;

    @media screen and (max-width: 1120px) {
      font-size: 1.4vw;
    }
  `;

  const Header = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color: black;

    @media screen and (max-width: 1120px) {
      font-size: 2.8vw;
    }
  `;

  const Body = styled.div`
    color: ${props.colorSet.surface};
    margin-top: 15px;

    @media screen and (max-width: 1120px) {
      font-size: 1.4vw;
    }
  `;

  function highlightHandler(header: string, keyword: string) {
    const HeaderHighlight = styled.span`
      font-size: 2rem;
      font-weight: 700;
      color: ${props.colorSet.primary};
      margin-bottom: 10px;

      @media screen and (max-width: 1120px) {
        font-size: 2.8vw;
      }
    `;

    let result = [];

    if (header.includes(keyword)) {
      const splitedByKeyword = header.split(keyword);
      for (let i = 0; i < splitedByKeyword.length - 1; i++) {
        result.push(
          <>
            <Header>{splitedByKeyword[i]}</Header>
            <HeaderHighlight>{keyword}</HeaderHighlight>
          </>
        );
      }
      result.push(
        <Header>{splitedByKeyword[splitedByKeyword.length - 1]}</Header>
      );
    } else {
      result.push(<Header>{header}</Header>);
    }

    return result.map((item) => item);
  }

  return (
    <>
      <Container id={props.data.navTitle}>
        <TextContainer>
          {props.data.caption.value && (
            <Caption>{props.data.caption.value}</Caption>
          )}
          {props.data.header.value &&
            (props.data.headerHighlight ? (
              highlightHandler(
                props.data.header.value,
                props.data.headerHighlight.value
              )
            ) : (
              <Header>{props.data.header.value}</Header>
            ))}
          {props.data.body.value && <Body>{props.data.body.value}</Body>}
        </TextContainer>
      </Container>
    </>
  );
}
