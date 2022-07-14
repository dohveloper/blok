const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

// Setup logger
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.set("view engine", "tsx");
app.use(express.static(path.resolve(__dirname, "..", "build")));

// Always return the main index.html, so react-router render the route in the client
//   모든 request에 대해서 build폴더 아래 index.html을 보내도록 되어 있는데,
//       이부분을 수정하여 server side 프로그래밍을 한다.

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

app.get("/123", function (req, res) {
  res.send("<h1>welcome page</h1>");
});

app.get("/template", function (req, res) {
  res.send({
    template: [
      { title: "랜딩페이지", description: "회사 웹사이트 템플릿 입니다." },
      {
        title: "이력서",
        description: "이력서 템플릿 입니다.",
        color1: "#2B9D67",
        color2: "#CEF0E2",
      },
      {
        title: "기업소개 웹사이트",
        description: "기업소개 템플릿 입니다.",
        color1: "#F5E44C",
        color2: "#CEA9D3",
      },
    ],
  });
});
const siteDate = {
  data: [
    {
      id: 1,
      template: "랜딩페이지",
      siteName: "naver",
      domain: "http://www.naver.com",
      startDate: "20220202",
      name: "윤영주",
      userId: 2,
    },
    {
      id: 2,
      template: "기업소개",
      siteName: "naver",
      domain: "http://www.naver.com/asdasd",
      startDate: "20220202",
      name: "앨리스",
      userId: 1,
    },
    {
      id: 3,
      template: "랜딩페이지",
      siteName: "google",
      domain: "http://www.goole.com",
      startDate: "20220202",
      name: "앨리스",
      userId: 1,
    },
    {
      id: 4,
      template: "이력서",
      siteName: "goole",
      domain: "http://www.goolgge.com",
      startDate: "20220202",
      name: "윤영주",
      userId: 2,
    },
    {
      id: 5,
      template: "랜딩페이지",
      siteName: "goole",
      domain: "http://www.goole.com",
      startDate: "20220202",
      name: "윤영자",
      userId: 4,
    },
    {
      id: 6,
      template: "랜딩페이지",
      siteName: "asd",
      domain: "ㅁㄴㅇㄹ://www.goole.com",
      startDate: "20220202",
      name: "윤영자",
      userId: 4,
    },
    {
      id: 7,
      template: "이력서",
      siteName: "goole",
      domain: "http://www.goole.com",
      startDate: "20220202",
      name: "윤영자",
      userId: 4,
    },
    {
      id: 8,
      template: "이력서",
      siteName: "goole",
      domain: "http://www.goole.com",
      startDate: "20220202",
      name: "윤영자",
      userId: 4,
    },
    {
      id: 9,
      template: "이력서",
      siteName: "goole",
      domain: "http://www.goole.com",
      startDate: "20220202",
      name: "윤영자",
      userId: 4,
    },
    {
      id: 10,
      template: "이력서",
      siteName: "goole",
      domain: "http://www.goole.com",
      startDate: "20220202",
      name: "윤영자",
      userId: 4,
    },
    {
      id: 11,
      template: "이력서",
      siteName: "goole",
      domain: "http://www.goole.com",
      startDate: "20220202",
      name: "윤영자",
      userId: 4,
    },
    {
      id: 12,
      template: "이력서",
      siteName: "goole",
      domain: "http://www.goole.com",
      startDate: "20220202",
      name: "윤영자",
      userId: 4,
    },
    {
      id: 13,
      template: "이력서",
      siteName: "goole",
      domain: "http://www.goole.com",
      startDate: "20220202",
      name: "윤영자",
      userId: 4,
    },
  ],
};

const userData = {
  data: [
    {
      id: 1,
      template: "랜딩페이지",
      domain: [{ domainName: "naver", link: "http://www.naver.com" }],
      plan: "free",
      startDate: "20220202",
      name: "앨리스",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
    {
      id: 2,
      template: "랜딩페이지",
      domain: [
        { domainName: "naver", link: "http://www.naver.com" },
        { domainName: "google", link: "http://www.google.com" },
      ],
      plan: "free",
      startDate: "20220202",
      name: "윤영주",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
    {
      id: 3,
      template: "기업소개",
      domain: [
        { domainName: "naver", link: "http://www.naver.com" },
        { domainName: "google", link: "http://www.google.com" },
      ],
      plan: "free",
      startDate: "20220202",
      name: "앨리샤",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
    {
      id: 4,
      template: "기업소개",
      domain: [
        { domainName: "naver", link: "http://www.naver.com" },
        { domainName: "google", link: "http://www.google.com" },
      ],
      plan: "free",
      startDate: "20220202",
      name: "윤영자",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
    {
      id: 5,
      template: "기업소개",
      domain: [
        { domainName: "naver", link: "http://www.naver.com" },
        { domainName: "google", link: "http://www.google.com" },
      ],
      plan: "free",
      startDate: "20220202",
      name: "윤영수",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
    {
      id: 6,
      template: "이력서",
      domain: [
        { domainName: "naver", link: "http://www.naver.com" },
        { domainName: "google", link: "http://www.google.com" },
      ],
      plan: "free",
      startDate: "20220202",
      name: "이아영",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
    {
      id: 7,
      template: "기업소개",
      domain: [
        { domainName: "naver", link: "http://www.naver.com" },
        { domainName: "google", link: "http://www.google.com" },
      ],
      plan: "free",
      startDate: "20220202",
      name: "이아진",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
    {
      id: 8,
      template: "메롱",
      domain: [
        { domainName: "naver", link: "http://www.naver.com" },
        { domainName: "google", link: "http://www.google.com" },
      ],
      plan: "free",
      startDate: "20220202",
      name: "윤수민",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
    {
      id: 9,
      template: "이력서",
      domain: [
        { domainName: "naver", link: "http://www.naver.com" },
        { domainName: "google", link: "http://www.google.com" },
      ],
      plan: "free",
      startDate: "20220202",
      name: "김민수",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
    {
      id: 10,
      template: "메롱",
      domain: [
        { domainName: "naver", link: "http://www.naver.com" },
        { domainName: "google", link: "http://www.google.com" },
      ],
      plan: "free",
      startDate: "20220202",
      name: "윤주은",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
    {
      id: 11,
      template: "이력서",
      domain: [{ domainName: "naver", link: "http://www.naver.com" }],
      plan: "free",
      startDate: "20220202",
      name: "이수은",
      email: "elice@elice.com",
      password: "asdf",
      profileImage: "image",
      role: "basic-user",
    },
  ],
};

app.get("/user/:userId", function (req, res) {
  const { userId } = req.params;
  const data = userData.data.filter((user) => user.id === Number(userId));
  res.send(data);
});

app.patch("/user/:userId", function (req, res) {
  res.send("userData Update!!!");
});

// 유저필터
app.get("/sites", function (req, res) {
  const { q } = req.query;

  const keys = ["name", "template", "domain", "siteName", "startDate"];
  const search = (data) => {
    return data.filter((item) => keys.some((key) => item[key].includes(q)));
  };

  res.send(search(siteDate.data));
  // res.send(search(userData.data).splice(0, 7));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});
