import styled from 'styled-components';
import { PxVw } from '../utils/cssconvert';

type colorSetProps = {
  colorSet: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
  };
};

const initialStateSample = {
  id: 2,
  name: 'First Site',
  domain: 'firstSite',
  theme: 'Simple',
  font: 'Roboto',
  colorSet: {
    primary: '#482924',
    secondary: '#123456',
    background: '#123456',
    surface: '#123456',
  },
  blocks: [
    {
      id: 1,
      template: {
        theme: 'Simple',
        blockType: 'Nav',
        layout: null,
      },
      data: {
        navTitle: '',
        style: {
          value: '스타일1',
        },
        logoImage: {
          src: 'www.image.com/source/12312',
          alt: 'logo',
        },
        logoText: {
          value: '블록',
        },
        button: {
          title: '지원하기',
          url: 'form.google.com/joinTeam',
        },
      },
    },
    {
      id: 2,
      template: {
        theme: 'Simple',
        blockType: 'Hero',
        layout: null,
      },
      data: {
        navTitle: '홈',
        style: {
          value: '',
        },
        image: {
          src: 'www.image.com/source/12312',
          alt: 'logo',
        },
        caption: {
          value: '노코드 웹사이트 빌더',
        },
        header: {
          value: '블록으로 웹사이트를 만들어보세요',
        },
        body: {
          value:
            '블록은 노코드 웹사이트 빌더입니다. 빠르고 쉽게 웹사이트를 만들어보세요.',
        },
        button: {
          title: '웹사이트 만들기',
          url: 'block.com/login',
        },
      },
    },
    {
      id: 3,
      template: {
        theme: 'Simple',
        blockType: 'Feature',
        layout: null,
      },
      data: {
        navTitle: '기능1',
        style: {
          value: '',
        },
        image: {
          src: 'www.image.com/source/12312',
          alt: 'logo',
        },
        caption: {
          value: '노코드 웹사이트 빌더',
        },
        header: {
          value: '블록으로 웹사이트를 만들어보세요',
        },
        body: {
          value:
            '블록은 노코드 웹사이트 빌더입니다. 빠르고 쉽게 웹사이트를 만들어보세요.',
        },
        button: {
          title: '웹사이트 만들기',
          url: 'block.com/login',
        },
      },
    },
    {
      id: 4,
      template: {
        theme: 'Simple',
        blockType: 'Footer',
        layout: 'Right',
      },
      data: {
        navTitle: '',
        style: { value: '' },
        rightText: {
          value: '다양한 템플릿으로 웹사이트를 만들어보세요.',
        },
        leftText: {
          value: '블록은 랜딩페이지부터 이력서까지 다양한 템플릿을 제공합니다.',
        },
      },
    },
  ],
};

const NavBarContainer = styled.div`
  font-family: 'Roboto';
  background-color: #ffffff;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 18px 28px;
  @media screen and (max-width: 1120px) {
    height: ${PxVw(60)}vw;
    padding: ${PxVw(18)}vw ${PxVw(28)}vw;
  }
`;

const LogoBox = styled.div`
  display: flex;
`;
const LogoImg = styled.img`
  width: 33px;
  height: 33px;
  @media screen and (max-width: 1120px) {
    width: ${PxVw(33)}vw;
    height: ${PxVw(33)}vw;
  }
`;
const LogoTitle = styled.div`
  font-weight: 900;
  font-size: 32px;
  margin-left: 12px;
  color: #000000;
  @media screen and (max-width: 1120px) {
    font-size: ${PxVw(32)}vw;
    margin-left: ${PxVw(12)}vw;
  }
`;

const Container = styled.div`
  font-family: 'Roboto';
  background-color: #f7f7f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 10%;
`;

const HeroMenuName = styled.div<{ colorSet?: colorSetProps }>`
  color: #2420e1;
  font-weight: 900;
  font-size: 22px;
  line-height: 27px;
  @media screen and (max-width: 1120px) {
    font-size: ${PxVw(22)}vw;
    line-height: ${PxVw(27)}vw;
  }
`;

const HeadLine = styled.div<{ colorSet?: colorSetProps }>`
  $vwpx: 100/1120;
  color: #000000;
  font-weight: 900;
  font-size: 64px;
  line-height: 87px;
  @media screen and (max-width: 1120px) {
    font-size: ${PxVw(64)}vw;
    line-height: ${PxVw(87)}vw;
  }
`;
const HeadLineText = styled.div<{ colorSet?: colorSetProps }>`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #b0b0b0;
  padding: 0 10%;
  @media screen and (max-width: 1120px) {
    font-size: ${PxVw(20)}vw;
    line-height: ${PxVw(24)}vw;
  }
`;
const Button = styled.a<{ colorSet?: colorSetProps }>`
  background: ${(props) => props.colorSet?.colorSet.background || '#2420e1'};
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: #ffffff;
  transition: color 0.5s;
  cursor: pointer;
  :hover {
    color: wheat;
  }
  @media screen and (max-width: 1120px) {
    font-size: ${PxVw(16)}vw;
    border-radius: ${PxVw(8)}vw;
    padding: ${PxVw(16)}vw ${PxVw(24)}vw;
  }
`;
type datatype = {
  navTitle: string;
  style: {
    value: string;
  };
  image: {
    src: string;
    alt: string;
  };
  caption: {
    value: string;
  };
  header: {
    value: string;
  };
  body: {
    value: string;
  };
  button: {
    title: string;
    url: string;
  };
};
HeroSite.defaultProps = {
  font: 'Roboto',
  colorSet: {
    primary: '#482924',
    secondary: '#123456',
    background: '#123456',
    surface: '#123456',
  },
  navTitle: '홈',
  style: {
    value: '',
  },
  image: {
    src: 'www.image.com/source/12312',
    alt: 'logo',
  },
  caption: {
    value: '노코드 웹사이트 빌더',
  },
  header: {
    value: '블록으로 웹사이트를 만들어보세요',
  },
  body: {
    value:
      '블록은 노코드 웹사이트 빌더입니다. 빠르고 쉽게 웹사이트를 만들어보세요.',
  },
  button: {
    title: '웹사이트 만들기',
    url: 'block.com/login',
  },
};

export function NavBar() {
  return (
    <NavBarContainer>
      <LogoBox>
        <LogoImg src='../icons/Logo.png' alt='로고' />
        <LogoTitle>Bloc</LogoTitle>
      </LogoBox>
    </NavBarContainer>
  );
}

export function HeroSite(data: datatype) {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <HeroMenuName>{data.caption.value}</HeroMenuName>
        <HeadLine>{data.header.value}</HeadLine>
        <HeadLineText>{data.body.value}</HeadLineText>
        <Button href={data.button.url}>{data.button.title}</Button>
      </Container>
    </>
  );
}
