import styled from 'styled-components';
import { SiteBlockProps, ColorSet } from '../../../blockValidator';
import { SiteBlockByType } from '../../../../../reducers/HostReducer';

const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};

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
  text-align: center;

  @media screen and (max-width: 1120px) {
    width: 400px;
  }
`;

const Caption = styled.div<{ colorSet: ColorSet }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.primary};
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

const Body = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};
  margin-top: 15px;

  @media screen and (max-width: 1120px) {
    font-size: 1.4vw;
  }
`;

function highlightHandler(header: string, keyword: string, colorSet: ColorSet) {
  const HeaderHighlight = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color: ${colorSet.primary};
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

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  return (
    <>
      <Container
        colorSet={colorSet}
        font={font}
        id={data.navTitle !== null ? data.navTitle : ''}
      >
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
        </TextContainer>
      </Container>
    </>
  );
}
