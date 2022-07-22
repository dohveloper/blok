import styled from 'styled-components';
import { SiteBlockProps, ColorSet } from '../../../blockValidator';
import { ImgDiv } from '../SiteBlock';
import { SiteBlockByType } from '../../../../../reducers/HostReducer';

const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};

  padding: 80px 10px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 300px;
  padding-left: 10px;
  padding-top: 30px;

  @media screen and (max-width: 1120px) {
    width: 27vw;
  }
`;

const TextContainer = styled.div`
  vertical-align: middle;
  padding-top: 30px;
`;

const Caption = styled.div<{ colorSet: ColorSet }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.primary};
  margin-bottom: 10px;

  @media screen and (max-width: 1120px) {
    font-size: 1.4vw;
    margin-bottom: 1vw;
  }
`;

const Header = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: black;

  @media screen and (max-width: 1120px) {
    font-size: 3vw;
  }
`;

const Body = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};

  @media screen and (max-width: 1120px) {
    font-size: 1.3vw;
  }
`;

const Button = styled.button<{ colorSet: ColorSet }>`
  background-color: ${(props) => props.colorSet.primary};
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

function highlightHandler(header: string, keyword: string, colorSet: ColorSet) {
  const HeaderHighlight = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color: ${colorSet.primary};

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

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  function buttonHandler() {
    window.location.href = data.button?.url ?? '';
  }

  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        <TextContainer>
          {data.caption?.value && (
            <Caption colorSet={colorSet}>{data.caption.value}</Caption>
          )}
          <div>
            {data.header?.value &&
              (data.headerHighlight ? (
                highlightHandler(
                  data.header.value,
                  data.headerHighlight.value,
                  colorSet
                )
              ) : (
                <Header>{data.header.value}</Header>
              ))}
          </div>
          {data.body?.value && (
            <Body colorSet={colorSet}>{data.body.value}</Body>
          )}
          {data.button?.title && (
            <Button
              colorSet={colorSet}
              color={colorSet.primary}
              onClick={buttonHandler}
            >
              {data.button.title}
            </Button>
          )}
        </TextContainer>
        {data.image?.src ? (
          <Img src={data.image.src} alt={data.image.alt ?? ''} />
        ) : (
          <ImgDiv style={{marginLeft: '20px'}}>여기에 이미지가 보여집니다.</ImgDiv>
        )}
      </Container>
    </>
  );
}
