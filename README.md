# blok 프로젝트



<img width="900" alt="before1" src="https://user-images.githubusercontent.com/32115010/180215147-861fac48-d15a-4210-bf6a-df6757c0eecc.png">


<br>

## ✋ blok 서비스 소개:
### 뭐하는 서비스인가요?
  - blok은 여러 블록을 조합하여 웹사이트를 만들 수 있는 노코드 웹사이트 빌더입니다.


### 누구를 위한 서비스인가요?
  - 코딩없이 랜딩페이지를 만들고 싶으신 분
  - 이력서 웹사이트를 만들고 싶은 엘리스 수강생
  
### 어떤 기능이 있나요?
```
- 대시보드
    - 사이트 조회, 사이트 생성,사이트 삭제
- 에디터
    - 블록 기능
        - 블록 보기 → 에디터 페이지에서 프리뷰 실시간 조회 가능
        - 블록 생성 → 각 테마별로 지원하는 블록 추가가능, 유효성 검사(중복여부)
        - 블록 수정 → 다양한 타입의 필드 지원
            - 텍스트 → 텍스트 변경, 강조 표시
            - 이미지 → 이미지 업로드 및 변경 기능
            - 버튼 → 버튼 텍스트 변경, URL 변경
            - 태그 → 태그 추가 가능
            - 드롭다운 → 여러 스타일의 블록으로 변경 가능
        - 블록 삭제
        - 블록 이동 → 블록 이동기능, 이동불가블록 예외처리, 이동 불가 장소 예외처리
    - 테마 변경
        - 전체 (색상조합 변경, 폰트 변경, 테마 변경)
        - 개별 (블록 스타일)
    - 도메인 수정
- 로그인 
    - 로그인,소셜로그인, 회원가입,비밀번호찾기
- 프로필
    - 프로필 조회
- 어드민
    - 유저 목록 조회,검색,삭제,정보수정
    - 사이트 목록 조회,삭제 
```

<br>
<br>

## 💻 구현

### 기획 및 시장조사
- 평범한 CRUD 웹사이트보다 조금 더 도전적인 프로젝트를 해보자라고 의견이 모아져서 노코드 플랫폼을 개발하기로 결정.
- Littly, Launchaco 등 국내외 여러 노코드 플랫폼을 비교,분석하여 기획 및 디자인 초안 제작.
- 프로젝트를 진행하면서 추가적으로 발생하는 다양한 기획적인 이슈를 조금씩 해결해가며 완성도를 높여나감.

| 국내외 다양한 노코드툴을 써보며 서비스 기획초안 제작  | Figma를 활용하여 UI 및 디자인시스템 제작 | 
|:-------------:|:-------------:|  
|<img width="300" alt="before1" src="https://user-images.githubusercontent.com/32115010/180220513-a04ce8dd-a5f5-4c93-9624-e1cf73bfc2ba.png">     | <img width="600"  alt="before2" src="https://user-images.githubusercontent.com/32115010/180222539-183243bd-27d4-44c2-8a52-b185a5e37ea6.png"> |
  
<br>
<br>

### 테크스택

- 프론트엔드 
  - 코어: React, TypeScript
  - 상태관리: Redux, Redux Toolkit
  - 스타일링: styled-components
  
- 백엔드 
  - 서버: Node.js, Express.js
  - DataBase: MongoDB
  - Infra : aws s3
- 이 테크스택을 사용한 이유
  - 웹빌더 특성상 한번 접속한 이후 해당 페이지를 수정하는 작업이 많기 때문에 CSR로 개발하는게 맞다고 판단하여 Next.js 대신 React 사용. 
  - 상태관리는 팀원들이 모두 배워본 경험이 있는 Redux를 사용. 
  - 백엔드 팀원들이 공통적으로 사용해 본 적 있는 Express와 MongoDB를 사용, 추후 TypeScript로 마이그레이션 예정

<br>
<br>
  
## 🤷 기술적 어려움: 서비스 구조 설계 
### 문제: 각각 다른 설정값과 디자인을 가진 블록를 구현해야함
  ```
    - 타입별로 `설정값` 과 `디자인` 이 다름
    - 같은 타입이라도 `레이아웃` 에 따라 디자인이 다름
    - 같은 타입이라도 `테마` 에 따라 디자인이 다름
   ```
