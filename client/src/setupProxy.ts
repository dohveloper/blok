import { createProxyMiddleware } from 'http-proxy-middleware';
module.exports = function (app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5001', //api 요청을 보낼 서버 주소
      changeOrigin: true,
    })
  );
};
