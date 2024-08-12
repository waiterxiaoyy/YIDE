<div align="center">
<a href="https://githun.com/waiterxiaoyy/yide" target="_blank"><img src="imgs/logo.png" ></a>

<h1 align="center">YIDE</h1>

[English 🌏](https://github.com/waiterxiaoyy/yide/tree/master/README.md) / 简体中文

:point_right: 一款轻量型的在线前端编译器:cupid: :point_left:


线上版本：[YIDE在线地址](http://xiaorongshu.cc)

文档持续完善中......

![GitHub Repo stars](https://img.shields.io/github/stars/waiterxiaoyy/YIDE)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/waiterxiaoyy/YIDE)
![GitHub package.json version](https://img.shields.io/github/package-json/v/waiterxiaoyy/YIDE)
![GitHub License](https://img.shields.io/github/license/waiterxiaoyy/YIDE)
![GitHub language count](https://img.shields.io/github/languages/count/waiterxiaoyy/YIDE)

<!-- [![Version](https://img.shields.io/visual-studio-marketplace/v/codellms.CodeLLMs-AI)](https://marketplace.visualstudio.com/items?itemName=codellms.codellms-ai)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/codellms.CodeLLMs-AI)](https://marketplace.visualstudio.com/items?itemName=codellms.codellms-ai)
[![License](https://img.shields.io/aur/license/android-studio)](https://github.com/waiterxiaoyy/CodeLLMs-AI/blob/main/LICENSE) -->

</div>

## 介绍 :star2:

![项目登录页](imgs/login.png)
![项目主图](imgs/image.png)

- YIDE是一款支持在线编写前端代码的编辑器，以`React`和`Typescript`为前端，以`Egg.js`和`Mysql`为后端，支持`html`、`js`、`css`和`markdown`编译，非常适合验证想法，实践操作和整理文档。

- 本项目相比于当前一些在线编译器有以下特点：
    - 支持用户区分，用户可拥有独立的文件管理空间
    - 支持自定义脚本和样式文件
    - 支持Markdown文件书写和编译

- 开发此项目的初衷主要是两点：
    - 一是经常问GPT写一些样式，但是不能及时查看到效果，干脆直接手撸一个自己的在线查看器，后面做着做着完善了一些功能
    - 二是增加一下自己的项目经历


## 特点 :boom:

- :file_folder: **文件管理**：支持区分用户和文件存储，目前仅支持新文件创建，相比于其他在线平台，支持选择编译的主文件如html和md文件。

- :cat: **效率编辑**：集成进来的`Monaco-Editor`，支持语言识别，代码补全以及高亮，支持一系列快捷键，如一键保存编译和格式化代码。

- :penguin: **窗口拖动**：主要页面布局是文件区Explorer，编辑器Editor和展示区Viewer，支持各栏“自由”拖动。

- :panda_face: **多类型文件编译**：支持`html`结合样式文件和脚本文件，支持`Markdown`格式文件编译。

- :monkey: **自由化**：编写`html`文件支持自动引入默认的脚本文件和样式文件，也可自定义脚本文件和样式文件，具体查看使用文档。

- :dog: **内置图床**：`Markdwon`支持图像上传，内置`OSS`图床。

## 使用文档 :iphone:

- **创建新文件**

在主页的左侧文件索引区Explorer创建新建文件，支持`html`，`css`，`js`，`md`为后缀的文件，其中html和md是可编译执行的文件。

**默认文件：`index.html`，`script.js`，`style.css` 是默认文件，默认文件不允许删除。**

**自行创建的文件名不建议包含`index`，`style`和`script`字眼。**

- **编辑文件**

在主页的中间区域是文件编辑区Editor，中间展示的当前文件名，可调节编辑区内的字体大小，选择编译文件（`html/md`），点击`编译按钮`则会自动保存所有未保存的文件然后编译，点击`保存按钮`会保存当前文件。

1.  `html`编辑

`html`文件不需要标准模板，只需要书写主要结构即可

```html
<div>
    <h1 style="color: #eb7806">Welcome to YIDE</h1>
    <h3 style="color: #eb7806">by waiterxiaoyy</h3>
</div>
```

2. `css`编辑

`css`编辑如下

```css
body {
    color: #e56e0c;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}
```

3. `js`编辑

`js`编辑如下

```js
document.addEventListener('DOMContentLoaded', function () { 
    console.log('JavaScript loaded for YIDE'); 
});
```

4. `Md`编辑

`Md`文件编辑支持常规的基础操作，暂不支持复杂的样式如类图、流程图。

- **文件编译**

文件编译目前仅支持html和md文件编译，后续集成查看TODO List。

1. html编译

html会由后台自动解析出合格的代码，同时会解析`style.css`和`script.js`中的代码，由后台组合成一套完整的页面代码返回前台展示。

如果需要**自定义样式文件和脚本文件**，需要在`html`文件中加入下面两行：

```html
<!-- 取消引入默认样式和脚本 -->
// no style.css
// no script.js
```

这两行代码需要严格按照上述格式写在需要自定义的`html`文件中，后台会识别并且取消加入默认的样式和脚本文件，用户自定义文件引入如下：

```html
<!-- 取消引入默认样式和脚本 -->
// no style.css
// no script.js

<!-- 引入样式文件 -->
<link rel="stylesheet" href="/my.css" />

<!-- 引入脚本文件 -->
<script type="text/script" src="/my.js" ></script>

<div>
    <h1 style="color: #eb7806">Welcome to YIDE</h1>
    <h3 style="color: #eb7806">by waiterxiaoyy</h3>
</div>
```

> 注意： 引入自定义文件需以斜杠`/`开头，否则将不能识别用户下的文件。

当然，如果不需要引入文件，也可以直接在`html`文件的`<style></style>`和`<script></script>`中书写样式和脚本操作。

2. `Md`编译

`Md`编译结合的是掘金论坛主题，暂时不支持更换主题。

- **下载文件**

在文件索引区和编辑区都支持下载文件，点击`下载按钮`即可。

- **上传文件**

暂不支持上传

- **文件重命名**

暂不支持，后续更新

## 安装/配置 :wrench:

- **克隆项目**

```sh
git clone git@github.com:waiterxiaoyy/YIDE.git
```

- **项目结构**

```md
YIDE
├── YIDE-Egg-Server
├── YIDE-React-Client
```

`YIDE-Egg-Server`是以`Egg.js`和`mysql`为技术栈的后端项目，`YIDE-React-Client`是以`React`为技术栈的前端项目，两个需同时启动才能正常使用

- 全局安装`yarn`

项目启动和部署需要`node`环境，请先提前安装好环境，项目中使用的`node`版本为`v18.18.1`，下面操作都基于此版本，如有不一致，请安装`nvm`切换到相应的node版本，安装`nvm`请自行查阅相关资料。

```shell
npm install -g yarn
```

- **前端项目`YIDE-React-Client`配置/启动**

1. 安装依赖

```shell
cd YIDE-React-Client

// 安装依赖
yarn

```

2. 配置端口

在`vite.config.js`和`vite.config.ts`中配置项目端口和代理转发，默认的前端端口是`3001`，后端的端口是`8000`

3. 启动项目

```shell
// 开发环境下启动项目
yarn dev
```

- **后端项目`YIDE-Egg-Server`配置/启动**

1. 安装和配置`MySQL`

后端需要提前安装好`MySQL`，自行查阅资料安装，版本`8.0`以上。

安装好后需要配置用户名和密码。

2. 项目中配置`MySQL`

在`YIDE-Egg-Server/config`的`config.default.js`中配置`mysql`项和`sequelize`项，密码和数据库改成你自己设置的。

```js
config.mysql = {
    app: true,
    agent: false,
    client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'yide'
    }
};

config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'yide',
    define: {
        timestamps: false,
        freezeTableName: true
    }
};
```

3. 执行sql语句导入表和基础数据

在项目目录下有`app.sql`文件，将里面的代码全部复制到`MySQL`控制台执行。

4. 安装依赖

在目录`YIDE-Egg-Server`下

```shell
yarn
```

5. 配置`oss`服务（可选）

由于项目中用到了图床，使用的是`oss`云服务，所以需要配置`oss`，否则图床会无法使用。

在`config.default.js`中配置`oss`项，`region`、`accessKeyId`、`accessKeySecret`、`bucket`是在`oss`申请时得到的，具体的`oss`服务开通请自行查阅资料。

```js
config.oss = {
    client: {
        region: '',
        accessKeyId: '',
        accessKeySecret: '',
        bucket: ''
    }
};
```

5. 启动项目

启动项目后，项目将在暴露在`8000`端口下

```shell
yarn dev
```

- 项目部署

服务器使用`docker`进行管理项目，前端项目使用`nginx`部署，后端打包成镜像启动即可。

部署疑问欢迎添加微信交流：`zhouyiyang0328`

## 更新日志 📅

查看 [更新日志] (https://github.com/waiterxiaoyy/yide/blob/master/CHANGELOG.md) 获取最新更新情况。

## TODO List 📋

如果想参与进来，欢迎提交PR成为项目贡献者，一起打造更加轻量和好用的在线IDE。

- [ ] 页面布局优化：索引区缩进、响应式适配
- [ ] 文件上传功能
- [ ] 支持更多文件类型编译：vue、react等
- [ ] 集成控制台
- [ ] 文件重命名
- [ ] 创建目录，目录管理，目录树
- [ ] 代码分享

## 贡献者 🤝

欢迎贡献！请随时提交拉取请求。

这个项目的存在感谢所有贡献者：

<a href="https://github.com/waiterxiaoyy/YIDE/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=waiterxiaoyy/YIDE" />
</a>

## 许可证 📄

此项目根据 MIT 许可证授权 - 有关详细信息，请参阅 [LICENSE](https://github.com/waiterxiaoyy/YIDE/blob/master/LICENSE) 文件。

## 期待支持 💖

如果你发现此项目对你有所帮助，请考虑在 [GitHub](https://github.com/waiterxiaoyy/YIDE) 上给它一个⭐️ !