| 각 블록마다 설정값, 프리뷰, 실제사이트 등 많은 종류의 블록 존재  | 
|:-------------:| 
|<img width="600" alt="team" src="https://user-images.githubusercontent.com/32115010/180244031-d24eff6b-4a63-41a5-8f95-1b5af44eab62.png">|

| 블록타입, 테마, 레이아웃 등 많은 경우의 수를 고려하여 개발 필요 | 
|:-------------:| 
|<img width="600" alt="team" src="https://user-images.githubusercontent.com/32115010/180244077-5968d69f-0431-41ea-943e-357e83a0e01b.png">|

<br>

 ### 해결책: 동적렌더링과 유연한 데이터 구조를 통해 다양한 블록을 지원
    
| 많은 블록을 효과적으로 관리하고 동적렌더링 하기 위한 폴더구조  | 
|:-------------:| 
|<img width="300" alt="team" src="https://user-images.githubusercontent.com/32115010/180236380-0ae01215-974a-4027-beea-9e7b395d0b4f.png">|

| 테마,폰트,컬러 타입 등 다양한 블록과 스타일을 지원하기 위한 데이터 구조 | 
|:-------------:| 
|<img width="300" alt="team" src="https://user-images.githubusercontent.com/32115010/180238644-286bdb6f-3dda-48d9-afad-d02e864140b1.png">|

| 다양한 블록을 백엔드에서 처리하기 위해 스키마에서 Object로 설정 | 
|:-------------:| 
|<img width="300" alt="team" src="https://raw.githubusercontent.com/croookid/imageupload/main/siite.JPG">|

| 동적렌더링 코드 예시 | 
|:-------------:| 
|<img width="500" alt="team" src="https://user-images.githubusercontent.com/32115010/180241865-db9f060c-d565-4212-ae49-125bf0bba8df.png">|


<br>

## 📝 테마 개발자 가이드

### 기본 구조 설명
    - Setting Block: 좌측 설정 블록
    - Site Block: Preview, 실제 페이지에 보이는 블록
    - BlockTemplates: 웹사이트가 제공하는 모든 블록 설정값을 기록해두는 파일
        - template → [에디터] 및 [실제사이트]에서 어느 SettingBlock, SiteBlock을 렌더링할지 값.
        - creationData → [에디터] - [블록추가] 팝업에서 보여지는 값 (이름, 아이콘, 중복불가능여부)
        - defaultData → [에디터] - [블록추가] 시 블록에 디폴트로 설정되는 값
### 테마 추가하는 방법 

1. **폴더 추가 (테마, 블록타입, 레이아웃)**
  - components/Blocks 안에 구조에 맞게 폴더를 추가한다. 
  - components/Blocks/ ${테마}/${블록타입}/${레이아웃(optional)}
2. **파일 생성 (SettingBlock, SiteBlock)**
    1. SettingBlock.tsx 파일을 생성하고 Simple 테마의 코드를 참고하여 작성한다.
        - components/Input 컴포넌트를 활용하여 필요한 인풋 필드를 설정한다.
        - 기본적으로 필요한 함수들은 blockHelper 또는 SiteReducer 안에 있으니 필요시 활용한다.
    2. SiteBlock.tsx 코드 작성 
        - 원하는대로 커스터마이징하여 화면에 표시될 블록을 디자인한다.
3. **테마 등록 하기**
    - 만든 블록을 components/Block/blockTemplates.json 파일에 등록한다.
        - → 테마이름, 기본값 데이터, 블록생성팝업에서 보여줄 이름,아이콘,중복가능여부
    - 아이콘 등록
        - 이미지를 추가후 index.ts 에 추가한다.
### API
    - Site API
    - Login API

## 📦 결과물 
- 다양한 블록 구현: 다양한 타입의 블록, 인풋, 폰트, 컬러셋을 지원하여 유저가 다양한 조합의 웹사이트를 만들 수 있도록 구현  (블록 12개, 인풋필드 7개)
- 확장성 있는 코드 구현: 확장성을 고려하여 설계함으로써 추후에 다양한 테마를 지원할 수 있도록 설계
- 노코드 웹사이트 빌더 MVP: 3주 내에 기획,디자인부터 개발까지 실제 작동하는 노코드 웹사이트 빌더 MVP를 완성
