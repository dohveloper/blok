import styled from 'styled-components';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';

const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};
  padding: 0px 32px;
  margin: 0 auto;
  height: 80vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  @media screen and (max-width: 1200px) {
    flex-wrap: wrap;
  }
`;

export const ImgDiv = styled.div`
  width: 300px;
  height: 200px;
  background-color: #efefef;
  text-align: center;
  line-height: 200px;
  padding: 32px;
  @media screen and (max-width: 1200px) {
    width: 30vw;
    order: 2;
  }
`;

const Img = styled.img`
  max-width: 24vw;
  padding-top: 30px;

  @media screen and (max-width: 1200px) {
    max-width: 30vw;
    width: 30vw;
    padding: 24px;
    order: 2;
  }
`;

const TextContainer = styled.div`
  vertical-align: middle;
  padding: 48px;
  @media screen and (max-width: 1200px) {
    order: 1;
  }
`;

const Caption = styled.div<{ colorSet: ColorSet }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.primary};
  margin-bottom: 24px;

  @media screen and (max-width: 1120px) {
    font-size: 1.4vw;
    margin-bottom: 16px;
  }
`;

const Header = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: black;
  margin-bottom: 32px;

  @media screen and (max-width: 1120px) {
    font-size: 3vw;
  }
`;

const Body = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};
  margin-top: 16px;
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
    margin-top: 1.2vw;
  }
`;
const HeaderHighlight = styled.span<{ colorSet: ColorSet }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.colorSet.primary};

  @media screen and (max-width: 1120px) {
    font-size: 2.8vw;
  }
`;

function highlightHandler(header: string, keyword: string, colorSet: ColorSet) {
  let result = [];

  if (header.includes(keyword)) {
    const splitedByKeyword = header.split(keyword);
    for (let i = 0; i < splitedByKeyword.length - 1; i++) {
      result.push(
        <>
          <Header>{splitedByKeyword[i]}</Header>
          <HeaderHighlight colorSet={colorSet}>{keyword}</HeaderHighlight>
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
    window.location.href = data.button?.url ? data.button.url : '';
  }
  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        {data.image?.src ? (
          <Img src={data.image.src} alt={data.image.alt ?? ''} />
        ) : (
          <ImgDiv style={{ marginRight: '20px' }}>
            여기에 이미지가 보여집니다.
          </ImgDiv>
        )}
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
      </Container>
    </>
  );
}
