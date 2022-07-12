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

app.get("/user", function (req, res) {
  res.send({
    name: "elice",
    email: "elice@elice.com",
    plan: "Free",
    domain: [
      { doname: "naver", link: "http://www.naver.com" },
      { doname: "google", link: "http://www.google.com" },
    ],
  });
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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});
