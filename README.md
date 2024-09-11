# vue-ts-antd-vite

PC管理后台  
  

技术选型：  
  
1. vue3  
2. ts  
3. vue-router  
4. pinia  
5. vite


## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn run dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn run build
```


DEV: Development System，开发系统  
QAS: Quality Assurance System，质量保证系统  
UAT: User Acceptance Test，用户验收测试  
PRD: Production System，生产系统

### 目录结构说明  
 
src
|__ apis // 所有的接口地址，每一个模块抽象一个文件  

|  
|__ assets  // 静态资源存放位置  

|__ |__ img  // 图片存放位置；除公用图片放根下，其他的模块放到各自文件夹下；图片名用减号 `-`来隔开  

|__ |__ less  // 放公用的less文件  

|__ |__ ts  // 放公用的ts文件  

|__ common // 放公用的ts文件，按功能模块存放  

|__ components // 放公用的组件  

|__ mixins // 放公用的混入  

|__ router // 路由，每一个模块抽象一个文件  

|__ sso // 权限相关的代码  

|__ store // vuex 存储  

|__ utils // 公用工具  

|__ view // 路由页面存放位置  


### 注意  
**所有vue文件用多个单词大驼峰命名，所有图片名用减号隔开，其他的命名都用小驼峰**