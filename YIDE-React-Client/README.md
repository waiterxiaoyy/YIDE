# YIDE-React-Client

`YIDE-Egg-Server` is the back-end project of Egg.js and mysql as the technology stack, and `YIDE-React-client` is the front-end project of React as the technology stack, and the two need to be started at the same time to be used normally

## Development

- **Install yarn globally**

Project start and deployment need `node` environment, please install the environment in advance, the `node` version used in the project is `v18.18.1 `, the following operations are based on this version, if there is inconsistency, please install `nvm` switch to the corresponding node version, install `nvm` please consult the relevant information.

```shell
npm install -g yarn
```

- **Configuration/Startup**

1. Installation dependency

```shell
yarn
```

2. Configuration port

Configure the project port and proxy forwarding in `vite.config.js` and` vite.config.ts`. The default front-end port is `3001`and the back-end port is `8000`

3. Start-up project

```shell
// Start-up project in development
yarn dev
```