import styled from 'styled-components';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';

const RemtoVw = (px: number, rem: number) => {
  return (rem * 100 * px) / 550 + 'vw';
};

const REM = 16;
const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};

  max-width: 550px;
  padding: 50px 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImgDiv = styled.div`
  width: 100%;
  background-color: #efefef;
  text-align: center;
  line-height: 200px;
  @media screen and (max-width: 550px) {
    width: 400px;
    padding-right: 0;
  }
`;

const Img = styled.img`
  max-width: 500px;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const TextContainer = styled.div`
  vertical-align: middle;
  padding: 3rem;
  @media screen and (max-width: 550px) {
    padding: ${RemtoVw(REM, 3)};
  }
`;

const MainDate = styled.div<{ colorSet: ColorSet }>`
  font-size: 5rem;
  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 5)};
  }
`;

const Date = styled.div<{ colorSet: ColorSet }>`
  font-size: 2rem;
  font-weight: 600;
  /* color: ${(props) => props.colorSet.primary}; */
  margin-bottom: 0.5rem;
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 2)};
    margin-bottom: ${RemtoVw(REM, 0.5)};
  }
`;

const Venue = styled.div<{ colorSet: ColorSet }>`
  font-size: 1.5rem;
  font-weight: 600;
  /* color: ${(props) => props.colorSet.primary}; */
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.5)};
  }
`;

const Name = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: black;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 2)};
  }
`;

const ExtraText = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};
  font-size: 1rem;
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1)};
  }
`;

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  console.log(3333, data);

  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        <MainDate colorSet={colorSet}>
          {data.date.value.slice(5, 10).replace('-', '/')}
        </MainDate>
        <TextContainer>
          {data.header?.value && <Name>{data.header.value}</Name>}
          {data.body?.value && (
            <ExtraText colorSet={colorSet}>{data.body.value}</ExtraText>
          )}
        </TextContainer>
        {data.image?.src ? (
          <Img src={data.image.src} alt={data.image.alt ?? ''} />
        ) : (
          <ImgDiv style={{ marginRight: '20px' }}>
            여기에 이미지가 보여집니다.
          </ImgDiv>
        )}
        <TextContainer>
          {data.date?.value && (
            <Date colorSet={colorSet}>{data.date.value}</Date>
          )}
          {data.venue?.value && (
            <Venue colorSet={colorSet}>{data.venue.value}</Venue>
          )}
        </TextContainer>
      </Container>
    </>
  );
}
