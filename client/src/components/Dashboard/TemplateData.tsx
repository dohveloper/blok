import AppearanceData from '../Editor/AppearanceData';

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
    color1: '#F5E44C',
    color2: '#CEA9D3',
  },
];

export default function templateListData() {
  const landingPage = {
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
    blocks: [
      {
        template: {
          theme: 'Simple',
          blockType: 'Nav',
          layout: null,
        },
        data: {
          navTitle: null,
          style: {
            value: '',
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
        template: {
          theme: 'Simple',
          blockType: 'Hero',
          layout: null,
        },
        data: {
          navTitle: '홈',
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
        template: {
          theme: 'Simple',
          blockType: 'Feature',
          layout: 'Right',
        },
        data: {
          navTitle: '기능 소개',
          image: {
            src: 'www.image.com/source/12312',
            alt: 'image',
          },
          caption: {
            value: '빠른 시작 ',
          },
          header: {
            value: '다양한 템플릿으로 웹사이트를 만들어보세요.',
          },
          body: {
            value:
              '블록은 랜딩페이지부터 이력서까지 다양한 템플릿을 제공합니다.',
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
