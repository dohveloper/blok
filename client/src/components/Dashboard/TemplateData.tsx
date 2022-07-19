export const templateCardData = [
  { title: '랜딩페이지', description: '회사 웹사이트 템플릿 입니다.' },
  {
    title: '이력서',
    description: '이력서 템플릿 입니다.',
    color1: '#2B9D67',
    color2: '#CEF0E2',
  },
  {
    title: '기업소개 웹사이트',
    description: '기업소개 템플릿 입니다.',
    color1: '#F5E44C',
    color2: '#CEA9D3',
  },
  {
    title: '기본 웹사이트',
    description: '기업소개 템플릿 입니다.',
    color1: '#585858',
    color2: '#8c929c',
  },
];

export default function templateListData() {
  const landingPage = {
    name: '',
    domain: '',
    theme: 'Minimal',
    font: 'Roboto',
    colorSet: {
      primary: '#5754DE',
      secondary: '#ABA9FF',
      background: '#FFFFFF',
      surface: '#B0B0B0',
    },
    blocks: [
      {
        template: {
          theme: 'Simple',
          blockType: 'Nav',
          layout: '',
        },
        defaultData: {
          navTitle: null,
          logoImage: {
            src: 'www.image.com/source/12312',
            alt: 'logo',
          },
          logoText: {
            value: '블록',
          },
        },
      },
      {
        template: {
          theme: 'Simple',
          blockType: 'Hero',
          layout: '',
        },
        defaultData: {
          navTitle: '홈',
          caption: {
            value: '노코드 웹사이트 빌더 플랫폼',
          },
          header: {
            value: '여기에 블록에 입력한 제목이 들어갑니다. 여러줄도 오케이',
          },
          body: {
            value:
              '여기에는 설명이 들어갑니다. 여기에는 설명이 들어갑니다. 여러줄도 괜찮습니다.',
          },
          button: {
            title: '여기에는 버튼명',
            url: 'www.google.com',
          },
        },
      },
      {
        template: {
          theme: 'Simple',
          blockType: 'Feature',
          layout: '',
        },
        defaultData: {
          navTitle: '기능 1',
          image: {
            src: '',
            alt: 'image',
          },
          caption: {
            value: '여기는 캡션',
          },
          header: {
            value: '여기에 Feature 블록에서 입력한 값이 들어갑니다.',
          },
          body: {
            value:
              '여기에는 설명이 들어갑니다. 여기에는 설명이 들어갑니다. 여러줄도 괜찮습니다.',
          },
          button: {
            title: '버튼',
            url: 'naver.com',
          },
        },
      },
      {
        template: {
          theme: 'Simple',
          blockType: 'Footer',
          layout: '',
        },
        defaultData: {
          navTitle: null,
          leftText: {
            value: '노코드 웹사이트 빌더 플랫폼',
          },
          rightText: {
            value: '여기에 블록에 입력한 제목이 들어갑니다. 여러줄도 오케이',
          },
        },
      },
    ],
  };

  const portfolio = {
    name: '',
    domain: '',
    theme: 'Minimal',
    font: 'Roboto',
    colorSet: {
      primary: '#482924',
      secondary: '#123456',
      background: '#123456',
      surface: '#123456',
    },
    blocks: [],
  };

  const companyProfile = {
    name: '',
    domain: '',
    theme: 'Minimal',
    font: 'Roboto',
    colorSet: {
      primary: '#482924',
      secondary: '#123456',
      background: '#123456',
      surface: '#123456',
    },
    blocks: [],
  };

  const basicWeb = {
    name: '',
    domain: '',
    theme: 'Minimal',
    font: 'Roboto',
    colorSet: {
      primary: '#482924',
      secondary: '#123456',
      background: '#123456',
      surface: '#123456',
    },
    blocks: [],
  };
  return { landingPage, portfolio, companyProfile, basicWeb };
}
