<div align="center">
<a href="https://githun.com/waiterxiaoyy/yide" target="_blank"><img src="imgs/logo.png" ></a>

<h1 align="center">YIDE</h1>

English / [简体中文 🌏](https://github.com/waiterxiaoyy/yide/tree/master/README_CN.md)

:point_right: A lightweight online front-end compiler:cupid: :point_left:


Online version: [YIDE online address](http://xiaorongshu.cc)

Documentation is ongoing......

![GitHub Repo stars](https://img.shields.io/github/stars/waiterxiaoyy/YIDE)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/waiterxiaoyy/YIDE)
![GitHub package.json version](https://img.shields.io/github/package-json/v/waiterxiaoyy/YIDE)
![GitHub License](https://img.shields.io/github/license/waiterxiaoyy/YIDE)
![GitHub language count](https://img.shields.io/github/languages/count/waiterxiaoyy/YIDE)

</div>

## Introduction :star2:

![Project entry page](imgs/login.png)
![Project master diagram](imgs/image.png)

- YIDE is an editor that supports writing front-end code online, with `React` and `Typescript` as the front end, `Egg.js` and` Mysql `as the back end, supporting` html `, `js`,` css `and` markdown `compilation, which is very suitable for verifying ideas. Practice and organize documentation.

- This project has the following features compared to some current online compilers:
    - Support user differentiation, users can have independent file management space
    - Support for custom scripts and style files
    - Support Markdown file writing and compilation

- There are two main reasons for developing this project:
    - First, often ask GPT to write some styles, but can not see the effect in time, simply hand off a own online viewer directly, and do some things to improve some functions
    - The second is to increase my project experience


## Features :boom:

- :file_folder: **File Management** : Support to distinguish between users and file storage, currently only support new file creation, compared to other online platforms, support to select compiled master files such as `html` and `md` files.

- :cat: **Efficiency Editing** : The integrated `Monaco-Editor` supports language recognition, code completion and highlighting, and supports a series of shortcut keys, such as saving compiled and formatted code.

- :penguin: **Window Drag** : The main page layout is the file area Explorer, Editor and display area Viewer, supporting the "free" drag of each column.

- :panda_face: **Multi-type File Compilation** : Support `html` combined with style files and script files, support `Markdown` format file compilation.

- :monkey: **Liberalization** : Write `html` files to support the automatic introduction of default script files and style files, you can also customize script files and style files, specifically view the use of documents.

- :dog: **Built-in Map Bed** : `Markdwon` supports image uploading, built-in `OSS` map bed.

## Document :iphone:

- **Create new file**

In the left file index area of the main page Explorer creates a new file, supporting files with the suffix `html`, `css`, `js`,` md `, where html and md are compilable files.

**Default files: `index.html`, `script.js`,` style.css `are default files, default files are not allowed to be deleted.**

**Self-created file names are not recommended to contain the words `index `, `style` and `script`.**

- **Edit file**

In the middle area of the main page is the file editing area Editor, the current file name displayed in the middle, can adjust the font size in the editing area, select compile file (`html/md`), click `compile button` will automatically save all unsaved files and then compile, click `save button` will save the current file.

1. `html` edit

The `html` file does not need a standard template, only the main structure needs to be written

```html
<div>
    <h1 style="color: #eb7806">Welcome to YIDE</h1>
    <h3 style="color: #eb7806">by waiterxiaoyy</h3>
</div>
```

2. `css` edit

```css
body {
    color: #e56e0c;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}
```

3. `js` edit

```js
document.addEventListener(`DOMContentLoaded`, function () { 
    console.log(`JavaScript loaded for YIDE`); 
});
```

4. `Md` edit

`Md` file editing supports general basic operations, and does not support complex styles such as class diagrams and flow charts.

- **File compilation**

File compilation Currently supports only html and md file compilation, and the TODO List is integrated in the future.

1. html compilation

html will automatically parse out the qualified code by the background, and will parse the code in`style.css` and`script.js`, and the background will combine into a complete set of page code to return to the foreground display.

If you need a custom style file and a script file, you need to add the following two lines in the`html` file:

```html
<!-- Unintroduce default styles and scripts -->
// no style.css
// no script.js
```

These two lines of code need to be written in strict accordance with the above format in the need to customize the`html` file, the background will recognize and cancel the default style and script files, user-defined files introduced as follows:

```html
<!-- Unintroduce default styles and scripts -->
// no style.css
// no script.js

<!-- Introduce style file -->
<link rel="stylesheet" href="/my.css" />

<!-- Import script file -->
<script type="text/script" src="/my.js" ></script>

<div>
    <h1 style="color: #eb7806">Welcome to YIDE</h1>
    <h3 style="color: #eb7806">by waiterxiaoyy</h3>
</div>
```

> Note: Importing custom files must start with slash `/`, otherwise the files under the user will not be recognized.

Of course, if you do not need to introduce files, you can also write styles and script operations directly in `<style></style>` and `<script></script>` of the html file.

2. `Md` compilation

`Md` compilation is combined with the theme of the Nuggets forum, and the replacement theme is not supported for the time being.

- **Download file**

You can download files in both the file index area and the edit area by clicking the `Download button`.

- **Upload files**

Upload is not supported

- **Rename file**

Not supported for now, update later

## Installation/configuration :wrench:

- **Cloning**

```sh
git clone git@github.com:waiterxiaoyy/YIDE.git
```

- **Structure**

```md
YIDE
├── YIDE-Egg-Server
├── YIDE-React-Client
```

`YIDE-Egg-Server` is the back-end project of Egg.js and mysql as the technology stack, and `YIDE-React-client` is the front-end project of React as the technology stack, and the two need to be started at the same time to be used normally

- **Install yarn globally**

Project start and deployment need `node` environment, please install the environment in advance, the `node` version used in the project is `v18.18.1 `, the following operations are based on this version, if there is inconsistency, please install `nvm` switch to the corresponding node version, install `nvm` please consult the relevant information.

```shell
npm install -g yarn
```

- **Front-end project `YIDE-React-Client` configuration/startup**

1. Installation dependency

```shell
cd YIDE-React-Client

yarn
```

2. Configuration port

Configure the project port and proxy forwarding in `vite.config.js` and` vite.config.ts`. The default front-end port is `3001`and the back-end port is `8000`

3. Start-up project

```shell
// Start-up project in development
yarn dev
```

- **Backend project `YIDE-Egg-Server` configuration/startup**

1. Install and configure MySQL

The back-end needs to install `MySQL` in advance, consult the data to install, version `8.0` or more.

After the installation is complete, configure the user name and password.

2. Configure MySQL in the project

Configure `mysql` entries and `sequelize` entries in config.default.js in `YIDE-Egg-Server/config`, and change the password and database to your own Settings.

```js
config.mysql = {
    app: true,
    agent: false,
    client: {
        host: `localhost`,
        port: `3306`,
        user: `root`,
        password: ``,
        database: `yide`
    }
};

config.sequelize = {
    dialect: `mysql`,
    host: `localhost`,
    port: `3306`,
    user: `root`,
    password: ``,
    database: `yide`,
    define: {
        timestamps: false,
        freezeTableName: true
    }
};
```

3. Run sql statements to import tables and basic data

In the project directory there is the `app.sql` file, all copy to the `MySQL` console execution.

4. Installation dependency

Under directory `YIDE-Egg-Server`

```shell
yarn
```

5. Configuring the `oss` service (optional)

Because the project used the graph bed, using the `oss` cloud service, so you need to configure `oss`, otherwise the graph bed will not be available.

In the `config.default.js` configuration `oss`item, `region`、 `accessKeyId `, `accessKeySecret`, `bucket` is obtained in the `oss` application, the specific `oss` service opening please consult the information.

```js
config.oss = {
    client: {
        region: ``,
        accessKeyId: ``,
        accessKeySecret: ``,
        bucket: ``
    }
};
```

5. Start-up

After starting the project, the project will be exposed to port `8000`

```shell
yarn dev
```

- **Project deployment**

The server uses `docker` to manage the project, the front-end project uses `nginx` deployment, and the back-end can be packaged as an image to start.

Deployment questions welcome to add wechat communication: `zhouyiyang0328`

## ChangeLog 📅

See the [ChangeLog](https://github.com/waiterxiaoyy/yide/blob/master/CHANGELOG.md) for the latest updates.

## TODO List 📋

If you want to get involved, you are welcome to submit a PR as a contributor to the project and work together to build a more lightweight and user-friendly online IDE.

- [ ] Page layout optimization: index area indent, responsive adaptation
- [ ] File upload function
- [ ] Supports more file types, such as vue and react
- [ ] Integrated console
- [ ] Rename the file
- [ ] Create directory, directory management, directory tree
- [ ] Code sharing

## Contribution 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

This project exists thanks to all the people who contribute:

<a href="https://github.com/waiterxiaoyy/YIDE/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=waiterxiaoyy/YIDE" />
</a>

## License 📄

This project is licensed under the MIT License - see the [LICENSE](https://github.com/waiterxiaoyy/YIDE/blob/master/LICENSE) file for details.

## Support 💖

If you find this project helpful, please consider giving it a ⭐️ on [GitHub](https://github.com/waiterxiaoyy/YIDE)!

