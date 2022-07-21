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
    id: 1,
    name: '',
    domain: '',
    theme: 'Simple',
    font: 'Roboto',
    colorSet: {
      primary: '#5754DE',
      secondary: '#ABA9FF',
      background: '#FFFFFF',
      surface: '#B0B0B0',
    },
    blocks: [
      {
        id: 1,
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
          headerHighlight: {
            value: '웹사이트',
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
