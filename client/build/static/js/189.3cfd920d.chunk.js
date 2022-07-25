"use strict";(self.webpackChunkinitproject=self.webpackChunkinitproject||[]).push([[189],{7189:function(n,e,i){i.r(e);var t=i(885),o=i(2791),r=i(6681),l=i(4476),a=i(7108),d=i(5174),u=i(2492),s=i(1876),p=i(184);e.default=function(n){var e,i,v,c,g,f=n.blockId,x=n.onRemove,h=(0,u.CG)((function(n){return(0,s.tj)(n,f)})),b=h.id,Z=h.template,j=h.data,k=h.isCardOpened,m=(0,d.Eo)(Z),C=(0,d.yZ)(Z),w=(0,u.TL)(),I=(0,o.useState)(j.navTitle),P=(0,t.Z)(I,2),O=P[0],q=P[1],y=(0,o.useState)(null===(e=j.caption)||void 0===e?void 0:e.value),S=(0,t.Z)(y,2),K=S[0],R=S[1],T=(0,o.useState)(null===(i=j.header)||void 0===i?void 0:i.value),z=(0,t.Z)(T,2),F=z[0],L=z[1],Q=(0,o.useState)(null===(v=j.body)||void 0===v?void 0:v.value),A=(0,t.Z)(Q,2),B=A[0],E=A[1],G=(0,o.useState)(null===(c=j.button)||void 0===c?void 0:c.title),H=(0,t.Z)(G,2),M=H[0],U=H[1],V=(0,o.useState)(null===(g=j.button)||void 0===g?void 0:g.url),D=(0,t.Z)(V,2),J=D[0],N=D[1],W=(0,o.useState)(C),X=(0,t.Z)(W,2),Y=X[0],$=X[1];return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(l.Z,{title:"Hero",onRemove:x,icon:a.VM,isCardOpened:k,pinned:!0,blockId:f,children:[(0,p.jsx)(r.oi,{title:"\uba54\ub274\uba85",required:!1,value:O,onChange:function(n){q(n.target.value),w((0,s.sK)({blockId:b,field:"navTitle",value:n.target.value}))},guideline:"\ub124\ube44\uac8c\uc774\uc158 \ubc14\uc5d0 \uc785\ub825\ub420 \uba54\ub274\uba85\uc744 \uc785\ub825\ud558\uc138\uc694."}),(0,p.jsx)(r.AP,{title:"\uc2a4\ud0c0\uc77c",required:!0,guideline:"\uc2a4\ud0c0\uc77c\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694.",placeholder:"\uc6d0\ud558\ub294 \uc120\ud0dd\uc9c0\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694",options:m,onChange:function(n){$(n),w((0,s.QB)({blockId:b,newTemplate:n.value}))},value:Y}),(0,p.jsx)(r.oi,{title:"\ucea1\uc158",required:!1,onChange:function(n){R(n.target.value),w((0,s.sK)({blockId:b,field:"caption",value:{value:n.target.value}}))},guideline:"\ucea1\uc158\uc5d0 \ud45c\uc2dc\ub420 \ub0b4\uc6a9\uc744 \uc785\ub825\ud558\uc138\uc694.",value:K}),(0,p.jsx)(r.oi,{title:"\ud5e4\ub4dc\ub77c\uc778",required:!1,onChange:function(n){L(n.target.value),w((0,s.sK)({blockId:b,field:"header",value:{value:n.target.value}}))},guideline:"\ucea1\uc158\uc5d0 \ud45c\uc2dc\ub420 \ub0b4\uc6a9\uc744 \uc785\ub825\ud558\uc138\uc694.",value:F}),(0,p.jsx)(r.oi,{title:"\uc124\uba85",required:!1,onChange:function(n){E(n.target.value),w((0,s.sK)({blockId:b,field:"body",value:{value:n.target.value}}))},guideline:"\uc124\uba85\uc5d0 \ud45c\uc2dc\ub420 \ub0b4\uc6a9\uc744 \uc785\ub825\ud558\uc138\uc694",value:B}),(0,p.jsx)(r.oi,{title:"\ubc84\ud2bc \ud14d\uc2a4\ud2b8",required:!1,onChange:function(n){U(n.target.value),w((0,s.sK)({blockId:b,field:"button",value:{title:n.target.value}}))},guideline:"\ube44\uc6cc\ub458 \uacbd\uc6b0 \ubc84\ud2bc\uc774 \ub098\ud0c0\ub098\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.",value:M}),(0,p.jsx)(r.oi,{title:"\ubc84\ud2bc URL",required:!1,onChange:function(n){N(n.target.value),w((0,s.sK)({blockId:b,field:"button",value:{url:n.target.value}}))},guideline:"\ubc84\ud2bc \ud074\ub9ad\uc2dc \uc774\ub3d9\ub420 url\uc744 \uc785\ub825\ud558\uc138\uc694",value:J})]})})}},4476:function(n,e,i){i.d(e,{Z:function(){return q}});var t,o,r,l,a,d,u,s,p,v,c=i(168),g=i(1242),f=i(7108),x=(i(2791),i(9434)),h=i(1876),b=i(184),Z=g.ZP.div(t||(t=(0,c.Z)(["\n  background: #ffffff;\n  border: 1px solid #efefef;\n  border-radius: ",";\n  position: relative;\n  width: 100%;\n  height: 60px;\n  display: flex;\n  padding: 0px 24px;\n  box-sizing: border-box;\n  & * {\n    user-select: none;\n    user-drag: none;\n  }\n"])),(function(n){return!0===n.isOpened?"12px 12px 0 0":"12px"})),j=g.ZP.div(o||(o=(0,c.Z)(["\n  width: 100%;\n"]))),k=g.ZP.div(r||(r=(0,c.Z)(["\n  background: #ffffff;\n  border: 1px solid #efefef;\n  border-top: none;\n  padding: 24px;\n  box-sizing: border-box;\n  border-radius: 0 0 12px 12px;\n  div:first-child {\n    margin-top: 0px;\n  }\n"]))),m=g.ZP.img(l||(l=(0,c.Z)(["\n  width: 22px;\n  height: 22px;\n  margin: auto 0;\n  &:hover {\n    cursor: ",";\n  }\n  &:active {\n    cursor: ",";\n  }\n"])),(function(n){return n.pinned?"not-allowed":"grab"}),(function(n){return n.pinned?"not-allowed":"grabbing"})),C=g.ZP.div(a||(a=(0,c.Z)(["\n  font-weight: 600;\n  font-size: 18px;\n  display: flex;\n  margin-left: 20px;\n"]))),w=g.ZP.span(d||(d=(0,c.Z)(["\n  margin: auto 0;\n  margin-left: 16px;\n  padding-top: 2px;\n"]))),I=g.ZP.img(u||(u=(0,c.Z)(["\n  width: 24px;\n  height: 24px;\n  margin: auto 0;\n"]))),P=g.ZP.img(s||(s=(0,c.Z)(["\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  padding: 10px;\n  right: 64px;\n  top: 9px;\n  transition: opacity 0.3s;\n  &:hover {\n    cursor: pointer;\n    opacity: 0.6;\n  }\n"]))),O=g.ZP.img(p||(p=(0,c.Z)(["\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  padding: 10px;\n  right: 22px;\n  top: 9px;\n  transition: transform 0.4s;\n  &:hover {\n    cursor: pointer;\n  }\n  ","\n"])),(function(n){return n.isOpened&&(0,g.iv)(v||(v=(0,c.Z)(["\n      transform: rotate(180deg);\n    "])))})),q=function(n){var e,i=(0,x.I0)(),t=null!==(e=n.isCardOpened)&&void 0!==e&&e;return(0,b.jsxs)(j,{children:[(0,b.jsxs)(Z,{isOpened:t,children:[(0,b.jsx)(m,{pinned:!!n.pinned,src:n.pinned?f.lO:f.Tp,alt:""}),(0,b.jsxs)(C,{children:[(0,b.jsx)(I,{src:n.icon,alt:""}),(0,b.jsx)(w,{children:n.title})]}),(0,b.jsx)(P,{src:f.rF,alt:"",onClick:n.onRemove}),(0,b.jsx)(O,{src:f.Rk,alt:"",isOpened:t,onClick:function(){var e;i((0,h.cQ)(null!==(e=n.blockId)&&void 0!==e?e:""))}})]}),t&&(0,b.jsx)(k,{isOpened:t,children:n.children})]})}}}]);
//# sourceMappingURL=189.3cfd920d.chunk.js.map