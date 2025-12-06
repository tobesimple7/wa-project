* cd packages/wagrid
pnpm add -D webpack webpack-cli
pnpm add -D html-webpack-plugin
pnpm add -D mini-css-extract-plugin css-loader style-loader
pnpm add -D ts-loader typescript
pnpm add -D @types/node

* * cd packages/wagrid : 필요 패키지 목록 (한 번에 설치 명령)
pnpm add -D \
webpack webpack-cli webpack-dev-server \
typescript ts-loader @types/node \
mini-css-extract-plugin css-loader sass sass-loader \
terser-webpack-plugin