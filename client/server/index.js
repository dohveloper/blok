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
  res.send({ name: "elice", email: "elice@elice.com", plan: "Free" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});
