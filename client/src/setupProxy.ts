import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';
module.exports = function (app: {
  use: (arg0: string, arg1: RequestHandler) => void;
}) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000', //api 요청을 보낼 서버 주소
      changeOrigin: true,
    })
  );
};
