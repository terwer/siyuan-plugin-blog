# 前台

## SSR

```
http://localhost:3000/share?id=20230620004441-fwvuy8a&origin=http://127.0.0.1:6806&isSsr=false
http://localhost:3000/s/20230411223531-n81ogbh
```

### SSE


```
http://localhost:3000/#/s/20230411223531-n81ogbh
```

# 后台

```
http://localhost:3000/api/hello
http://localhost:3000/api/endpoint/getPost?id=20230411223531-n81ogbh
```

# 调试

## 开发调试

```
pnpm serve
```

## 本地插件调试

```
pnpm dev
```

然后使用插件菜单体验即可

## 生产插件打包

```
pnpm build
```

打包后 build 目录会生成 package.zip 和 siyuan-plugin-blog-xxx.zip

## vercel生产环境构建

```
pnpm vercelBuild
```

## node生产环境构建

```
pnpm nodeBuild
```

接着启动 node 服务器

```
node .output/server/index.mjs
```

然后打开

```
http://localhost:3000
```

## docker生产环境构建

```
pnpm nodeuild
docker compose up --build
```

直接使用已打包的，参考 `docker-compose-hub.yml`，可能需要配置 `.env.docker`，可以复制 `.env.docker.example`，然后修改即可

