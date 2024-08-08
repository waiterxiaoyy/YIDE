# 使用node镜像
FROM docker.awsl9527.cn/library/node:18.20
# 在容器中新建目录文件夹 egg
RUN mkdir -p /yide-egg-server
# 将 /egg 设置为默认工作目录
WORKDIR /yide-egg-server
# 将 package.json 复制默认工作目录
COPY package.json /yide-egg-server/package.json
# 安装依赖
RUN yarn config set register https://registry.npm.taobao.org
RUN yarn install
# 再copy代码至容器
COPY ./ /yide-egg-server
#7001端口
EXPOSE 7001
#等容器启动之后执行脚本
CMD yarn prod