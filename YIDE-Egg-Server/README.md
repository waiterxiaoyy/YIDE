# YIDE-Egg-Server

`YIDE-Egg-Server` is the back-end project of Egg.js and mysql as the technology stack, and `YIDE-React-client` is the front-end project of React as the technology stack, and the two need to be started at the same time to be used normally


## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

## Development

- **Install yarn globally**

Project start and deployment need `node` environment, please install the environment in advance, the `node` version used in the project is `v18.18.1 `, the following operations are based on this version, if there is inconsistency, please install `nvm` switch to the corresponding node version, install `nvm` please consult the relevant information.

```shell
npm install -g yarn
```

- **Configuration/Startup**

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
